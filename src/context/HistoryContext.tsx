import { createContext, useCallback, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import { Stack } from "../algorithms/Stack"
import { servicesMock } from "../data/ServicesMock"
import type { ServiceMock } from "../interfaces/InterfaceServices"

export interface HistoryContextType {
  history: ServiceMock[]
  addServiceToHistory: (serviceId: string) => void
  clearHistory: () => void
}

interface HistoryProviderProps {
  children: ReactNode
}

export const HistoryContext = createContext<HistoryContextType | undefined>(
  undefined
)

const STORAGE_KEY = "homefix-history"
const MAX_HISTORY_SIZE = 5

function serviceExists(serviceId: string): boolean {
  return servicesMock.some((service) => service.id === serviceId)
}

function getHistoryIdsFromStorage(): string[] {
  if (typeof window === "undefined") {
    return []
  }

  const savedHistory = localStorage.getItem(STORAGE_KEY)

  if (!savedHistory) {
    return []
  }

  try {
    const parsedHistory: unknown = JSON.parse(savedHistory)

    if (!Array.isArray(parsedHistory)) {
      return []
    }

    return parsedHistory.filter(
      (id): id is string => typeof id === "string" && serviceExists(id)
    )
  } catch {
    return []
  }
}

export function HistoryProvider({ children }: HistoryProviderProps) {
  const [historyIds, setHistoryIds] = useState<string[]>(
    getHistoryIdsFromStorage
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(historyIds))
  }, [historyIds])

  const history = useMemo<ServiceMock[]>(() => {
    return [...historyIds]
      .reverse()
      .map((id) => servicesMock.find((service) => service.id === id))
      .filter((service): service is ServiceMock => service !== undefined)
  }, [historyIds])

  const addServiceToHistory = useCallback((serviceId: string): void => {
    if (!serviceExists(serviceId)) {
      return
    }

    setHistoryIds((currentHistoryIds) => {
      const stack = new Stack<string>()

      const historyWithoutRepeated = currentHistoryIds.filter(
        (id) => id !== serviceId
      )

      const limitedHistory = historyWithoutRepeated.slice(
        -(MAX_HISTORY_SIZE - 1)
      )

      limitedHistory.forEach((id) => stack.push(id))
      stack.push(serviceId)

      return stack.toArray()
    })
  }, [])

  const clearHistory = useCallback((): void => {
    setHistoryIds([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return (
    <HistoryContext.Provider
      value={{
        history,
        addServiceToHistory,
        clearHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  )
}
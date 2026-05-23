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
  uid: string
}

// eslint-disable-next-line react-refresh/only-export-components
export const HistoryContext = createContext<HistoryContextType | undefined>(
  undefined
)

const getStorageKey = (uid: string) => `homefix-history-${uid}`
const MAX_HISTORY_SIZE = 5

function serviceExists(serviceId: string): boolean {
  return servicesMock.some((service) => service.id === serviceId)
}

function getHistoryIdsFromStorage(uid: string): string[] {
  if (typeof window === "undefined") {
    return []
  }

  const savedHistory = localStorage.getItem(getStorageKey(uid))

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

export function HistoryProvider({ children, uid }: HistoryProviderProps) {
  const [historyIds, setHistoryIds] = useState<string[]>(
    getHistoryIdsFromStorage(uid)
  )

  useEffect(() => {
    localStorage.setItem(getStorageKey(uid), JSON.stringify(historyIds))
  }, [historyIds, uid])

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
    localStorage.removeItem(getStorageKey(uid))
  }, [uid])

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
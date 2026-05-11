import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Stack } from "../algorithms/detailStack";
import { services } from "../data/service.data";
import type { IService } from "../interfaces/ServiceDetail/service.interface";

export interface HistoryContextType {
  history: IService[];
  addServiceToHistory: (serviceId: string) => void;
  clearHistory: () => void;
}

interface HistoryProviderProps {
  children: ReactNode;
}

export const HistoryContext = createContext<HistoryContextType | undefined>(
  undefined
);

const STORAGE_KEY = "homefix-history";
const MAX_HISTORY_SIZE = 5;

function getHistoryIdsFromStorage(): string[] {
  const savedHistory = localStorage.getItem(STORAGE_KEY);

  if (!savedHistory) {
    return [];
  }

  try {
    const parsedHistory = JSON.parse(savedHistory) as string[];

    if (!Array.isArray(parsedHistory)) {
      return [];
    }

    return parsedHistory;
  } catch {
    return [];
  }
}

export function HistoryProvider({ children }: HistoryProviderProps) {
  const [historyIds, setHistoryIds] = useState<string[]>(
    getHistoryIdsFromStorage
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(historyIds));
  }, [historyIds]);

  const history: IService[] = historyIds
    .map((id) => services.find((service) => service.id === id))
    .filter((service): service is IService => service !== undefined);

  function addServiceToHistory(serviceId: string): void {
    setHistoryIds((currentHistoryIds) => {
      const stack = new Stack();

      const historyWithoutRepeated = currentHistoryIds.filter(
        (id) => id !== serviceId
      );

      const limitedHistory = historyWithoutRepeated.slice(
        0,
        MAX_HISTORY_SIZE - 1
      );

      limitedHistory.reverse().forEach((id) => {
        stack.push(id);
      });

      stack.push(serviceId);

      return stack.print().reverse();
    });
  }

  function clearHistory(): void {
    setHistoryIds([]);
    localStorage.removeItem(STORAGE_KEY);
  }

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
  );
}
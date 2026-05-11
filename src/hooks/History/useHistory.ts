import { useContext } from "react";
import {
  HistoryContext,
  type HistoryContextType,
} from "../../context/HistoryContext";

export function useHistory(): HistoryContextType {
  const context = useContext(HistoryContext);

  if (!context) {
    throw new Error("useHistory debe usarse dentro de HistoryProvider");
  }

  return context;
}
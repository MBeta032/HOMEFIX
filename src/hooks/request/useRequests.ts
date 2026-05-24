import { useContext } from "react";
import {RequestContext, type RequestContextType} from "../../context/Request/RequestContext";

export function useRequests(): RequestContextType {
  const context = useContext(RequestContext);

  if (!context) {
    throw new Error("useRequests debe usarse dentro de RequestProvider");
  }

  return context;
}
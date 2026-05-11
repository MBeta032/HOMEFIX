import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import RequestQueue from "../../algorithms/RequestQueue";
import type { IService } from "../../interfaces/ServiceDetail/service.interface";
import type { IRequest, IRequestFormData, RequestStatus } from "../../interfaces/Requests/request.interface";

interface RequestProviderProps {
  children: ReactNode;
}

export interface RequestContextType {
  requests: IRequest[];
  requestCount: number;
  createRequestsFromCart: (
    cartItems: IService[],
    formData: IRequestFormData
  ) => IRequest[];
  clearRequests: () => void;
}

export const RequestContext = createContext<RequestContextType | undefined>(
  undefined
);

const REQUEST_STORAGE_KEY = "homefix-requests";

const VALID_REQUEST_STATUS: RequestStatus[] = [
  "Pendiente",
  "Asignada",
  "En proceso",
  "Finalizada",
  "Cancelada",
];

function isRequestStatus(status: unknown): status is RequestStatus {
  return VALID_REQUEST_STATUS.includes(status as RequestStatus);
}

function isValidRequest(request: unknown): request is IRequest {
  if (typeof request !== "object" || request === null) {
    return false;
  }

  const possibleRequest = request as Partial<IRequest>;

  return (
    typeof possibleRequest.id === "string" &&
    typeof possibleRequest.serviceId === "string" &&
    typeof possibleRequest.serviceName === "string" &&
    typeof possibleRequest.company === "string" &&
    typeof possibleRequest.price === "number" &&
    typeof possibleRequest.address === "string" &&
    typeof possibleRequest.neighborhood === "string" &&
    typeof possibleRequest.city === "string" &&
    typeof possibleRequest.zone === "string" &&
    typeof possibleRequest.desiredDate === "string" &&
    typeof possibleRequest.desiredTime === "string" &&
    typeof possibleRequest.problemDescription === "string" &&
    isRequestStatus(possibleRequest.status) &&
    typeof possibleRequest.createdAt === "string"
  );
}

function getRequestsFromStorage(): IRequest[] {
  const savedRequests = localStorage.getItem(REQUEST_STORAGE_KEY);

  if (!savedRequests) {
    return [];
  }

  try {
    const parsedRequests = JSON.parse(savedRequests) as unknown;

    if (!Array.isArray(parsedRequests)) {
      return [];
    }

    return parsedRequests.filter(isValidRequest);
  } catch {
    return [];
  }
}

function createRequestId(serviceId: string, index: number): string {
  return `REQ-${Date.now()}-${serviceId}-${index + 1}`;
}

export function RequestProvider({ children }: RequestProviderProps) {
  const [requests, setRequests] = useState<IRequest[]>(() =>
    getRequestsFromStorage()
  );

  const requestQueue = new RequestQueue(requests);

  const requestCount: number = requestQueue.size();

  useEffect(() => {
    if (requests.length === 0) {
      localStorage.removeItem(REQUEST_STORAGE_KEY);
      return;
    }

    localStorage.setItem(REQUEST_STORAGE_KEY, JSON.stringify(requests));
  }, [requests]);

  function createRequestsFromCart(
    cartItems: IService[],
    formData: IRequestFormData
  ): IRequest[] {
    const queue = new RequestQueue(requests);
    const createdAt = new Date().toISOString();

    const newRequests: IRequest[] = cartItems.map(
      (service: IService, index: number) => ({
        id: createRequestId(service.id, index),
        serviceId: service.id,
        serviceName: service.name,
        company: service.company,
        price: service.price,
        address: formData.address,
        neighborhood: formData.neighborhood,
        city: formData.city,
        zone: formData.zone,
        desiredDate: formData.desiredDate,
        desiredTime: formData.desiredTime,
        problemDescription: formData.problemDescription,
        status: "Pendiente",
        createdAt,
      })
    );

    newRequests.forEach((request: IRequest) => {
      queue.enqueue(request);
    });

    setRequests(queue.getItems());

    return newRequests;
  }

  function clearRequests(): void {
    const queue = new RequestQueue(requests);

    queue.clear();

    setRequests(queue.getItems());
  }

  return (
    <RequestContext.Provider
      value={{
        requests,
        requestCount,
        createRequestsFromCart,
        clearRequests,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}
import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import RequestQueue from "../../algorithms/RequestQueue";
import type { IService } from "../../interfaces/ServiceDetail/service.interface";
import type {
  IRequest,
  IRequestFormData,
  PaymentMethod,
  RequestStatus,
} from "../../interfaces/Requests/request.interface";

interface RequestProviderProps {
  children: ReactNode;
}

export interface RequestContextType {
  requests: IRequest[];
  requestCount: number;
  createRequestFromService: (
    service: IService,
    formData: IRequestFormData
  ) => IRequest;
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

const VALID_PAYMENT_METHODS: PaymentMethod[] = ["Efectivo", "Datáfono"];

function isRequestStatus(status: unknown): status is RequestStatus {
  return VALID_REQUEST_STATUS.includes(status as RequestStatus);
}

function isPaymentMethod(method: unknown): method is PaymentMethod {
  return VALID_PAYMENT_METHODS.includes(method as PaymentMethod);
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
    typeof possibleRequest.serviceZone === "string" &&
    typeof possibleRequest.address === "string" &&
    typeof possibleRequest.neighborhood === "string" &&
    typeof possibleRequest.city === "string" &&
    typeof possibleRequest.desiredDate === "string" &&
    typeof possibleRequest.desiredTime === "string" &&
    isPaymentMethod(possibleRequest.paymentMethod) &&
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

function createRequestId(serviceId: string): string {
  return `REQ-${Date.now()}-${serviceId}`;
}

function getPaymentMethod(method: PaymentMethod | ""): PaymentMethod {
  if (method === "Datáfono") {
    return "Datáfono";
  }

  return "Efectivo";
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

  function createRequestFromService(
    service: IService,
    formData: IRequestFormData
  ): IRequest {
    const queue = new RequestQueue(requests);

    const newRequest: IRequest = {
      id: createRequestId(service.id),
      serviceId: service.id,
      serviceName: service.name,
      company: service.company,
      price: service.price,
      serviceZone: service.zone,
      address: formData.address,
      neighborhood: formData.neighborhood,
      city: formData.city,
      desiredDate: formData.desiredDate,
      desiredTime: formData.desiredTime,
      paymentMethod: getPaymentMethod(formData.paymentMethod),
      problemDescription: formData.problemDescription,
      status: "Pendiente",
      createdAt: new Date().toISOString(),
    };

    queue.enqueue(newRequest);

    setRequests(queue.getItems());

    return newRequest;
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
        createRequestFromService,
        clearRequests,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}
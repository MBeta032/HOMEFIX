import { createContext, useContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import RequestQueue from "../../algorithms/RequestQueue"
import type { ServiceMock } from "../../interfaces/InterfaceServices"
import type {
  IRequest,
  IRequestFormData,
  PaymentMethod,
  RequestStatus,
} from "../../interfaces/Requests/request.interface"
import { mockRequests } from "../../data/mockRequests"
import { AuthContext } from "../AuthContext"

interface RequestProviderProps {
  children: ReactNode
}

export interface RequestContextType {
  requests: IRequest[]
  requestCount: number
  createRequestFromService: (
    service: ServiceMock,
    formData: IRequestFormData
  ) => IRequest
  createRequestsFromCart: (
    services: ServiceMock[],
    formData: IRequestFormData
  ) => IRequest[]
  clearRequests: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const RequestContext = createContext<RequestContextType | undefined>(
  undefined
)

function getStorageKey(uid: string | undefined): string {
  if (!uid) return "homefix-requests-guest"
  return `homefix-requests-${uid}`
}

const VALID_REQUEST_STATUS: RequestStatus[] = [
  "Pendiente",
  "Asignada",
  "En proceso",
  "Finalizada",
  "Cancelada",
]

const VALID_PAYMENT_METHODS: PaymentMethod[] = ["Efectivo", "Datáfono"]

function isRequestStatus(status: unknown): status is RequestStatus {
  return VALID_REQUEST_STATUS.includes(status as RequestStatus)
}

function isPaymentMethod(method: unknown): method is PaymentMethod {
  return VALID_PAYMENT_METHODS.includes(method as PaymentMethod)
}

function isValidRequest(request: unknown): request is IRequest {
  if (typeof request !== "object" || request === null) {
    return false
  }

  const possibleRequest = request as Partial<IRequest>

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
    typeof possibleRequest.zone === "string" &&
    typeof possibleRequest.desiredDate === "string" &&
    typeof possibleRequest.desiredTime === "string" &&
    isPaymentMethod(possibleRequest.paymentMethod) &&
    typeof possibleRequest.problemDescription === "string" &&
    isRequestStatus(possibleRequest.status) &&
    typeof possibleRequest.createdAt === "string"
  )
}

function getRequestsFromStorage(uid: string | undefined): IRequest[] {
  if (typeof window === "undefined") {
    return mockRequests
  }

  const savedRequests = localStorage.getItem(getStorageKey(uid))

  if (!savedRequests) {
    return mockRequests
  }

  try {
    const parsedRequests = JSON.parse(savedRequests) as unknown

    if (!Array.isArray(parsedRequests)) {
      return mockRequests
    }

    const valid = parsedRequests.filter(isValidRequest)
    return valid.length > 0 ? valid : mockRequests

  } catch {
    return mockRequests
  }
}

function createRequestId(serviceId: string, index: number = 0): string {
  return `REQ-${Date.now()}-${serviceId}-${index}`
}

function getPaymentMethod(method: PaymentMethod | ""): PaymentMethod {
  if (method === "Datáfono") {
    return "Datáfono"
  }

  return "Efectivo"
}

function buildRequest(
  service: ServiceMock,
  formData: IRequestFormData,
  index: number = 0
): IRequest {
  return {
    id: createRequestId(service.id, index),
    serviceId: service.id,
    serviceName: service.name,
    company: service.company,
    price: service.price,
    serviceZone: service.zone,
    address: formData.address,
    neighborhood: formData.neighborhood,
    city: formData.city,
    zone: formData.zone,
    desiredDate: formData.desiredDate,
    desiredTime: formData.desiredTime,
    paymentMethod: getPaymentMethod(formData.paymentMethod),
    problemDescription: formData.problemDescription,
    status: "Pendiente",
    createdAt: new Date().toISOString(),
  }
}

export function RequestProvider({ children }: RequestProviderProps) {
  const auth = useContext(AuthContext)
  const uid = auth?.user?.uid
  const [requests, setRequests] = useState<IRequest[]>(() =>
    getRequestsFromStorage(uid)
  )

  const requestQueue = new RequestQueue(requests)
  const requestCount: number = requestQueue.size()


  useEffect(() => {
    if (requests.length === 0) {
      return
    }
    localStorage.setItem(getStorageKey(uid), JSON.stringify(requests))
  }, [requests, uid])

  function createRequestFromService(
    service: ServiceMock,
    formData: IRequestFormData
  ): IRequest {
    const queue = new RequestQueue(requests)
    const newRequest = buildRequest(service, formData)

    queue.enqueue(newRequest)
    setRequests(queue.getItems())

    return newRequest
  }

  function createRequestsFromCart(
    services: ServiceMock[],
    formData: IRequestFormData
  ): IRequest[] {
    const queue = new RequestQueue(requests)

    const newRequests = services.map((service, index) => {
      const request = buildRequest(service, formData, index)
      queue.enqueue(request)
      return request
    })

    setRequests(queue.getItems())

    return newRequests
  }

  function clearRequests(): void {
    const queue = new RequestQueue(requests)

    queue.clear()
    setRequests(queue.getItems())
  }

  return (
    <RequestContext.Provider
      value={{
        requests,
        requestCount,
        createRequestFromService,
        createRequestsFromCart,
        clearRequests,
      }}
    >
      {children}
    </RequestContext.Provider>
  )
}
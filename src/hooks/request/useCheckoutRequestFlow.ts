import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../cart/useCart"
import { useRequests } from "./useRequests"
import type { ServiceMock } from "../../interfaces/InterfaceServices"
import type { IRequestFormData } from "../../interfaces/Requests/request.interface"

interface UseCheckoutRequestFlowReturn {
  cartItems: ServiceMock[]
  cartCount: number
  cartTotal: number
  successMessage: string
  selectedService: ServiceMock | undefined
  selectedServiceId: string
  requestedServiceIds: string[]
  cancelledServiceIds: string[]
  requestedCount: number
  cancelledCount: number
  totalServices: number
  handleGoToCart: () => void
  handleGoToServices: () => void
  handleGoToRequests: () => void
  handleSelectService: (serviceId: string) => void
  handleConfirmRequest: (formData: IRequestFormData) => void
  handleCancelCurrentService: () => void
}

export function useCheckoutRequestFlow(): UseCheckoutRequestFlowReturn {
  const navigate = useNavigate()

  const { cartItems, cartCount, cartTotal, clearCart } = useCart()
  const { createRequestsFromCart } = useRequests()

  const [successMessage, setSuccessMessage] = useState<string>("")
  const [selectedServiceId, setSelectedServiceId] = useState<string>("")
  const [requestedServiceIds, setRequestedServiceIds] = useState<string[]>([])
  const [cancelledServiceIds, setCancelledServiceIds] = useState<string[]>([])

  const pendingServices = cartItems.filter(
    (service) =>
      !requestedServiceIds.includes(service.id) &&
      !cancelledServiceIds.includes(service.id)
  )

  const selectedService =
    pendingServices.find((service) => service.id === selectedServiceId) ||
    pendingServices[0]

  const requestedCount = requestedServiceIds.length
  const cancelledCount = cancelledServiceIds.length
  const totalServices = cartItems.length

  function handleGoToCart(): void {
    navigate("/dashboard/carrito")
  }

  function handleGoToServices(): void {
    navigate("/dashboard/servicios")
  }

  function handleGoToRequests(): void {
    navigate("/dashboard/solicitudes")
  }

  function handleSelectService(serviceId: string): void {
    if (
      requestedServiceIds.includes(serviceId) ||
      cancelledServiceIds.includes(serviceId)
    ) {
      return
    }

    setSelectedServiceId(serviceId)
    setSuccessMessage("")
  }

  function handleConfirmRequest(formData: IRequestFormData): void {
    if (!selectedService) {
      return
    }

    createRequestsFromCart([selectedService], formData)

    const updatedRequestedServiceIds = [
      ...requestedServiceIds,
      selectedService.id,
    ]

    setRequestedServiceIds(updatedRequestedServiceIds)

    const nextPendingServices = cartItems.filter(
      (service) =>
        !updatedRequestedServiceIds.includes(service.id) &&
        !cancelledServiceIds.includes(service.id)
    )

    if (nextPendingServices.length === 0) {
      clearCart()
      setSelectedServiceId("")

      setSuccessMessage(
        "Terminaste el proceso. Las solicitudes confirmadas quedaron guardadas correctamente."
      )

      return
    }

    setSelectedServiceId(nextPendingServices[0].id)

    setSuccessMessage(
      `La solicitud de ${selectedService.name} fue creada. Ahora puedes configurar el siguiente servicio.`
    )
  }

  function handleCancelCurrentService(): void {
    if (!selectedService) {
      return
    }

    const updatedCancelledServiceIds = [
      ...cancelledServiceIds,
      selectedService.id,
    ]

    setCancelledServiceIds(updatedCancelledServiceIds)

    const nextPendingServices = cartItems.filter(
      (service) =>
        !requestedServiceIds.includes(service.id) &&
        !updatedCancelledServiceIds.includes(service.id)
    )

    if (nextPendingServices.length === 0) {
      clearCart()
      setSelectedServiceId("")

      if (requestedServiceIds.length === 0) {
        setSuccessMessage(
          "Terminaste el proceso. No se creó ninguna solicitud porque cancelaste los servicios pendientes."
        )

        return
      }

      setSuccessMessage(
        "Terminaste el proceso. Algunos servicios fueron confirmados y otros fueron cancelados."
      )

      return
    }

    setSelectedServiceId(nextPendingServices[0].id)

    setSuccessMessage(
      `Cancelaste ${selectedService.name}. Ahora puedes continuar con el siguiente servicio.`
    )
  }

  return {
    cartItems,
    cartCount,
    cartTotal,
    successMessage,
    selectedService,
    selectedServiceId: selectedService?.id || "",
    requestedServiceIds,
    cancelledServiceIds,
    requestedCount,
    cancelledCount,
    totalServices,
    handleGoToCart,
    handleGoToServices,
    handleGoToRequests,
    handleSelectService,
    handleConfirmRequest,
    handleCancelCurrentService,
  }
}
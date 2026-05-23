import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { ServiceMock } from "../../interfaces/InterfaceServices"
import { useCart } from "../cart/useCart"
import { useHistory } from "../History/useHistory"
import { getServiceById } from "../../utils/ServiceDetail/service.utils"
import {
  confirmAction,
  showErrorAlert,
  showToast,
  showWarningAlert,
} from "../../utils/alerts"

interface UseServiceDetailResult {
  service: ServiceMock | undefined
  handleBack: () => void
  handleAddToCart: () => void
  handleRequestNow: () => void
}

export function useServiceDetail(): UseServiceDetailResult {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addServiceToHistory } = useHistory()
  const { addToCart } = useCart()

  const service = getServiceById(id)

  useEffect(() => {
    if (service) {
      addServiceToHistory(service.id)
    }
  }, [service?.id, addServiceToHistory])

  function handleBack(): void {
    navigate("/dashboard/servicios")
  }

  function handleAddToCart(): void {
    if (!service) {
      showErrorAlert(
        "Servicio no encontrado",
        "No fue posible agregar este servicio al carrito."
      )
      return
    }

    if (service.availability === "No disponible") {
      showWarningAlert(
        "Servicio no disponible",
        "Este servicio no se encuentra disponible actualmente."
      )
      return
    }

    const result = addToCart(service)

    if (result === "added") {
      showToast("Servicio agregado al carrito", "success")
      return
    }

    showWarningAlert(
      "Servicio ya agregado",
      "Este servicio ya se encuentra en tu carrito."
    )
  }

  async function handleRequestNowFlow(): Promise<void> {
    if (!service) {
      showErrorAlert(
        "Servicio no encontrado",
        "No fue posible continuar con la solicitud."
      )
      return
    }

    if (service.availability === "No disponible") {
      showWarningAlert(
        "Servicio no disponible",
        "Este servicio no puede solicitarse actualmente."
      )

      return
    }


    const confirmed = await confirmAction(
      "Solicitar servicio",
      "El servicio se agregará al carrito y pasarás al formulario de solicitud.",
      "Sí, continuar"
    )

    if (!confirmed) {
      return
    }

    addToCart(service)
    navigate("/dashboard/checkout")
  }

  function handleRequestNow(): void {
    void handleRequestNowFlow()
  }

  return {
    service,
    handleBack,
    handleAddToCart,
    handleRequestNow,
  }
}

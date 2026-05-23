import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type { ServiceMock } from "../../interfaces/InterfaceServices"
import { useCart } from "../cart/useCart"
import { useHistory } from "../History/useHistory"
import { getServiceById } from "../../utils/ServiceDetail/service.utils"

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
      return
    }

    const result = addToCart(service)

    if (result === "added") {
      alert("Servicio agregado al carrito.")
      return
    }

    alert("Este servicio ya está en el carrito.")
  }

  function handleRequestNow(): void {
    if (!service) {
      return
    }

    addToCart(service)
    navigate("/dashboard/checkout")
  }

  return {
    service,
    handleBack,
    handleAddToCart,
    handleRequestNow,
  }
}
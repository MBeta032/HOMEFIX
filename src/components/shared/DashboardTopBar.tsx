import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import type { DashboardTopbarProps } from "../../interfaces/Interfacecomponents"
import { AuthContext } from "../../context/AuthContext"
import CartCounter from "../cart/CartCounter"
import { confirmAction, showErrorAlert, showToast } from "../../utils/alerts"

export default function DashboardTopbar({ name }: DashboardTopbarProps) {
  const context = useContext(AuthContext)
  const navigate = useNavigate()

  if (!context) {
    throw new Error("AuthContext no disponible")
  }

  const { logout } = context

  const handleLogout = async (): Promise<void> => {
    const confirmed = await confirmAction(
      "Cerrar sesión",
      "¿Seguro que deseas salir de HomeFix? Por seguridad tendrás que iniciar sesión nuevamente.",
      "Sí, cerrar sesión"
    )

    if (!confirmed) {
      return
    }

    try {
      await logout()
      showToast("Sesión cerrada correctamente", "success")
      navigate("/")
    } catch {
      showErrorAlert(
        "No se pudo cerrar sesión",
        "Intenta nuevamente en unos segundos."
      )
    }
  }

  return (
    <header className="dashboard-topbar">
      <div className="topbar-user">
        <span>
          Hola {name} 👋
          Gestiona tus servicios del hogar
        </span>
      </div>

      <div className="topbar-actions">
        <CartCounter />
        <button
          type="button"
          className="topbar-logout"
          onClick={() => void handleLogout()}
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  )
}

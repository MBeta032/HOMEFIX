import { useContext } from "react"
import type { DashboardTopbarProps } from "../../interfaces/Interfacecomponents"
import { AuthContext } from "../../context/AuthContext"
import CartCounter from "../cart/CartCounter"

export default function DashboardTopbar({ name }: DashboardTopbarProps) {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("AuthContext no disponible")
  }

  const { logout } = context

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
        <button className="topbar-logout" onClick={logout}>
          Cerrar Sesión
        </button>
      </div>
    </header>
  )
}
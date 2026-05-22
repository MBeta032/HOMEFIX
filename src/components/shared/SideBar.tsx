import { NavLink } from "react-router-dom"

const link = [
  { name: "Inicio", path: "/dashboard", end: true },
  { name: "Catalogo", path: "/dashboard/catalogo" },
  { name: "Servicios", path: "/dashboard/servicios" },
  { name: "Historial", path: "/dashboard/historial" },
  { name: "Seguimiento", path: "/dashboard/seguimiento" },
  { name: "Carrito", path: "/dashboard/carrito" },
  { name: "Solicitudes", path: "/dashboard/solicitudes" },
  { name: "Perfil", path: "/dashboard/perfil" },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-logo">HomeFix</h2>

      <nav className="sidebar-nav">
        {link.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.end}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
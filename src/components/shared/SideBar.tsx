import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const link = [
    {name: "Inicio", path:"/dashboard", end: true},
    {name: "Servicios", path:"/dashboard/servicios"},
    {name: "Seguimiento", path:"/dashboard/seguimiento"},
    {name: "Carrito", path:"/dashboard/carrito"},
    {name: "Solicitudes", path:"/dashboard/solicitudes"},        
    {name: "Perfil", path:"/dashboard/perfil"}
]

function Sidebar(){

    const context = useContext(AuthContext)

  if (!context) {
    throw new Error("AuthContext no disponible")
  }

  const {logout} = context
    return(
        <aside className="sidebar">
            <h2 className="sidebar-logo">HomeFix</h2>
            <nav className="sidebar-nav">
            {link.map(link =>(
                <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.end}
                    className={({isActive})=>
                    isActive ? "sidebar-link active" : "sidebar-link"}
                    >
                    {link.name}
                </NavLink>
            ))}
            </nav>

            <button className="sidebar-logout" onClick={logout}>Cerrar Sesión</button>



        </aside>
    )

}




export default Sidebar
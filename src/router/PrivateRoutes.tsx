import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

function PrivateRoute() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("AuthContext no disponible")
    }

    const { user, loading } = context

    if (loading) return <p>Cargando...</p>

    return user ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute
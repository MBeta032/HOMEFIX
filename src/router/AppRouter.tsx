import { Navigate, Route, Routes } from "react-router-dom"
import PrivateRoute from "./PrivateRoutes"
import Register from "../pages/Register"
import HomePublica from "../pages/HomePublica"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import DashboardLayout from "../components/shared/DashboardLayout"
import Services from "../pages/Services"
import ShoppingCar from "../pages/ShoppingCar"
import Profile from "../pages/Profile"
import Traking from "../pages/Traking"
import Requests from "../pages/Requests"
import Catalog from "../pages/Catalog"

function AppRouter() {

    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("AuthContext no disponible")
    }

    return (
        <Routes>
            <Route
            path="/" element={<Navigate to="/home" />}
            />            
            <Route path="/registro" element={<Register />}/>
            <Route path="/home" element={<HomePublica />}/>
            <Route path="/login"element={<Login />}/>
            <Route element={<PrivateRoute />}>
                    <Route element={<DashboardLayout/>}>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/dashboard/catalogo" element={<Catalog/>}/>
                        <Route path="/dashboard/servicios" element={<Services/>}/>
                        <Route path="/dashboard/seguimiento" element={<Traking/>}/>
                        <Route path="/dashboard/carrito" element={<ShoppingCar/>}/>
                        <Route path="/dashboard/solicitudes" element={<Requests/>}/>
                        <Route path="/dashboard/perfil" element={<Profile/>}/>
                    </Route>
            </Route>
        </Routes>
    )
}

export default AppRouter
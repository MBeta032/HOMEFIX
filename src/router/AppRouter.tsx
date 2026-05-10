import { Route, Routes } from "react-router-dom"
import PrivateRoute from "./PrivateRoutes"
import Register from "../pages/Register"
import HomePublica from "../pages/HomePublica"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import ServiceDetailPage from "../pages/ServiceDetailPage"

function AppRouter() {
    return (
        <Routes>

            <Route path="/registro" element={<Register />} />
            <Route path="/Home" element={<HomePublica />} />
            <Route path="/login"element={<Login />} />
            <Route path="/dashboard"element={<Dashboard/>} />
            <Route path="/servicios/:id" element={<ServiceDetailPage />} />


            <Route element={<PrivateRoute />}>
            </Route>

        </Routes>
    )
}

export default AppRouter
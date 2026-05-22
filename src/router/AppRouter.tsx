import { Navigate, Route, Routes } from "react-router-dom"
import PrivateRoute from "./PrivateRoutes"
import Register from "../pages/Register"
import HomePublica from "../pages/HomePublica"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import DashboardLayout from "../components/shared/DashboardLayout"
import Services from "../pages/Services"
import CartPage from "../pages/CartPage"
import Profile from "../pages/Profile"
import Traking from "../pages/Traking"
import Catalog from "../pages/Catalog"
import ServiceDetail from "../pages/ServiceDetail"
import History from "../pages/History"
import RequestPage from "../pages/RequestPage"

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePublica />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/servicios" element={<Services />} />
          <Route path="/dashboard/servicios/:id" element={<ServiceDetail />} />
          <Route path="/dashboard/catalogo" element={<Catalog />} />
          <Route path="/dashboard/historial" element={<History />} />

          <Route
            path="/history"
            element={<Navigate to="/dashboard/historial" replace />}
          />

          <Route path="/dashboard/seguimiento" element={<Traking />} />
          <Route path="/dashboard/carrito" element={<CartPage />} />
          <Route path="/dashboard/checkout" element={<RequestPage />} />

          <Route
            path="/cart"
            element={<Navigate to="/dashboard/carrito" replace />}
          />

          <Route
            path="/checkout"
            element={<Navigate to="/dashboard/checkout" replace />}
          />

          <Route path="/dashboard/solicitudes" element={<Requests />} />
          <Route path="/dashboard/perfil" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRouter

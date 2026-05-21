import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import Register from "../pages/Register";
import HomePublica from "../pages/HomePublica";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../components/shared/DashboardLayout";
import Services from "../pages/Services";
import ShoppingCar from "../pages/ShoppingCar";
import Profile from "../pages/Profile";
import Traking from "../pages/Traking";
import Requests from "../pages/Requests";

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
          <Route path="/dashboard/seguimiento" element={<Traking />} />
          <Route path="/dashboard/carrito" element={<ShoppingCar />} />
          <Route path="/dashboard/solicitudes" element={<Requests />} />
          <Route path="/dashboard/perfil" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
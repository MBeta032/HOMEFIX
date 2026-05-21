import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import Register from "../pages/Register";
import HomePublica from "../pages/HomePublica";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePublica />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
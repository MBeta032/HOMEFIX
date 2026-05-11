import { Navigate, Route, Routes } from "react-router-dom"
import PrivateRoute from "./PrivateRoutes"
import Register from "../pages/Register"
import HomePublica from "../pages/HomePublica"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function AppRouter() {

    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("AuthContext no disponible")
    }

    const { user } = context


    return (
        <Routes>

            <Route
            path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/home" />}
            />            
            <Route path="/registro" element={<Register />}/>
            <Route path="/home" element={<HomePublica />}/>
            <Route path="/login"element={<Login />}/>
            <Route element={<PrivateRoute />}>
                    <Route path="/dashboard"element={<Dashboard/>}/>
            </Route>

        </Routes>
    )
}

export default AppRouter
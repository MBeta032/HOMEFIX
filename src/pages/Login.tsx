import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import "../styles/Login.css"
import { validateLogin } from "../utils/ValidateLogin"

function Login(){
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errors, setErrors] = useState<Record<string, string>>({})    
    const context = useContext(AuthContext)


    if (!context) {
        throw new Error("AuthContext no disponible")
    }

    const { user, login, loading, loginGoogle } = context

    const navigate = useNavigate()


    useEffect(() => {
        if (!loading && user) {
            navigate("/dashboard")
        }
    }, [user, loading, navigate])

    
    const handleLogin = async () => {
        const validationErrors = validateLogin(email, password)

        setErrors(validationErrors)

        if (Object.keys(validationErrors).length > 0) return

        try {
            await login(email, password)
            navigate("/home")

        } catch (error: unknown) {
            const err = error as { code?: string }

            switch (err.code) {
                case "auth/invalid-email":
                    setErrors({ email: "Email inválido" })
                    break

                case "auth/invalid-credential":
                    setErrors({ general: "Credenciales incorrectas" })
                    break

                default:
                    setErrors({ general: "Error inesperado" })
            }
        }
    }

    return (
        <div className="login-container">

            <div className="login-card">

                <h2 className="login-title">Iniciar sesión</h2>

                {errors.email && (<p className="error-text">{errors.email}</p>)}
                <input className="login-input"type="email"placeholder="Correo Electronico" value={email} onChange={(e) => setEmail(e.target.value)}
                />

                {errors.password && (<p className="error-text">{errors.password}</p>)}
                <input className="login-input" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button onClick={loginGoogle} className="google-button">
                <img src="/src/assets/images/Google.png" alt="Google" />
                Iniciar sesión con Google
                </button>

                <button
                    className="login-button" onClick={handleLogin} disabled={loading}>
                    {loading ? "Cargando..." : "Ingresar"}
                </button>

                {errors.general && (<p className="error-text">{errors.general}</p>)}

                <p className="login-link">
                    ¿No tienes cuenta?{" "}
                    <Link to="/registro">Regístrate</Link>
                </p>

            </div>

        </div>
    )
}



export default Login
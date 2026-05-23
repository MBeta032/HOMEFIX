import { useContext, useEffect, useState, type FormEvent } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import "../styles/Login.css"
import { validateLogin } from "../utils/UtilValidateLogin"
import {
  showErrorAlert,
  showSuccessAlert,
  showWarningAlert,
} from "../utils/alerts"
import { getFirebaseErrorMessage } from "../utils/firebaseErrors"

function Login() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const context = useContext(AuthContext)
  const navigate = useNavigate()

  if (!context) {
    throw new Error("AuthContext no disponible")
  }

  const { user, login, loginGoogle, loading } = context

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard")
    }
  }, [user, loading, navigate])

  const handleBackHome = (): void => {
    navigate("/")
  }

  const handleLogin = async (): Promise<void> => {
    const validationErrors = validateLogin(email, password)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      showWarningAlert(
        "Datos incompletos",
        "Revisa el correo y la contraseña antes de continuar."
      )
      return
    }

    try {
      setIsSubmitting(true)
      setErrors({})

      await login(email.trim(), password)

      showSuccessAlert(
        "Inicio de sesión exitoso",
        "Bienvenido nuevamente a HomeFix."
      )

      navigate("/dashboard")
    } catch (error: unknown) {
      const message = getFirebaseErrorMessage(error)

      setErrors({ general: message })
      showErrorAlert("Error al iniciar sesión", message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    void handleLogin()
  }

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      setIsSubmitting(true)
      setErrors({})

      await loginGoogle()

      showSuccessAlert(
        "Inicio de sesión exitoso",
        "Entraste a HomeFix usando tu cuenta de Google."
      )

      navigate("/dashboard")
    } catch (error: unknown) {
      const message = getFirebaseErrorMessage(error)

      setErrors({ general: message })
      showErrorAlert("Error con Google", message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <button
          type="button"
          className="login-back-button"
          onClick={handleBackHome}
        >
          ← Volver al inicio
        </button>

        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Iniciar sesión</h2>

          {errors.general && <p className="error-text">{errors.general}</p>}

          <label className="login-label" htmlFor="email">
            Correo electrónico
          </label>
          {errors.email && <p className="error-text">{errors.email}</p>}
          <input
            id="email"
            className="login-input"
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label className="login-label" htmlFor="password">
            Contraseña
          </label>
          {errors.password && <p className="error-text">{errors.password}</p>}
          <input
            id="password"
            className="login-input"
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button
            className="login-button"
            type="submit"
            disabled={isSubmitting || loading}
          >
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <button
          className="google-button"
          type="button"
          onClick={() => void handleGoogleLogin()}
          disabled={isSubmitting || loading}
        >
          <img src="/src/assets/images/google.png" alt="Google" />
          Continuar con Google
        </button>

        <p className="login-link">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
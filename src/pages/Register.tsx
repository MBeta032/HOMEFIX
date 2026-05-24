import {
  useContext,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"
import type { RegisterData } from "../interfaces/Auth/InterfaceAuth"
import { AuthContext } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import validateRegister from "../utils/UtilValidateRegister"
import "../styles/Register.css"
import {
  showErrorAlert,
  showSuccessAlert,
  showWarningAlert,
} from "../utils/alerts"
import { getFirebaseErrorMessage } from "../utils/firebaseErrors"

function Register() {
  const [form, setForm] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    zone: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const context = useContext(AuthContext)
  const navigate = useNavigate()

  if (!context) {
    throw new Error("AuthContext no disponible")
  }

  const { register } = context

  const handleBackHome = (): void => {
    navigate("/")
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const handleRegister = async (): Promise<void> => {
    const validationErrors = validateRegister(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      showWarningAlert(
        "Datos incompletos",
        "Revisa los campos marcados antes de crear tu cuenta."
      )
      return
    }

    try {
      setIsSubmitting(true)
      setErrors({})

      await register(form)

      showSuccessAlert(
        "Cuenta creada correctamente",
        "Tu cuenta de cliente fue creada en HomeFix."
      )

      navigate("/dashboard")
    } catch (error: unknown) {
      const message = getFirebaseErrorMessage(error)

      setErrors({ general: message })
      showErrorAlert("Error al registrarse", message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    void handleRegister()
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <button
          type="button"
          className="register-back-button"
          onClick={handleBackHome}
        >
          ← Volver al inicio
        </button>

        <form className="register-form" onSubmit={handleSubmit}>
          <h2 className="register-title">Crear cuenta</h2>

          {errors.general && <p className="register-error">{errors.general}</p>}

          <label className="register-label" htmlFor="name">
            Nombre completo
          </label>
          {errors.name && <p className="register-error">{errors.name}</p>}
          <input
            id="name"
            className="register-input"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
          />

          <label className="register-label" htmlFor="email">
            Correo electrónico
          </label>
          {errors.email && <p className="register-error">{errors.email}</p>}
          <input
            id="email"
            className="register-input"
            name="email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={form.email}
            onChange={handleChange}
          />

          <label className="register-label" htmlFor="password">
            Contraseña
          </label>
          {errors.password && <p className="register-error">{errors.password}</p>}
          <input
            id="password"
            className="register-input"
            name="password"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={form.password}
            onChange={handleChange}
          />

          <label className="register-label" htmlFor="confirmPassword">
            Confirmar contraseña
          </label>
          {errors.confirmPassword && (
            <p className="register-error">{errors.confirmPassword}</p>
          )}
          <input
            id="confirmPassword"
            className="register-input"
            name="confirmPassword"
            type="password"
            placeholder="Repite tu contraseña"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <label className="register-label" htmlFor="phone">
            Teléfono
          </label>
          {errors.phone && <p className="register-error">{errors.phone}</p>}
          <input
            id="phone"
            className="register-input"
            name="phone"
            placeholder="3001234567"
            value={form.phone}
            onChange={handleChange}
          />

          <label className="register-label" htmlFor="address">
            Dirección
          </label>
          {errors.address && <p className="register-error">{errors.address}</p>}
          <input
            id="address"
            className="register-input"
            name="address"
            placeholder="Calle 10 # 20-30"
            value={form.address}
            onChange={handleChange}
          />

          <label className="register-label" htmlFor="city">
            Ciudad
          </label>
          {errors.city && <p className="register-error">{errors.city}</p>}
          <input
            id="city"
            className="register-input"
            name="city"
            placeholder="Cali"
            value={form.city}
            onChange={handleChange}
          />

          <label className="register-label" htmlFor="zone">
            Zona o barrio
          </label>
          {errors.zone && <p className="register-error">{errors.zone}</p>}
          <input
            id="zone"
            className="register-input"
            name="zone"
            placeholder="Sur, norte, centro o barrio"
            value={form.zone}
            onChange={handleChange}
          />

          <button
            className="register-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className="register-link">
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
import { useContext, useState, type ChangeEvent } from "react";
import type { RegisterData } from "../interfaces/Auth/InterfaceAuth";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import validateRegister from "../utils/UtilValidateRegister";
import "../styles/Register.css";

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
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext no disponible");
  }

  const { register } = context;
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = async () => {
    const validationErrors = validateRegister(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      await register(form);
      navigate("/dashboard");
    } catch (error: unknown) {
      const err = error as { code?: string };

      if (err.code === "auth/email-already-in-use") {
        setErrors({ general: "Este correo ya está registrado." });
        return;
      }

      if (err.code === "auth/weak-password") {
        setErrors({ general: "La contraseña es demasiado débil." });
        return;
      }

      if (err.code === "auth/invalid-email") {
        setErrors({ general: "El correo no tiene un formato válido." });
        return;
      }

      setErrors({ general: "No se pudo crear la cuenta. Intenta nuevamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Crear cuenta</h2>

        {errors.general && <p className="register-error">{errors.general}</p>}

        {errors.name && <p className="register-error">{errors.name}</p>}
        <input
          className="register-input"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
        />

        {errors.email && <p className="register-error">{errors.email}</p>}
        <input
          className="register-input"
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
        />

        {errors.password && <p className="register-error">{errors.password}</p>}
        <input
          className="register-input"
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
        />

        {errors.confirmPassword && (
          <p className="register-error">{errors.confirmPassword}</p>
        )}
        <input
          className="register-input"
          name="confirmPassword"
          type="password"
          placeholder="Confirmar contraseña"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        {errors.phone && <p className="register-error">{errors.phone}</p>}
        <input
          className="register-input"
          name="phone"
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleChange}
        />

        {errors.address && <p className="register-error">{errors.address}</p>}
        <input
          className="register-input"
          name="address"
          placeholder="Dirección"
          value={form.address}
          onChange={handleChange}
        />

        {errors.city && <p className="register-error">{errors.city}</p>}
        <input
          className="register-input"
          name="city"
          placeholder="Ciudad"
          value={form.city}
          onChange={handleChange}
        />

        {errors.zone && <p className="register-error">{errors.zone}</p>}
        <input
          className="register-input"
          name="zone"
          placeholder="Zona o barrio"
          value={form.zone}
          onChange={handleChange}
        />

        <button
          className="register-button"
          onClick={handleRegister}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registrando..." : "Registrarse"}
        </button>

        <p className="login-link">
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
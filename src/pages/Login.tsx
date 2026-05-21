import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { validateLogin } from "../utils/ValidateLogin";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext no disponible");
  }

  const { user, login, loginGoogle, loading } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const handleLogin = async () => {
    const validationErrors = validateLogin(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (error: unknown) {
      const err = error as { code?: string };

      switch (err.code) {
        case "auth/invalid-email":
          setErrors({ email: "Correo inválido." });
          break;

        case "auth/invalid-credential":
          setErrors({ general: "Correo o contraseña incorrectos." });
          break;

        case "auth/user-not-found":
          setErrors({ general: "No existe una cuenta con este correo." });
          break;

        case "auth/wrong-password":
          setErrors({ general: "La contraseña es incorrecta." });
          break;

        default:
          setErrors({
            general: "No se pudo iniciar sesión. Intenta nuevamente.",
          });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsSubmitting(true);
      setErrors({});

      await loginGoogle();
      navigate("/dashboard");
    } catch (error: unknown) {
      const err = error as { code?: string };

      switch (err.code) {
        case "auth/popup-closed-by-user":
          setErrors({
            general: "Cerraste la ventana de Google antes de iniciar sesión.",
          });
          break;

        case "auth/cancelled-popup-request":
          setErrors({
            general: "Ya hay una ventana de Google abierta.",
          });
          break;

        case "auth/account-exists-with-different-credential":
          setErrors({
            general:
              "Ya existe una cuenta con este correo usando otro método de inicio de sesión.",
          });
          break;

        default:
          setErrors({
            general: "No se pudo iniciar sesión con Google. Intenta nuevamente.",
          });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar sesión</h2>

        {errors.general && <p className="error-text">{errors.general}</p>}

        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          className="login-input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        {errors.password && <p className="error-text">{errors.password}</p>}
        <input
          className="login-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button
          className="login-button"
          onClick={handleLogin}
          disabled={isSubmitting || loading}
        >
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </button>

        <button
          className="google-button"
          onClick={handleGoogleLogin}
          disabled={isSubmitting || loading}
        >
          <img src="/Google.png" alt="Google" />
          Continuar con Google
        </button>

        <p className="login-link">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
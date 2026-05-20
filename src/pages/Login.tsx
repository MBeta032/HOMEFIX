import { Link } from "react-router-dom";

function Login() {
  return (
    <main className="placeholder-page">
      <h2>Inicio de sesión</h2>
      <p>Esta ruta queda preparada para la HU de autenticación.</p>
      <Link to="/">Volver al inicio</Link>
    </main>
  );
}

export default Login;
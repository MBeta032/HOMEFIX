import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("AuthContext no disponible");
  }

  const { userData, logout } = context;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <main style={{ padding: "32px" }}>
      <h2>Panel del cliente</h2>

      <p>Sesión iniciada correctamente.</p>

      {userData && (
        <div>
          <p>
            <strong>Nombre:</strong> {userData.name}
          </p>
          <p>
            <strong>Correo:</strong> {userData.email}
          </p>
          <p>
            <strong>Ciudad:</strong> {userData.city}
          </p>
          <p>
            <strong>Zona:</strong> {userData.zone}
          </p>
        </div>
      )}

      <button onClick={handleLogout}>Cerrar sesión</button>
    </main>
  );
}

export default Dashboard;
import { Outlet } from "react-router-dom";
import DashboardTopbar from "./DashboardTopBar";
import Sidebar from "./SideBar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/Dashboard.css";

function DashboardLayout() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext no disponible");
  }

  const { userData } = context;

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <DashboardTopbar name={userData?.name || "Cliente"} />

        <div className="dashboard-page">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
import type { DashboardTopbarProps } from "../../interfaces/components";


export default function DashboardTopbar({name}: DashboardTopbarProps) {
  return (
    <header className="dashboard-topbar">

      <div className="topbar-user">
        <span>
          Hola {name} 👋
          Gestiona tus servicios del hogar
        </span>


      </div>

    </header>
  ); 
}
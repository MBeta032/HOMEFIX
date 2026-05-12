import PageHeader from "../components/shared/PageHeader";
import "../styles/Dashboard.css"

const info = [
  {
    tittle: "Solicitudes Activas",
    value: 2,
    icon: "📦"
  },
  {
    tittle: "Servicios Completados",
    value: 5,
    icon: "✅"
  },

  {
    tittle: "Servicios disponibles",
    value: 8,
    icon: "🔧",
  },

  {
    tittle: "Carrito",
    value: 1,
    icon: "🛒",
  },
]

const requests = [
  {
    service: "Plomeria",
    state: "Completado"
  },

  {
    service: "Limpieza",
    state: "Completado"
  },

  {
    service: "Electricidad",
    state: "Pendiente"
  },
]

const popular = [
  "🔧 Plomería",
  "⚡ Electricidad",
  "🧹 Limpieza",
  "🌿 Jardinería",
]

 function Dashboard() {
  return (
    <div className="dashboard-home">
      <PageHeader
        title="Dashboard"
        subtitle="Ten conocimiento sobre tus servicios y solicitudes"
      />

      <section className="dashboard-info">
           {info.map(item => (
              <div 
              key={item.tittle}
              className="info-card">
                <div className="info-icon">
                  {item.icon}
                </div>
                <h3>{item.value}</h3>
                <p>{item.tittle}</p>
              </div>
           ))}
      </section>

      <section className="dashboard-content">
           <div className="dashboard-box">
              <h2>Ultimas solicitudes</h2>
              <div className="requests-list">
                {requests.map(item =>(
                  <div key={item.service}
                  className="requests-item">
                    <span>{item.service}</span>
                    <span className="state">{item.state}</span>
                  </div>
                ))}
              </div>
           </div>

           <div className="dashboard-box">
                <h2>Servicios Populares</h2>
                <div className="popular-list">
                  {popular.map(item =>(
                    <div
                    key={item}
                    className="popular-item">
                      {item}
                    </div>
                  ))}
                </div>
           </div>
      </section>

    </div>

  );
} 

export default Dashboard
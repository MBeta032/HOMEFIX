import { useNavigate, useParams } from "react-router-dom"
import EmptyState from "../components/shared/EmptyState"
import { servicesMock } from "../data/ServicesMock"
import "../styles/Services.css"

function ServiceDetail(){
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const service = servicesMock.find((item) => item.id === id)

    if(!service){
        return(
            <div className="dashboard-page">
                <EmptyState 
                    title="Servicio no encontrado"
                    description="El servicio que intentas consultar no existe o no esta disponible."
                />
                <button className="btn-primary" onClick={() => navigate("/dashboard/servicios")}>Volver a servicios</button>
            </div>
        )
    }

    return(
        <div className="dashboard-page">
            <div className="page-header">
                <h1>{service.name}</h1>
                <p>{service.company}</p>
            </div>

            <div className="service-card">
                <div className="service-card-header">
                    <span className="service-card-category">{service.category}</span>
                    <span className={`service-card-availability ${service.availability === "Disponible" ? "available" : "unavailable"}`}>{service.availability}</span>
                </div>

                <p className="service-card-description">{service.description}</p>

                <div className="service-card-info">
                    <span>📍 {service.zone}</span>
                    <span>⏱ {service.duration}</span>
                    <span>⭐ {service.rating}</span>
                </div>

                <div className="service-card-footer">
                    <span className="service-card-price">{`$${service.price.toLocaleString("es-CO")}`}</span>
                    <button className="btn-primary" onClick={() => navigate("/dashboard/servicios")}>Volver</button>
                </div>
            </div>
        </div>
    )
}

export default ServiceDetail
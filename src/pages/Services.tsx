import { useMemo, useState } from "react"
import SearchBar from "../components/shared/Searchbar"
import EmptyState from "../components/shared/EmptyState"
import ServicesCard from "../components/shared/ServicesCard"
import "../styles/Services.css"
import FunServices from "../utils/services"
import type { FilterServices } from "../interfaces/InterfaceServices"
import FilterBar from "../components/shared/FilterBar"

function Services(){
    const [search, setSearch] = useState("")
    const [filters, setFilters] = useState<FilterServices>({})

    const result = useMemo(() => FunServices(search, filters), [search, filters])


    return(
        <div className="dashboard-page">
            <div className="page-header">
                <h1>Servicios para el hogar</h1>
                <p>Busca el servicio que necesitas segun nombre, empresa o zona</p>
            </div>
            <SearchBar 
                value={search}
                onChange={(value) => setSearch(value)}
                onSearch={() =>{}}
                placeholder="Buscar por servicio, empresa o zona..."
                buttonText="Buscar"/>

            <FilterBar filters={filters} onChange={setFilters}/>

            <div className="services-section-header">
                {search.trim() 
                    ? <h2>Resultados para: "{search}"</h2>
                    : <h2>Servicios disponibles</h2>
                }
                <span>{result.length} Servicios encontramos</span>
            </div>
            {result.length === 0 
                ?<EmptyState />
                : (
                    <div className="services-grid">{result.map((service => (
                        <ServicesCard key={service.id} service={service}/>
                    )))}</div>
                )
            }
        </div>

    )
}

export default Services
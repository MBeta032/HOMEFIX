import { servicesMock } from "../../data/ServicesMock";
import type { FilterBarProps, FilterServices } from "../../interfaces/InterfaceServices";
import SelectField from "./SelectField";

const categorys = [...new Set(servicesMock.map(s => s.category))].map((c => ({label: c, value: c})))
const companies = [...new Set(servicesMock.map(s => s.company))].map((c => ({label: c, value: c})))
const zones = [...new Set(servicesMock.map(s => s.zone))].map((z => ({label: z, value: z})))
const availability = [...new Set(servicesMock.map(s => s.availability))].map((a => ({label: a, value: a})))

const price = [
    { label: "$60.000", value: "60000" },
    { label: "$100.000", value: "100000" },
    { label: "$150.000", value: "150000" },
    { label: "$200.000", value: "200000" },
]

const ratings = [
    { label: "4.0 o más", value: "4" },
    { label: "4.5 o más", value: "4.5" },
]

function FilterBar({filters, onChange}: FilterBarProps){
    const update = (key: keyof FilterServices, val: string) =>
        onChange({...filters, [key]: val || undefined})

    return(
        <div className="filter-bar">    
            <SelectField
            label="Categoria"
            value={filters.category || ""}
            onChange={(v) => update("category", v)}
            options={categorys}
            />

            <SelectField
            label="Empresa"
            value={filters.company || ""}
            onChange={(v) => update("company", v)}
            options={companies}
            />

            <SelectField
            label="Zona"
            value={filters.zone || ""}
            onChange={(v) => update("zone", v)}
            options={zones}
            />

            <SelectField
            label="Disponibilidad"
            value={filters.availability || ""}
            onChange={(v) => update("availability", v)}
            options={availability}
            />

            <SelectField
            label="Precio Maximo"
            value={filters.maxPrice?.toString() || ""}
            onChange={(v) => onChange({...filters, maxPrice: v ? Number(v) : undefined})}
            options={price}
            />

            <SelectField
            label="Valoracion minima"
            value={filters.rating?.toString() || ""}
            onChange={(v) => onChange({...filters, rating: v ? Number(v) : undefined})}
            options={ratings}
            />

            <button className="filter-clear" onClick={() => onChange({})}>Limpiar filtros</button>  
        </div>
    )
}

export default FilterBar
import type { SearchBarProps } from "../../interfaces/components";


function SearchBar({
    value,
    onChange,
    onSearch,
    placeholder = "Por favor ingresa una zona o barrio.",
    buttonText = "Buscar", 
}: SearchBarProps){
    return (
        <div className="busqueda-contenedor">

        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            
            className="busqueda-input"
        />

        <button
            onClick={onSearch}
            className="btn-primary"
        >
            {buttonText}
        </button>

        </div>
    )
} 


export default SearchBar
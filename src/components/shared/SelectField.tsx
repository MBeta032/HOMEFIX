import type { SelectFieldProps } from "../../interfaces/InterfaceServices";
import "../../styles/Services.css"

function SelectField({label, value, onChange, options, placeholder = "Todos"}: SelectFieldProps){
    return(
        <div className="select-field">
            <label className="select-label">{label}</label>
            <select 
                className="select-input" 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                >
                <option value="">{placeholder}</option>  
                {options.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}  
            </select>

        </div>
    )
}

export default SelectField
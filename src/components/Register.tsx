import { useContext, useState } from "react"
import type { RegisterData } from "../interfaces/InterfaceAuth"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import validateRegister from "../utils/validateRegister"

function Register(){
    const [form , setForm] = useState<RegisterData>({
        name : "",
        email : "",
        password : "",
        confirmPassword : "",
        phone : "",
        address : ""
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("AuthContext no disponible")
    }

    const { register } = context
    const navigate = useNavigate()

    const handleRegister = async () =>{
        const validationErrors = validateRegister(form)

        setErrors(validationErrors)

        if(Object.keys(validationErrors).length > 0) return
        try {
            await register(form)
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
}


    return (
        <div>

            <input name="name" onChange={handleChange} />
            {errors.name && <p>{errors.name}</p>}

            <input name="email" onChange={handleChange} />
            {errors.email && <p>{errors.email}</p>}

            <input name="password" type="password" onChange={handleChange} />
            {errors.password && <p>{errors.password}</p>}

            <input name="confirmPassword" type="password" onChange={handleChange} />
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

            <input name="phone" onChange={handleChange} />
            {errors.phone && <p>{errors.phone}</p>}

            <input name="address" onChange={handleChange} />
            {errors.address && <p>{errors.address}</p>}

            <button onClick={handleRegister}>
                Registrarse
            </button>
        </div>
    )

}

export default Register
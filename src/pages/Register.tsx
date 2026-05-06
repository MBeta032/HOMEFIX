import { useContext, useState } from "react"
import type { RegisterData } from "../interfaces/InterfaceAuth"
import { AuthContext } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import validateRegister from "../utils/validateRegister"
import  "../styles/Register.css"

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
        <div className="register-container">

            <div className="register-card">

                <h2 className="register-title">Crear cuenta</h2>

                {errors.name && <p className="register-error">{errors.name}</p>}
                <input className="register-input" name="name" placeholder="Nombre"  onChange={handleChange} />
                {errors.email && <p className="register-error">{errors.email}</p>}
                <input className="register-input" name="email" placeholder="Correo Electronico" onChange={handleChange} />

                {errors.password && <p className="register-error">{errors.password}</p>}
                <input className="register-input" name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
                
                {errors.confirmPassword && <p className="register-error">{errors.confirmPassword}</p>}
                <input className="register-input" name="confirmPassword" type="password" placeholder="Confirmar Contraseña" onChange={handleChange} />
                
                {errors.phone && <p className="register-error">{errors.phone}</p>}
                <input className="register-input" name="phone" placeholder="Telefono" onChange={handleChange} />
                
                {errors.address && <p className="register-error">{errors.address}</p>}
                <input className="register-input" name="address" placeholder="Direccion" onChange={handleChange} />
                

                <button className="register-button" onClick={handleRegister}>
                    Registrarse
                </button>
                <p className="login-link">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login">Iniciar sesion</Link>
                </p>


            </div>
        </div>
    )

}

export default Register
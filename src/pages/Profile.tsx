import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { validatePassword, validateProfile } from "../utils/UtilValidateUpdate"
import "../styles/Profile.css"

function Profile(){
    
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("AuthContext no disponible")
    }
    
    const {user, userData, updateUserData, changePassword, changeEmail, rechargeAuth, resetPassword} = context
    const isGoogle = user?.providerData[0]?.providerId === "google.com"

    const [edit, setEdit] = useState(false)
    const [form, setForm] = useState({
        name: userData?.name || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        address: userData?.address || ""
    })

    const [password, setPassword] = useState({
        newPassword: "",
        confirmPassword: ""
    })
    const [currentPassword, setCurrentPassword] = useState("")

    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [notUpdate, setNotUpdate] = useState("")

    const handleUpdate = async () =>{
        const validationErrors = validateProfile(form)
        setErrors(validationErrors)
        if (Object.keys(validationErrors).length > 0) return

        try {
            await updateUserData(form)
            if (form.email !== userData?.email){
                await changeEmail(form.email)
            }
            setEdit(false)
            setMessage("Perfil actualizado correctamente")
            setNotUpdate("")
        } catch {
            setNotUpdate("Error al actualizar el perfil")
            
        }
    }

    const handleResetPassword = async () => {
        try {
            await resetPassword()
            setMessage("Correo de restablecimiento enviado. Revisa tu bandeja.")
            setNotUpdate("")
        } catch {
            setNotUpdate("Error al enviar el correo.")
        }
    }

    const handleChangePassword = async () =>{
        const validationErrors = validatePassword(password.newPassword, password.confirmPassword)
            setErrors(validationErrors)
            if (Object.keys(validationErrors).length > 0) return

            try {
                await rechargeAuth(currentPassword)
                await changePassword(password.newPassword)
                setPassword({ newPassword: "", confirmPassword: ""})
                setMessage("Contraseña actualizada correctamente")
                setNotUpdate("")
            } catch{
                setNotUpdate("Contraseña actual incorrecta o sesión expirada")
            }
    }



    return(
        <div className="dashboard-page">
            <div className="page-header">
                <h1>Mi Perfil</h1>
                <p>Gestiona tu informacion personal</p>
            </div>

            {message && <p className="profile-message success">{message}</p>}
            {notUpdate && <p className="profile-message error">{notUpdate}</p>}

            <div className="profile-card">
                <div className="profile-card-header">
                    <h2>Datos Personales</h2>
                    <button 
                    className={edit ? "btn-secondary" : "btn-primary"}
                    onClick={() => {
                        setEdit(!edit) 
                        setErrors({}) 
                        setMessage("") 
                        setNotUpdate("")
                    }}>
                        {edit ? "Cancelar" : "Editar"}
                    </button>
                </div>

                {edit ? (
                    <>
                        <div className="profile-field">
                            <label className="profile-label">Nombre</label>
                            <input className="profile-input" 
                                type="text" 
                                value={form.name} 
                                onChange={(e) => setForm({...form, name: e.target.value})} />
                                {errors.name && <p className="profile-error">{errors.name}</p>}
                        </div>

                        <div className="profile-field">
                            <div className="profile-field">
                                <label className="profile-label">Correo</label>
                                <input
                                    className="profile-input"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({...form, email: e.target.value })}/>
                                {errors.newEmail && <p className="profile-error">{errors.newEmail}</p>}
                            </div>
                        </div>

                        <div className="profile-field">
                            <label className="profile-lavel">Telefono</label>
                            <input className="profile-input" 
                                type="text" 
                                value={form.phone} 
                                onChange={(e) => setForm({...form, phone: e.target.value})} />
                                {errors.phone && <p className="profile-error">{errors.phone}</p>}
                        </div>
                        <div className="profile-field">
                            <label className="profile-lavel">Direccion</label>
                            <input className="profile-input" 
                                type="text" 
                                value={form.address} 
                                onChange={(e) => setForm({...form, address: e.target.value})} />
                                {errors.address && <p className="profile-error">{errors.address}</p>}
                        </div>
                        <button className="btn-primary" onClick={handleUpdate}>Guardar Cambios</button>
                    </>
                ) : (
                    <>
                        <div className="profile-field">
                            <label className="profile-label">Nombre</label>
                            <p className="profile-value">{userData?.name || "-"}</p>
                        </div>
                        <div className="profile-field">
                            <label className="profile-label">Email</label>
                            <p className="profile-value">{userData?.email}</p>
                        </div>
                        <div className="profile-field">
                            <label className="profile-label">Telefono</label>
                            <p className="profile-value">{userData?.phone || "No registrado"}</p>
                        </div>
                        <div className="profile-field">
                            <label className="profile-label">Direccion</label>
                            <p className="profile-value">{userData?.address || "No registrado"}</p>
                        </div>
                        <div className="profile-field">
                            <label className="profile-label">Miembro desde</label>
                            <p className="profile-value">{userData?.createdIn ? new Date(userData.createdIn).toLocaleDateString("es-CO") : "-"}</p>
                        </div>
                    </>
                )}
            </div>

            <div className="profile-card">
                <h2>Cambiar contraseña</h2>

                {isGoogle ? (
                    <>
                        <p className="profile-subtitle">
                            Te enviaremos un correo a <strong>{userData?.email}</strong> para restablecer tu contraseña
                        </p>
                        <button className="btn-primary" onClick={handleResetPassword}>
                            Enviar correo de restablecimiento
                        </button>
                    </>
                ) : (
                    <>
                        <p className="profile-subtitle">Mínimo 6 caracteres y debe contener un número</p>

                        <div className="profile-field">
                            <label className="profile-label">Contraseña actual</label>
                            <input className="profile-input"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)} />
                        </div>

                        <div className="profile-field">
                            <label className="profile-label">Nueva contraseña</label>
                            <input className="profile-input"
                                type="password"
                                value={password.newPassword}
                                onChange={(e) => setPassword({...password, newPassword: e.target.value})} />
                            {errors.newPassword && <p className="profile-error">{errors.newPassword}</p>}
                        </div>

                        <div className="profile-field">
                            <label className="profile-label">Confirmar contraseña</label>
                            <input className="profile-input"
                                type="password"
                                value={password.confirmPassword}
                                onChange={(e) => setPassword({...password, confirmPassword: e.target.value})} />
                            {errors.confirmPassword && <p className="profile-error">{errors.confirmPassword}</p>}
                        </div>

                        <button className="btn-primary" onClick={handleChangePassword}>
                            Cambiar contraseña
                        </button>
                    </>
                )}
            </div>
        </div>
            
    )
}

export default Profile
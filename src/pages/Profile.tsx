import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import {
  validatePassword,
  validateProfile,
  type PasswordUpdateForm,
  type ProfileUpdateForm,
} from "../utils/UtilValidateUpdate"
import "../styles/Profile.css"

function Profile() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("AuthContext no disponible")
  }

  const {
    user,
    userData,
    loading,
    updateUserData,
    rechargeAuth,
    changeEmail,
    changePassword,
    resetPassword,
  } = context

  const isGoogleUser = user?.providerData[0]?.providerId === "google.com"

  const [editProfile, setEditProfile] = useState(false)
  const [profileForm, setProfileForm] = useState<ProfileUpdateForm>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zone: "",
  })

  const [passwordForm, setPasswordForm] = useState<PasswordUpdateForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    if (userData) {
      setProfileForm({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        city: userData.city || "",
        zone: userData.zone || "",
      })
    }
  }, [userData])

  const cleanMessages = () => {
    setErrors({})
    setMessage("")
    setErrorMessage("")
  }

  const handleProfileChange = (field: keyof ProfileUpdateForm, value: string) => {
    setProfileForm({
      ...profileForm,
      [field]: value,
    })
  }

  const handlePasswordChange = (
    field: keyof PasswordUpdateForm,
    value: string
  ) => {
    setPasswordForm({
      ...passwordForm,
      [field]: value,
    })
  }

  const handleUpdateProfile = async () => {
    cleanMessages()

    const validationErrors = validateProfile(profileForm)
    const emailChanged = profileForm.email !== userData?.email

    if (emailChanged && isGoogleUser) {
      validationErrors.email =
        "El correo de una cuenta de Google no se puede cambiar desde aquí"
    }

    if (
      emailChanged &&
      !isGoogleUser &&
      !passwordForm.currentPassword.trim()
    ) {
      validationErrors.currentPassword =
        "Para cambiar el correo ingresa tu contraseña actual"
    }

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    try {
      if (emailChanged && !isGoogleUser) {
        await rechargeAuth(passwordForm.currentPassword)
        await changeEmail(profileForm.email)
      }

      await updateUserData({
        name: profileForm.name,
        phone: profileForm.phone,
        address: profileForm.address,
        city: profileForm.city,
        zone: profileForm.zone,
      })

      setEditProfile(false)
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setMessage("Perfil actualizado correctamente")
    } catch {
      setErrorMessage(
        "No se pudo actualizar el perfil. Verifica los datos e intenta nuevamente."
      )
    }
  }

  const handleUpdatePassword = async () => {
    cleanMessages()

    if (isGoogleUser) {
      setErrorMessage(
        "Las cuentas de Google no cambian contraseña desde HomeFix."
      )
      return
    }

    const validationErrors = validatePassword(passwordForm)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    try {
      await rechargeAuth(passwordForm.currentPassword)
      await changePassword(passwordForm.newPassword)

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      setMessage("Contraseña actualizada correctamente")
    } catch {
      setErrorMessage("La contraseña actual no es correcta o la sesión expiró.")
    }
  }

  const handleResetPassword = async () => {
    cleanMessages()

    try {
      await resetPassword()
      setMessage("Se envió un correo para restablecer la contraseña.")
    } catch {
      setErrorMessage("No se pudo enviar el correo de restablecimiento.")
    }
  }

  if (loading) {
    return (
      <div className="dashboard-page">
        <p>Cargando perfil...</p>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Mi perfil</h1>
        <p>Consulta y actualiza tu información personal en HomeFix.</p>
      </div>

      {message && <p className="profile-alert success">{message}</p>}
      {errorMessage && <p className="profile-alert error">{errorMessage}</p>}

      <div className="profile-layout">
        <section className="profile-card">
          <div className="profile-card-header">
            <div>
              <h2>Datos personales</h2>
              <p>Información principal de tu cuenta.</p>
            </div>

            <button
              className={editProfile ? "btn-secondary" : "btn-primary"}
              onClick={() => {
                setEditProfile(!editProfile)
                cleanMessages()
              }}
            >
              {editProfile ? "Cancelar" : "Editar perfil"}
            </button>
          </div>

          {editProfile ? (
            <div className="profile-form">
              <div className="profile-field">
                <label>Nombre</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) =>
                    handleProfileChange("name", e.target.value)
                  }
                />
                {errors.name && <span>{errors.name}</span>}
              </div>

              <div className="profile-field">
                <label>Correo</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) =>
                    handleProfileChange("email", e.target.value)
                  }
                  disabled={isGoogleUser}
                />
                {errors.email && <span>{errors.email}</span>}
              </div>

              {profileForm.email !== userData?.email && !isGoogleUser && (
                <div className="profile-field">
                  <label>Contraseña actual</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      handlePasswordChange("currentPassword", e.target.value)
                    }
                    placeholder="Necesaria para cambiar correo"
                  />
                  {errors.currentPassword && (
                    <span>{errors.currentPassword}</span>
                  )}
                </div>
              )}

              <div className="profile-field">
                <label>Teléfono</label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) =>
                    handleProfileChange("phone", e.target.value)
                  }
                />
                {errors.phone && <span>{errors.phone}</span>}
              </div>

              <div className="profile-field">
                <label>Dirección</label>
                <input
                  type="text"
                  value={profileForm.address}
                  onChange={(e) =>
                    handleProfileChange("address", e.target.value)
                  }
                />
                {errors.address && <span>{errors.address}</span>}
              </div>

              <div className="profile-field">
                <label>Ciudad</label>
                <input
                  type="text"
                  value={profileForm.city}
                  onChange={(e) =>
                    handleProfileChange("city", e.target.value)
                  }
                />
                {errors.city && <span>{errors.city}</span>}
              </div>

              <div className="profile-field">
                <label>Zona</label>
                <input
                  type="text"
                  value={profileForm.zone}
                  onChange={(e) =>
                    handleProfileChange("zone", e.target.value)
                  }
                />
                {errors.zone && <span>{errors.zone}</span>}
              </div>

              <button className="btn-primary" onClick={handleUpdateProfile}>
                Guardar cambios
              </button>
            </div>
          ) : (
            <div className="profile-info">
              <div>
                <strong>Nombre</strong>
                <p>{userData?.name || "No registrado"}</p>
              </div>

              <div>
                <strong>Correo</strong>
                <p>{userData?.email || "No registrado"}</p>
              </div>

              <div>
                <strong>Teléfono</strong>
                <p>{userData?.phone || "No registrado"}</p>
              </div>

              <div>
                <strong>Dirección</strong>
                <p>{userData?.address || "No registrado"}</p>
              </div>

              <div>
                <strong>Ciudad</strong>
                <p>{userData?.city || "No registrada"}</p>
              </div>

              <div>
                <strong>Zona</strong>
                <p>{userData?.zone || "No registrada"}</p>
              </div>

              <div>
                <strong>Miembro desde</strong>
                <p>
                  {userData?.createdIn
                    ? new Date(userData.createdIn).toLocaleDateString("es-CO")
                    : "No disponible"}
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="profile-card">
          <h2>Seguridad</h2>
          <p className="profile-card-text">
            Administra el acceso a tu cuenta de HomeFix.
          </p>

          {isGoogleUser ? (
            <div className="profile-google-box">
              <p>
                Esta cuenta fue creada con Google. El correo y la contraseña se
                administran desde tu cuenta de Google.
              </p>

              <button className="btn-secondary" onClick={handleResetPassword}>
                Enviar correo de recuperación
              </button>
            </div>
          ) : (
            <div className="profile-form">
              <div className="profile-field">
                <label>Contraseña actual</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    handlePasswordChange("currentPassword", e.target.value)
                  }
                />
                {errors.currentPassword && (
                  <span>{errors.currentPassword}</span>
                )}
              </div>

              <div className="profile-field">
                <label>Nueva contraseña</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    handlePasswordChange("newPassword", e.target.value)
                  }
                />
                {errors.newPassword && <span>{errors.newPassword}</span>}
              </div>

              <div className="profile-field">
                <label>Confirmar contraseña</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    handlePasswordChange("confirmPassword", e.target.value)
                  }
                />
                {errors.confirmPassword && (
                  <span>{errors.confirmPassword}</span>
                )}
              </div>

              <button className="btn-primary" onClick={handleUpdatePassword}>
                Cambiar contraseña
              </button>

              <button className="btn-secondary" onClick={handleResetPassword}>
                Enviar correo de recuperación
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Profile
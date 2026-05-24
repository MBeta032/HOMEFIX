import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import {
  validatePassword,
  validateProfile,
  type PasswordUpdateForm,
  type ProfileUpdateForm,
} from "../utils/UtilValidateUpdate"
import {
  confirmAction,
  showErrorAlert,
  showSuccessAlert,
  showWarningAlert,
} from "../utils/alerts"
import { getFirebaseErrorMessage } from "../utils/firebaseErrors"
import "../styles/Profile.css"
import { FaEye, FaEyeSlash } from "react-icons/fa"

function Profile() {
  const context = useContext(AuthContext)
  const [showPassword , setShowPassword] = useState({
    current: true,
    new: true,
    confirm: true
  })

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
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const cleanMessages = (): void => {
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

  const toggleShowPassword = (field: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }

  const handleUpdateProfile = async (): Promise<void> => {
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

    if (Object.keys(validationErrors).length > 0) {
      showWarningAlert(
        "Datos incompletos",
        "Revisa los campos marcados antes de guardar tu perfil."
      )
      return
    }

    const confirmed = await confirmAction(
      "Actualizar perfil",
      "¿Seguro que deseas guardar los cambios de tu perfil?",
      "Sí, guardar"
    )

    if (!confirmed) {
      return
    }

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

      setShowPassword({current: true, new: true, confirm: true})

      setMessage("Perfil actualizado correctamente")
      showSuccessAlert(
        "Perfil actualizado",
        "Tus datos personales fueron guardados correctamente."
      )
    } catch (error: unknown) {
      const messageError = getFirebaseErrorMessage(error)

      setErrorMessage(messageError)
      showErrorAlert("No se pudo actualizar el perfil", messageError)
    }
  }

  const handleUpdatePassword = async (): Promise<void> => {
    cleanMessages()

    if (isGoogleUser) {
      const googleMessage =
        "Las cuentas de Google no cambian contraseña desde HomeFix."

      setErrorMessage(googleMessage)
      showWarningAlert("Cuenta de Google", googleMessage)
      return
    }

    const validationErrors = validatePassword(passwordForm)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      showWarningAlert(
        "Datos incompletos",
        "Revisa los campos de contraseña antes de continuar."
      )
      return
    }

    const confirmed = await confirmAction(
      "Cambiar contraseña",
      "¿Seguro que deseas cambiar la contraseña de tu cuenta?",
      "Sí, cambiar"
    )

    if (!confirmed) {
      return
    }

    try {
      await rechargeAuth(passwordForm.currentPassword)
      await changePassword(passwordForm.newPassword)

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      setShowPassword({ current: true, new: true, confirm: true })

      setMessage("Contraseña actualizada correctamente")
      showSuccessAlert(
        "Contraseña actualizada",
        "Tu contraseña fue cambiada correctamente."
      )
    } catch (error: unknown) {
      const messageError = getFirebaseErrorMessage(error)

      setErrorMessage(messageError)
      showErrorAlert("No se pudo cambiar la contraseña", messageError)
    }
  }

  const handleResetPassword = async (): Promise<void> => {
    cleanMessages()

    const confirmed = await confirmAction(
      "Enviar recuperación",
      "Te enviaremos un correo para restablecer tu contraseña.",
      "Sí, enviar"
    )

    if (!confirmed) {
      return
    }

    try {
      await resetPassword()
      setMessage("Se envió un correo para restablecer la contraseña.")
      showSuccessAlert(
        "Correo enviado",
        "Revisa tu bandeja de entrada para restablecer tu contraseña."
      )
    } catch (error: unknown) {
      const messageError = getFirebaseErrorMessage(error)

      setErrorMessage(messageError)
      showErrorAlert("No se pudo enviar el correo", messageError)
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
                  <div className="password-container">
                    <input
                      type={showPassword.current ? "password" : "text"}
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        handlePasswordChange("currentPassword", e.target.value)
                      }
                      placeholder="Necesaria para cambiar correo"
                    />
                    <button
                    type="button"
                    className="password-toggle"
                    onClick={() => toggleShowPassword("current")}>
                      {showPassword.current ? <FaEyeSlash/> : <FaEye/>}
                    </button>
                    {errors.currentPassword && (
                      <span>{errors.currentPassword}</span>
                    )}                    
                  </div>
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

              <button
                className="btn-primary"
                onClick={() => void handleUpdateProfile()}
              >
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

              <button
                className="btn-secondary"
                onClick={() => void handleResetPassword()}
              >
                Enviar correo de recuperación
              </button>
            </div>
          ) : (
            <div className="profile-form">
              <div className="profile-field">
                <label>Contraseña actual</label>
                <div className="password-container">
                  <input
                    type={showPassword.current ? "password" : "text"}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      handlePasswordChange("currentPassword", e.target.value)
                    }
                  />
                  {errors.currentPassword && (
                    <span>{errors.currentPassword}</span>
                  )}
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => toggleShowPassword("current")}
                  >
                    {showPassword.current ? <FaEyeSlash/> : <FaEye/>}
                  </button>
                </div>
              </div>

              <div className="profile-field">
                <label>Nueva contraseña</label>
                <div className="password-container">
                    <input
                      type={showPassword.new ? "password" : "text"}
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        handlePasswordChange("newPassword", e.target.value)
                      }
                    />
                  {errors.newPassword && <span>{errors.newPassword}</span>}
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => toggleShowPassword("new")}
                  >
                    {showPassword.new ? <FaEyeSlash/> : <FaEye/>}    
                  </button>
                </div>
              </div>

              <div className="profile-field">
                <label>Confirmar contraseña</label>
                <div className="password-container">
                    <input
                      type={showPassword.confirm ? "password" : "text"}
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        handlePasswordChange("confirmPassword", e.target.value)
                      }
                    />
                  {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => toggleShowPassword("confirm")}
                  >
                    {showPassword.confirm ? <FaEyeSlash/> : <FaEye/>}    
                  </button>
                </div>
              </div>

              <button
                className="btn-primary"
                onClick={() => void handleUpdatePassword()}
              >
                Cambiar contraseña
              </button>

              <button
                className="btn-secondary"
                onClick={() => void handleResetPassword()}
              >
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

import { FirebaseError } from "firebase/app"

export function getFirebaseErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    console.error("Firebase error code:", error.code)
    console.error("Firebase error message:", error.message)

    switch (error.code) {
      case "auth/email-already-in-use":
        return "Este correo ya está registrado. Intenta iniciar sesión."

      case "auth/invalid-email":
        return "El correo ingresado no tiene un formato válido."

      case "auth/weak-password":
        return "La contraseña es muy débil. Usa una contraseña más segura."

      case "auth/invalid-credential":
        return "El correo o la contraseña no son correctos."

      case "auth/user-not-found":
        return "No existe una cuenta registrada con este correo."

      case "auth/wrong-password":
        return "La contraseña ingresada no es correcta."

      case "auth/popup-closed-by-user":
        return "Cerraste la ventana de Google antes de terminar el inicio de sesión."

      case "auth/cancelled-popup-request":
        return "Ya hay una ventana de Google abierta. Cierra esa ventana e intenta nuevamente."

      case "auth/account-exists-with-different-credential":
        return "Ya existe una cuenta con este correo usando otro método de inicio de sesión."

      case "auth/popup-blocked":
        return "El navegador bloqueó la ventana de Google. Permite ventanas emergentes e intenta nuevamente."

      case "auth/unauthorized-domain":
        return "Este dominio no está autorizado en Firebase. Agrega el dominio de Vercel en Authentication > Settings > Authorized domains."

      case "auth/operation-not-allowed":
        return "El inicio de sesión con Google no está activado en Firebase. Activa Google en Authentication > Sign-in method."

      case "auth/auth-domain-config-required":
        return "Falta configurar correctamente el authDomain de Firebase."

      case "auth/requires-recent-login":
        return "Por seguridad, vuelve a iniciar sesión antes de hacer este cambio."

      case "auth/too-many-requests":
        return "Se realizaron demasiados intentos. Espera un momento e intenta nuevamente."

      case "auth/network-request-failed":
        return "No fue posible conectar con Firebase. Revisa tu conexión a internet."

      case "permission-denied":
        return "Firebase no permitió guardar o leer los datos del usuario. Revisa las reglas de Firestore."

      case "unavailable":
        return "Firebase no está disponible en este momento. Intenta nuevamente."

      default:
        return `No fue posible completar la acción. Código: ${error.code}`
    }
  }

  console.error("Unknown error:", error)
  return "Ocurrió un error inesperado. Revisa la consola del navegador."
}
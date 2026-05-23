import { FirebaseError } from "firebase/app"

export function getFirebaseErrorMessage(error: unknown): string {
  if (!(error instanceof FirebaseError)) {
    return "Ocurrió un error inesperado. Intenta nuevamente."
  }

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

    case "auth/requires-recent-login":
      return "Por seguridad, vuelve a iniciar sesión antes de hacer este cambio."

    case "auth/too-many-requests":
      return "Se realizaron demasiados intentos. Espera un momento e intenta nuevamente."

    case "auth/network-request-failed":
      return "No fue posible conectar con Firebase. Revisa tu conexión a internet."

    default:
      return "No fue posible completar la acción. Intenta nuevamente."
  }
}

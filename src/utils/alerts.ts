import Swal, { type SweetAlertIcon } from "sweetalert2"

const homeFixConfirmColor = "#1b75bb"
const homeFixCancelColor = "#6b7280"

export const showAlert = (
  title: string,
  text: string,
  icon: SweetAlertIcon
): void => {
  void Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: "Aceptar",
    confirmButtonColor: homeFixConfirmColor,
  })
}

export const showSuccessAlert = (title: string, text: string): void => {
  showAlert(title, text, "success")
}

export const showErrorAlert = (title: string, text: string): void => {
  showAlert(title, text, "error")
}

export const showWarningAlert = (title: string, text: string): void => {
  showAlert(title, text, "warning")
}

export const showInfoAlert = (title: string, text: string): void => {
  showAlert(title, text, "info")
}

export const showToast = (
  title: string,
  icon: SweetAlertIcon = "success"
): void => {
  void Swal.fire({
    toast: true,
    position: "top-end",
    icon,
    title,
    showConfirmButton: false,
    timer: 2300,
    timerProgressBar: true,
  })
}

export const confirmAction = async (
  title: string,
  text: string,
  confirmButtonText = "Sí, continuar"
): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: "Cancelar",
    confirmButtonColor: homeFixConfirmColor,
    cancelButtonColor: homeFixCancelColor,
    reverseButtons: true,
  })

  return result.isConfirmed
}

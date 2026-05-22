export interface ProfileUpdateForm {
  name: string
  email: string
  phone: string
  address: string
  city: string
  zone: string
}

export interface PasswordUpdateForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export function validateProfile(data: ProfileUpdateForm) {
  const errors: Record<string, string> = {}

  if (!data.name.trim()) {
    errors.name = "El nombre es obligatorio"
  }

  if (!data.email.trim()) {
    errors.email = "El correo es obligatorio"
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "El correo no tiene un formato válido"
  }

  if (!data.phone.trim()) {
    errors.phone = "El teléfono es obligatorio"
  } else if (!/^\d+$/.test(data.phone)) {
    errors.phone = "El teléfono solo debe tener números"
  } else if (data.phone.length !== 10) {
    errors.phone = "El teléfono debe tener 10 dígitos"
  }

  if (!data.address.trim()) {
    errors.address = "La dirección es obligatoria"
  }

  if (!data.city.trim()) {
    errors.city = "La ciudad es obligatoria"
  }

  if (!data.zone.trim()) {
    errors.zone = "La zona es obligatoria"
  }

  return errors
}

export function validatePassword(data: PasswordUpdateForm) {
  const errors: Record<string, string> = {}

  if (!data.currentPassword.trim()) {
    errors.currentPassword = "La contraseña actual es obligatoria"
  }

  if (!data.newPassword.trim()) {
    errors.newPassword = "La nueva contraseña es obligatoria"
  } else if (data.newPassword.length < 6) {
    errors.newPassword = "La contraseña debe tener mínimo 6 caracteres"
  } else if (!/\d/.test(data.newPassword)) {
    errors.newPassword = "La contraseña debe contener al menos un número"
  }

  if (!data.confirmPassword.trim()) {
    errors.confirmPassword = "Confirma la nueva contraseña"
  } else if (data.confirmPassword !== data.newPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden"
  }

  return errors
}
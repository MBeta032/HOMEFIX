export function validateProfile(data: { name: string; phone: string; address: string }) {
    const errors: Record<string, string> = {}

    if (!data.name.trim()) {
        errors.name = "El nombre es obligatorio*"
    }

    if (!data.phone.trim()) {
        errors.phone = "El teléfono es obligatorio*"
    } else if (!/^\d+$/.test(data.phone)) {
        errors.phone = "Solo números"
    } else if (data.phone.length !== 10) {
        errors.phone = "Debe tener 10 dígitos"
    }

    if (!data.address.trim()) {
        errors.address = "La dirección es obligatoria*"
    }

    return errors
}

export function validatePassword(newPassword: string, confirmPassword: string) {
    const errors: Record<string, string> = {}

    if (!newPassword.trim()) {
        errors.newPassword = "La contraseña es obligatoria*"
    } else if (newPassword.length < 6) {
        errors.newPassword = "Mínimo 6 caracteres"
    } else if (!/\d/.test(newPassword)) {
        errors.newPassword = "Debe contener un número"
    }

    if (!confirmPassword.trim()) {
        errors.confirmPassword = "Confirma la contraseña*"
    } else if (confirmPassword !== newPassword) {
        errors.confirmPassword = "No coincide"
    }

    return errors
}
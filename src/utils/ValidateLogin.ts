export function validateLogin(email: string, password: string) {
    const errors: Record<string, string> = {}

    if (!email.trim()) {
        errors.email = "El email es obligatorio*"
    }

    if (!password.trim()) {
        errors.password = "La contraseña es obligatoria*"
    }

    return errors
}
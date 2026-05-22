export function validateLogin(email: string, password: string) {
  const errors: Record<string, string> = {};

  const cleanEmail = email.trim();
  const cleanPassword = password.trim();

  if (!cleanEmail) {
    errors.email = "El correo es obligatorio*";
  } else if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
    errors.email = "Formato de correo inválido";
  }

  if (!cleanPassword) {
    errors.password = "La contraseña es obligatoria*";
  }

  return errors;
}
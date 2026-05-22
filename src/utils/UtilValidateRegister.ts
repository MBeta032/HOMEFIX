import type { RegisterData } from "../interfaces/Auth/InterfaceAuth";

function validateRegister(data: RegisterData) {
  const errors: Record<string, string> = {};

  const name = data.name.trim();
  const email = data.email.trim();
  const password = data.password.trim();
  const confirmPassword = data.confirmPassword.trim();
  const phone = data.phone.trim();
  const address = data.address.trim();
  const city = data.city.trim();
  const zone = data.zone.trim();

  if (!name) {
    errors.name = "El nombre es obligatorio*";
  }

  if (!email) {
    errors.email = "El correo es obligatorio*";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Formato de correo inválido";
  }

  if (!password) {
    errors.password = "La contraseña es obligatoria*";
  } else if (password.length < 6) {
    errors.password = "Mínimo 6 caracteres";
  } else if (!/\d/.test(password)) {
    errors.password = "Debe contener al menos un número";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirma la contraseña*";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  if (!phone) {
    errors.phone = "El teléfono es obligatorio*";
  } else if (!/^\d+$/.test(phone)) {
    errors.phone = "Solo se permiten números";
  } else if (phone.length !== 10) {
    errors.phone = "Debe tener 10 dígitos";
  }

  if (!address) {
    errors.address = "La dirección es obligatoria*";
  }

  if (!city) {
    errors.city = "La ciudad es obligatoria*";
  }

  if (!zone) {
    errors.zone = "La zona o barrio es obligatorio*";
  }

  return errors;
}

export default validateRegister;
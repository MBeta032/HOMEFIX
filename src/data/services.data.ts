import type { IHomeBenefit, IHomeStep, IService } from "../interfaces/Home/service.interface";

export const serviciosPrincipales: IService[] = [
  { icono: "🔧", nombre: "Plomería" },
  { icono: "⚡", nombre: "Electricidad" },
  { icono: "🪚", nombre: "Carpintería" },
  { icono: "🎨", nombre: "Pintura" },
  { icono: "🧹", nombre: "Limpieza" },
  { icono: "🌿", nombre: "Jardinería" },
  { icono: "🔌", nombre: "Electrodomésticos" },
  { icono: "🏠", nombre: "Mantenimiento" },
];

export const pasosHome: IHomeStep[] = [
  {
    numero: "1",
    titulo: "Elige un servicio",
    descripcion: "Busca el tipo de ayuda que necesitas para tu hogar.",
  },
  {
    numero: "2",
    titulo: "Envía tu solicitud",
    descripcion: "Registra la información básica del servicio que quieres pedir.",
  },
  {
    numero: "3",
    titulo: "Recibe atención",
    descripcion: "HomeFix te ayuda a organizar la solicitud para recibir soporte.",
  },
];

export const beneficiosHome: IHomeBenefit[] = [
  {
    titulo: "Servicios variados",
    descripcion: "Encuentra varias soluciones para el mantenimiento de tu casa en un solo lugar.",
  },
  {
    titulo: "Uso sencillo",
    descripcion: "La plataforma está pensada para que el cliente pueda solicitar ayuda sin complicaciones.",
  },
  {
    titulo: "Seguimiento básico",
    descripcion: "Más adelante podrás revisar tus solicitudes y consultar su estado dentro de HomeFix.",
  },
];
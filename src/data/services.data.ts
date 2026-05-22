import type {
  IHomeBenefit,
  IHomeStep,
  IService,
} from "../interfaces/Home/service.interface";

export const serviciosPrincipales: IService[] = [
  {
    icono: "🔧",
    nombre: "Plomería",
    descripcion: "Reparación de fugas, tuberías, grifos y mantenimiento básico.",
  },
  {
    icono: "⚡",
    nombre: "Electricidad",
    descripcion: "Soporte para instalaciones, tomas, iluminación y revisiones.",
  },
  {
    icono: "🪚",
    nombre: "Carpintería",
    descripcion: "Arreglos, instalación y mantenimiento de muebles del hogar.",
  },
  {
    icono: "🎨",
    nombre: "Pintura",
    descripcion: "Servicios de pintura interior, exterior y retoques generales.",
  },
  {
    icono: "🧹",
    nombre: "Limpieza",
    descripcion: "Apoyo para limpieza general, profunda o por zonas del hogar.",
  },
  {
    icono: "🌿",
    nombre: "Jardinería",
    descripcion: "Cuidado de jardines, poda, organización y mantenimiento verde.",
  },
  {
    icono: "🔌",
    nombre: "Electrodomésticos",
    descripcion: "Revisión básica de equipos y reparación de fallas comunes.",
  },
  {
    icono: "🏠",
    nombre: "Mantenimiento",
    descripcion: "Soluciones generales para conservar tu hogar en buen estado.",
  },
];

export const pasosHome: IHomeStep[] = [
  {
    icono: "📍",
    titulo: "Indica qué necesitas",
    descripcion:
      "Selecciona el servicio del hogar que quieres solicitar y revisa sus detalles.",
  },
  {
    icono: "🛠️",
    titulo: "Agrega servicios",
    descripcion:
      "Guarda los servicios que te interesan para organizarlos antes de confirmar.",
  },
  {
    icono: "✅",
    titulo: "Confirma tu solicitud",
    descripcion:
      "Envía la solicitud y consulta su estado desde la plataforma cuando esté disponible.",
  },
];

export const beneficiosHome: IHomeBenefit[] = [
  {
    icono: "⭐",
    titulo: "Servicios centralizados",
    descripcion:
      "Encuentra diferentes servicios del hogar en una sola plataforma.",
  },
  {
    icono: "🧾",
    titulo: "Solicitudes organizadas",
    descripcion:
      "Más adelante podrás revisar tus solicitudes y hacer seguimiento a su estado.",
  },
  {
    icono: "⚡",
    titulo: "Uso rápido y sencillo",
    descripcion:
      "La interfaz está pensada para que cualquier cliente pueda usarla sin complicarse.",
  },
];
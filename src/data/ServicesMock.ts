import type { ServiceBaseMock, ServiceMock } from "../interfaces/InterfaceServices"

const baseServicesMock: ServiceBaseMock[] = [
  {
    id: "1",
    name: "Reparacion de tuberias",
    category: "Plomeria",
    price: 80000,
    description: "Reparacion de tuberias rotas, filtraciones y goteras en el hogar.",
    company: "AquaFix Servicios",
    zone: "Sur de Cali",
    rating: 4,
    duration: "2 horas",
    availability: "Disponible",
  },

  {
    id: "2",
    name: "Instalacion de sanitarios",
    category: "Plomeria",
    price: 95000,
    description: "Instalacion y cambio de sanitarios, lavamanos y duchas.",
    company: "AquaFix Servicios",
    zone: "Norte de Cali",
    rating: 3,
    duration: "3 horas",
    availability: "Disponible",
  },

  {
    id: "3",
    name: "Destape de cañerias",
    category: "Plomeria",
    price: 60000,
    description: "Destape profesional de cañerias obstruidas en cocinas y baños.",
    company: "AquaFix Servicios",
    zone: "Centro de Cali",
    rating: 5,
    duration: "1 hora",
    availability: "Disponible",
  },

  {
    id: "4",
    name: "Instalacion electrica",
    category: "Electricidad",
    price: 120000,
    description: "Instalacion de tomas, interruptores y cableado residencial.",
    company: "ElectroHome Cali",
    zone: "Norte de Cali",
    rating: 5,
    duration: "4 horas",
    availability: "Disponible",
  },

  {
    id: "5",
    name: "Revision de tablero electrico",
    category: "Electricidad",
    price: 70000,
    description: "Diagnostico y mantenimiento de tableros electricos residenciales.",
    company: "ElectroHome Cali",
    zone: "Oeste de Cali",
    rating: 2,
    duration: "2 horas",
    availability: "No disponible",
  },
  {
    id: "6",
    name: "Instalacion de lampras y ventiladores",
    category: "Electricidad",
    price: 55000,
    description: "Instalacion de lamparas, abanicos y puntos de luz en el hogar.",
    company: "ElectroHome Cali",
    zone: "Sur de Cali",
    rating: 4,
    duration: "2 horas",
    availability: "Disponible",
  },

  {
    id: "7",
    name: "Reparacion de muebles",
    category: "Carpinteria",
    price: 65000,
    description: "Reparacion y restauracion de muebles de madera en el hogar.",
    company: "MaderArte Cali",
    zone: "Centro de Cali",
    rating: 3,
    duration: "3 horas",
    availability: "Disponible",
  },

  {
    id: "8",
    name: "Instalacion de closets",
    category: "Carpinteria",
    price: 180000,
    description: "Diseno e instalacion de closets y armarios a medida.",
    company: "MaderArte Cali",
    zone: "Sur de Cali",
    rating: 5,
    duration: "6 horas",
    availability: "Disponible",
  },

  {
    id: "9",
    name: "Instalacion de puertas y ventanas",
    category: "Carpinteria",
    price: 90000,
    description: "Instalacion y ajuste de puertas y ventanas de madera.",
    company: "MaderArte Cali",
    zone: "Norte de Cali",
    rating: 4,
    duration: "4 horas",
    availability: "Disponible",
  },

  {
    id: "10",
    name: "Pintura de interiores",
    category: "Pintura",
    price: 95000,
    description: "Pintura de habitaciones, salas y cocinas con materiales incluidos.",
    company: "ColorHogar",
    zone: "Oeste de Cali",
    rating: 1,
    duration: "5 horas",
    availability: "Disponible",
  },

  {
    id: "11",
    name: "Pintura de fachadas",
    category: "Pintura",
    price: 140000,
    description: "Pintura exterior de casas y apartamentos con pintura para intemperie.",
    company: "ColorHogar",
    zone: "Norte de Cali",
    rating: 3,
    duration: "8 horas",
    availability: "No disponible",
  },

  {
    id: "12",
    name: "Pintura de rejas y estructuras metalicas",
    category: "Pintura",
    price: 75000,
    description: "Pintura anticorrosiva para rejas, puertas metalicas y estructuras.",
    company: "ColorHogar",
    zone: "Centro de Cali",
    rating: 2,
    duration: "3 horas",
    availability: "Disponible",
  },

  {
    id: "13",
    name: "Limpieza profunda del hogar",
    category: "Limpieza",
    price: 85000,
    description: "Limpieza completa de cocina, banos, habitaciones y zonas comunes.",
    company: "CleanHouse Express",
    zone: "Sur de Cali",
    rating: 5,
    duration: "4 horas",
    availability: "Disponible",
  },

  {
    id: "14",
    name: "Lavado de tapetes y muebles",
    category: "Limpieza",
    price: 60000,
    description: "Lavado y desinfeccion de tapetes, sofas y colchones a domicilio.",
    company: "CleanHouse Express",
    zone: "Centro de Cali",
    rating: 4,
    duration: "3 horas",
    availability: "Disponible",
  },

  {
    id: "15",
    name: "Limpieza de ventanas y vidrios",
    category: "Limpieza",
    price: 45000,
    description: "Limpieza profesional de ventanas, espejos y superficies de vidrio.",
    company: "CleanHouse Express",
    zone: "Norte de Cali",
    rating: 3,
    duration: "2 horas",
    availability: "Disponible",
  },

  {
    id: "16",
    name: "Mantenimiento de jardines",
    category: "Jardineria",
    price: 45000,
    description: "Corte de cesped, poda de arbustos y limpieza de jardines.",
    company: "GreenHome Jardines",
    zone: "Norte de Cali",
    rating: 4,
    duration: "2 horas",
    availability: "Disponible",
  },

  {
    id: "17",
    name: "Diseno de jardines",
    category: "Jardineria",
    price: 200000,
    description: "Diseno y adecuacion de jardines residenciales con plantas nativas.",
    company: "GreenHome Jardines",
    zone: "Oeste de Cali",
    rating: 5,
    duration: "1 dia",
    availability: "Disponible",
  },

  {
    id: "18",
    name: "Instalacion de sistemas de riego",
    category: "Jardineria",
    price: 130000,
    description: "Instalacion de sistemas de riego automatico para jardines y zonas verdes.",
    company: "GreenHome Jardines",
    zone: "Sur de Cali",
    rating: 2,
    duration: "5 horas",
    availability: "No disponible",
  },

  {
    id: "19",
    name: "Reparacion de lavadoras",
    category: "Electrodomesticos",
    price: 55000,
    description: "Diagnostico y reparacion de lavadoras de todas las marcas.",
    company: "ElectroFix Hogar",
    zone: "Centro de Cali",
    rating: 1,
    duration: "2 horas",
    availability: "Disponible",
  },

  {
    id: "20",
    name: "Mantenimiento de neveras",
    category: "Electrodomesticos",
    price: 65000,
    description: "Limpieza, carga de gas y reparacion de neveras a domicilio.",
    company: "ElectroFix Hogar",
    zone: "Sur de Cali",
    rating: 3,
    duration: "2 horas",
    availability: "No disponible",
  },

  {
    id: "21",
    name: "Reparacion de estufas y hornos",
    category: "Electrodomesticos",
    price: 70000,
    description: "Reparacion de estufas a gas, electricas y hornos de todas las marcas.",
    company: "ElectroFix Hogar",
    zone: "Norte de Cali",
    rating: 4,
    duration: "2 horas",
    availability: "Disponible",
  },

  {
    id: "22",
    name: "Mantenimiento general del hogar",
    category: "Mantenimiento",
    price: 110000,
    description: "Revision y reparacion de goteras, puertas, ventanas y paredes.",
    company: "HomeFix Total",
    zone: "Norte de Cali",
    rating: 5,
    duration: "5 horas",
    availability: "Disponible",
  },

  {
    id: "23",
    name: "Impermeabilizacion de terrazas",
    category: "Mantenimiento",
    price: 160000,
    description: "Aplicacion de impermeabilizante en terrazas, losas y cubiertas.",
    company: "HomeFix Total",
    zone: "Oeste de Cali",
    rating: 2,
    duration: "6 horas",
    availability: "Disponible",
  },
  
  {
    id: "24",
    name: "Reparacion de grietas y humedades",
    category: "Mantenimiento",
    price: 95000,
    description: "Reparacion de grietas en paredes y tratamiento de humedades.",
    company: "HomeFix Total",
    zone: "Centro de Cali",
    rating: 3,
    duration: "4 horas",
    availability: "Disponible",
  },
]
interface ServiceDetailExtra {
  image: string
  includes: string[]
  excludes: string[]
  recommendations: string[]
}

const detailByCategory: Record<string, ServiceDetailExtra> = {
  Plomeria: {
    image: "🔧",
    includes: [
      "Revisión inicial del problema",
      "Diagnóstico básico del daño",
      "Mano de obra del servicio",
      "Prueba final del arreglo",
    ],
    excludes: [
      "Repuestos especiales",
      "Daños ocultos dentro de muros",
      "Trabajos de remodelación",
    ],
    recommendations: [
      "Cerrar la llave de paso si hay fuga fuerte",
      "Despejar el área antes de la visita",
      "Tomar fotos del problema para explicar mejor el daño",
    ],
  },

  Electricidad: {
    image: "💡",
    includes: [
      "Revisión del punto eléctrico",
      "Diagnóstico básico",
      "Instalación o ajuste sencillo",
      "Prueba de funcionamiento",
    ],
    excludes: [
      "Cableado completo nuevo",
      "Materiales eléctricos especiales",
      "Reparaciones de alto riesgo",
    ],
    recommendations: [
      "No manipular cables antes de la visita",
      "Bajar el breaker si hay corto o chispas",
      "Tener claro el punto donde se hará el trabajo",
    ],
  },

  Carpinteria: {
    image: "🪚",
    includes: [
      "Revisión de la pieza o estructura",
      "Ajuste o reparación básica",
      "Mano de obra del servicio",
      "Recomendaciones de cuidado",
    ],
    excludes: [
      "Cambio completo de muebles",
      "Materiales especiales",
      "Pintura o barniz adicional",
    ],
    recommendations: [
      "Enviar foto previa del daño si es posible",
      "Despejar el espacio de trabajo",
      "Avisar si la madera tiene humedad",
    ],
  },

  Pintura: {
    image: "🎨",
    includes: [
      "Preparación básica del área",
      "Aplicación de pintura",
      "Revisión final del acabado",
      "Limpieza básica del espacio trabajado",
    ],
    excludes: [
      "Compra de pintura",
      "Reparación profunda de humedad",
      "Movimiento de muebles pesados",
    ],
    recommendations: [
      "Comprar la pintura antes del servicio",
      "Retirar objetos pequeños del área",
      "Avisar si hay humedad o grietas grandes",
    ],
  },

  Limpieza: {
    image: "🧽",
    includes: [
      "Limpieza de superficies visibles",
      "Desinfección básica",
      "Organización general del área",
      "Revisión final del servicio",
    ],
    excludes: [
      "Control de plagas",
      "Limpieza interna de electrodomésticos",
      "Retiro de residuos peligrosos",
    ],
    recommendations: [
      "Retirar objetos delicados antes del servicio",
      "Avisar si hay manchas difíciles",
      "Permitir ventilación durante la limpieza",
    ],
  },

  Jardineria: {
    image: "🌱",
    includes: [
      "Revisión del jardín",
      "Corte o mantenimiento básico",
      "Limpieza general de hojas o residuos",
      "Recomendaciones de cuidado",
    ],
    excludes: [
      "Compra de plantas",
      "Diseño completo de jardín",
      "Instalación de sistemas complejos",
    ],
    recommendations: [
      "Retirar objetos del jardín",
      "Avisar si hay plantas delicadas",
      "Informar si hay mascotas en la zona",
    ],
  },

  Electrodomesticos: {
    image: "🧺",
    includes: [
      "Revisión externa del electrodoméstico",
      "Diagnóstico inicial",
      "Explicación del posible daño",
      "Recomendación de reparación",
    ],
    excludes: [
      "Repuestos",
      "Traslado del electrodoméstico",
      "Reparaciones avanzadas no diagnosticadas",
    ],
    recommendations: [
      "No usar el equipo si presenta corto o humo",
      "Tener acceso libre al electrodoméstico",
      "Informar marca y modelo si los conoce",
    ],
  },

  Mantenimiento: {
    image: "🧰",
    includes: [
      "Revisión general del problema",
      "Ajustes menores",
      "Mano de obra básica",
      "Recomendaciones finales",
    ],
    excludes: [
      "Repuestos",
      "Obras o remodelaciones grandes",
      "Trabajos especializados fuera del diagnóstico",
    ],
    recommendations: [
      "Hacer una lista de los arreglos necesarios",
      "Tomar fotos de los daños principales",
      "Confirmar que haya alguien en casa durante la visita",
    ],
  },
}

const defaultDetail: ServiceDetailExtra = {
  image: "🏠",
  includes: [
    "Revisión inicial del servicio",
    "Diagnóstico básico",
    "Mano de obra del servicio",
    "Recomendaciones finales",
  ],
  excludes: [
    "Repuestos especiales",
    "Trabajos adicionales no acordados",
    "Servicios fuera del alcance inicial",
  ],
  recommendations: [
    "Despejar el área de trabajo",
    "Explicar claramente el problema",
    "Tener disponibilidad durante la visita",
  ],
}

function getDetailByCategory(category: string): ServiceDetailExtra {
  return detailByCategory[category] || defaultDetail
}

export const servicesMock: ServiceMock[] = baseServicesMock.map((service) => {
  const detail = getDetailByCategory(service.category)

  return {
    ...service,
    image: detail.image,
    includes: detail.includes,
    excludes: detail.excludes,
    recommendations: detail.recommendations,
  }
})
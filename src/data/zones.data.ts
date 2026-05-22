import type { IZoneCoverage } from "../interfaces/Home/zone.interface";

export const zonasDisponibles: IZoneCoverage[] = [
  {
    id: 1,
    zona: "Sur de Cali",
    barrios: ["Valle del Lili", "Ciudad Jardín", "Caney", "Bochalema"],
    serviciosDisponibles: ["Plomería", "Electricidad", "Limpieza", "Pintura"],
  },
  {
    id: 2,
    zona: "Norte de Cali",
    barrios: ["La Flora", "Vipasa", "Prados del Norte", "Granada"],
    serviciosDisponibles: ["Carpintería", "Jardinería", "Mantenimiento"],
  },
  {
    id: 3,
    zona: "Oeste de Cali",
    barrios: ["Santa Teresita", "El Peñón", "San Antonio"],
    serviciosDisponibles: ["Pintura", "Limpieza", "Electrodomésticos"],
  },
  {
    id: 4,
    zona: "Centro de Cali",
    barrios: ["San Nicolás", "El Calvario", "San Pedro"],
    serviciosDisponibles: ["Electricidad", "Plomería", "Mantenimiento"],
  },
];
import type {
  ICoverageEdge,
  ICoverageNode,
} from "../interfaces/coverageGraph.interface"

export const coverageNodes: ICoverageNode[] = [
  {
    id: "zone-north",
    label: "Norte de Cali",
    type: "zone",
    description: "Zona residencial y comercial con servicios para el hogar.",
    position: {
      lat: 3.475,
      lng: -76.52,
    },
  },
  {
    id: "zone-south",
    label: "Sur de Cali",
    type: "zone",
    description: "Zona con alta demanda de servicios técnicos y limpieza.",
    position: {
      lat: 3.374,
      lng: -76.54,
    },
  },
  {
    id: "zone-center",
    label: "Centro de Cali",
    type: "zone",
    description: "Zona central con cobertura de servicios básicos.",
    position: {
      lat: 3.4516,
      lng: -76.532,
    },
  },
  {
    id: "company-aquafix",
    label: "AquaFix Servicios",
    type: "company",
    description: "Empresa mock especializada en plomería y mantenimiento.",
    position: {
      lat: 3.41,
      lng: -76.535,
    },
  },
  {
    id: "company-electrohome",
    label: "ElectroHome Cali",
    type: "company",
    description: "Empresa mock especializada en electricidad y electrodomésticos.",
    position: {
      lat: 3.468,
      lng: -76.518,
    },
  },
  {
    id: "company-cleanhouse",
    label: "CleanHouse Express",
    type: "company",
    description: "Empresa mock enfocada en servicios de limpieza.",
    position: {
      lat: 3.386,
      lng: -76.548,
    },
  },
  {
    id: "service-plumbing",
    label: "Plomería",
    type: "service",
  },
  {
    id: "service-electricity",
    label: "Electricidad",
    type: "service",
  },
  {
    id: "service-cleaning",
    label: "Limpieza",
    type: "service",
  },
  {
    id: "service-appliances",
    label: "Electrodomésticos",
    type: "service",
  },
]

export const coverageEdges: ICoverageEdge[] = [
  {
    source: "zone-south",
    target: "company-aquafix",
  },
  {
    source: "zone-south",
    target: "company-cleanhouse",
  },
  {
    source: "zone-north",
    target: "company-electrohome",
  },
  {
    source: "zone-center",
    target: "company-aquafix",
  },
  {
    source: "company-aquafix",
    target: "service-plumbing",
  },
  {
    source: "company-aquafix",
    target: "service-appliances",
  },
  {
    source: "company-electrohome",
    target: "service-electricity",
  },
  {
    source: "company-electrohome",
    target: "service-appliances",
  },
  {
    source: "company-cleanhouse",
    target: "service-cleaning",
  },
]
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
  },
  {
    id: "zone-south",
    label: "Sur de Cali",
    type: "zone",
    description: "Zona con alta demanda de servicios técnicos y limpieza.",
  },
  {
    id: "zone-center",
    label: "Centro de Cali",
    type: "zone",
    description: "Zona central con cobertura de servicios básicos.",
  },
  {
    id: "company-aquafix",
    label: "AquaFix Servicios",
    type: "company",
  },
  {
    id: "company-electrohome",
    label: "ElectroHome Cali",
    type: "company",
  },
  {
    id: "company-cleanhouse",
    label: "CleanHouse Express",
    type: "company",
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
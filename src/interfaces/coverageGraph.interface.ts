export type CoverageNodeType = "zone" | "company" | "service"

export interface ICoveragePosition {
  lat: number
  lng: number
}

export interface ICoverageNode {
  id: string
  label: string
  type: CoverageNodeType
  description?: string
  position?: ICoveragePosition
}

export interface ICoverageEdge {
  source: string
  target: string
}

export interface ICoverageGraphData {
  nodes: ICoverageNode[]
  edges: ICoverageEdge[]
}
export type CoverageNodeType = "zone" | "company" | "service"

export interface ICoverageNode {
  id: string
  label: string
  type: CoverageNodeType
  description?: string
}

export interface ICoverageEdge {
  source: string
  target: string
}

export interface ICoverageGraphData {
  nodes: ICoverageNode[]
  edges: ICoverageEdge[]
}
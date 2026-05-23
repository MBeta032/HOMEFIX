import { Graph } from "../algorithms/Graph"
import { coverageEdges, coverageNodes } from "../data/coverageGraph.data"
import type { ICoverageNode } from "../interfaces/coverageGraph.interface"

export const createCoverageGraph = (): Graph<ICoverageNode> => {
  const graph = new Graph<ICoverageNode>()

  coverageNodes.forEach((node) => {
    graph.addNode(node)
  })

  coverageEdges.forEach((edge) => {
    graph.addEdge(edge.source, edge.target)
  })

  return graph
}

export const getZones = (): ICoverageNode[] => {
  return coverageNodes.filter((node) => node.type === "zone")
}

export const getCompaniesByZone = (zoneId: string): ICoverageNode[] => {
  const graph = createCoverageGraph()

  return graph
    .getNeighbors(zoneId)
    .filter((node) => node.type === "company")
}

export const getServicesByZone = (zoneId: string): ICoverageNode[] => {
  const graph = createCoverageGraph()
  const companies = getCompaniesByZone(zoneId)
  const services: ICoverageNode[] = []

  companies.forEach((company) => {
    const companyServices = graph
      .getNeighbors(company.id)
      .filter((node) => node.type === "service")

    companyServices.forEach((service) => {
      const alreadyExists = services.some((item) => item.id === service.id)

      if (!alreadyExists) {
        services.push(service)
      }
    })
  })

  return services
}

export const getAdjacencyByZone = (zoneId: string): string[] => {
  const graph = createCoverageGraph()

  return graph.printAdjacency(zoneId)
}

export const getCoverageAdjacencyList = (): Record<string, string[]> => {
  const graph = createCoverageGraph()

  return graph.printGraph()
}
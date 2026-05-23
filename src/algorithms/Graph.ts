export class Graph<T extends { id: string }> {
  private nodes: T[]
  private adjList: Record<string, string[]>

  constructor() {
    this.nodes = []
    this.adjList = {}
  }

  addNode(node: T): void {
    const nodeExists = this.searchNode(node.id)

    if (!nodeExists) {
      this.nodes.push(node)
      this.adjList[node.id] = []
    }
  }

  addEdge(nodeId1: string, nodeId2: string): void {
    const firstNode = this.searchNode(nodeId1)
    const secondNode = this.searchNode(nodeId2)

    if (!firstNode || !secondNode) {
      return
    }

    if (!this.adjList[nodeId1].includes(nodeId2)) {
      this.adjList[nodeId1].push(nodeId2)
    }

    if (!this.adjList[nodeId2].includes(nodeId1)) {
      this.adjList[nodeId2].push(nodeId1)
    }
  }

  searchNode(nodeId: string): T | undefined {
    if (!this.nodes.length) {
      return undefined
    }

    return this.nodes.find((node) => node.id === nodeId)
  }

  printAdjacency(nodeId: string): string[] {
    const node = this.searchNode(nodeId)

    if (!node) {
      return []
    }

    return this.adjList[nodeId]
  }

  printGraph(): Record<string, string[]> {
    return this.adjList
  }

  getNodes(): T[] {
    return this.nodes
  }

  getNeighbors(nodeId: string): T[] {
    const adjacencyNodes = this.printAdjacency(nodeId)

    return adjacencyNodes
      .map((id) => this.searchNode(id))
      .filter((node): node is T => node !== undefined)
  }

  isEmpty(): boolean {
    return this.nodes.length === 0
  }

  size(): number {
    return this.nodes.length
  }
}
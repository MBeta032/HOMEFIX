import type { ServiceMock } from "../interfaces/InterfaceServices"

interface TreeNode {
  rating: number
  services: ServiceMock[]
  left: TreeNode | null
  right: TreeNode | null
}

class BinarySearchTree {
  private root: TreeNode | null
  private total: number

  constructor() {
    this.root = null
    this.total = 0
  }

  insert(service: ServiceMock): void {
    if (this.root === null) {
      this.root = {
        rating: service.rating,
        services: [service],
        left: null,
        right: null,
      }

      this.total++
      return
    }

    this.insertNode(this.root, service)
    this.total++
  }

  private insertNode(current: TreeNode, service: ServiceMock): void {
    if (service.rating === current.rating) {
      current.services.push(service)
      return
    }

    if (service.rating < current.rating) {
      if (current.left === null) {
        current.left = {
          rating: service.rating,
          services: [service],
          left: null,
          right: null,
        }
        return
      }

      this.insertNode(current.left, service)
      return
    }

    if (current.right === null) {
      current.right = {
        rating: service.rating,
        services: [service],
        left: null,
        right: null,
      }
      return
    }

    this.insertNode(current.right, service)
  }

  search(rating: number): ServiceMock[] {
    return this.searchNode(this.root, rating)
  }

  private searchNode(current: TreeNode | null, rating: number): ServiceMock[] {
    if (current === null) return []

    if (rating === current.rating) {
      return current.services
    }

    if (rating < current.rating) {
      return this.searchNode(current.left, rating)
    }

    return this.searchNode(current.right, rating)
  }

  inOrder(): ServiceMock[] {
    const services: ServiceMock[] = []
    this.inOrderNode(this.root, services)
    return services
  }

  private inOrderNode(current: TreeNode | null, services: ServiceMock[]): void {
    if (current === null) return

    this.inOrderNode(current.left, services)
    services.push(...current.services)
    this.inOrderNode(current.right, services)
  }

  reverseInOrder(): ServiceMock[] {
    const services: ServiceMock[] = []
    this.reverseInOrderNode(this.root, services)
    return services
  }

  private reverseInOrderNode(
    current: TreeNode | null,
    services: ServiceMock[]
  ): void {
    if (current === null) return

    this.reverseInOrderNode(current.right, services)
    services.push(...current.services)
    this.reverseInOrderNode(current.left, services)
  }

  isEmpty(): boolean {
    return this.root === null
  }

  size(): number {
    return this.total
  }

  print(): string[] {
    return this.reverseInOrder().map(
      (service) => `${service.name} - ${service.rating}`
    )
  }
}

export default BinarySearchTree
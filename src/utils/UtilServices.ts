import BinarySearchTree from "../algorithms/BinarySearchTree"
import { servicesMock } from "../data/ServicesMock"
import type { FilterServices, ServiceMock } from "../interfaces/InterfaceServices"

function normalizeText(value: string): string {
  return value
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
}

function FunServices(
  search: string,
  filters: FilterServices = {}
): ServiceMock[] {
  let result = servicesMock

  if (search.trim()) {
    const text = normalizeText(search)

    result = result.filter(
      (service) =>
        normalizeText(service.name).includes(text) ||
        normalizeText(service.category).includes(text) ||
        normalizeText(service.company).includes(text) ||
        normalizeText(service.zone).includes(text) ||
        normalizeText(service.description).includes(text)
    )
  }

  if (filters.category) {
    result = result.filter((service) => service.category === filters.category)
  }

  if (filters.company) {
    result = result.filter((service) => service.company === filters.company)
  }

  if (filters.zone) {
    result = result.filter((service) => service.zone === filters.zone)
  }

  if (filters.maxPrice) {
    result = result.filter((service) => service.price <= filters.maxPrice!)
  }

  if (filters.availability) {
    result = result.filter(
      (service) => service.availability === filters.availability
    )
  }

  if (filters.rating) {
    result = result.filter((service) => service.rating >= filters.rating!)
  }

  return result
}

export function getTopRatedServices(limit: number = 5): ServiceMock[] {
  const tree = new BinarySearchTree()

  servicesMock.forEach((service) => {
    if (service.rating > 0) {
      tree.insert(service)
    }
  })

  return tree.reverseInOrder().slice(0, limit)
}

export default FunServices
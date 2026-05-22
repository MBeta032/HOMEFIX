import { servicesMock } from "../../data/ServicesMock"
import type { ServiceMock } from "../../interfaces/InterfaceServices"

export function getServiceById(id: string | undefined): ServiceMock | undefined {
  if (!id) {
    return undefined
  }

  return servicesMock.find((service) => service.id === id)
}
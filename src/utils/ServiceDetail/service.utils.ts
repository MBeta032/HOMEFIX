import { services } from "../../data/service.data";
import type { IService } from "../../interfaces/ServiceDetail/service.interface";

export function getServiceById(id: string | undefined): IService | undefined {
  if (!id) {
    return undefined;
  }

  return services.find((service: IService) => service.id === id);
}
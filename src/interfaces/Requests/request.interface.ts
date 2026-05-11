export type RequestStatus =
  | "Pendiente"
  | "Asignada"
  | "En proceso"
  | "Finalizada"
  | "Cancelada";

export interface IRequestFormData {
  address: string;
  neighborhood: string;
  city: string;
  desiredDate: string;
  desiredTime: string;
  problemDescription: string;
}

export interface IRequest {
  id: string;
  serviceId: string;
  serviceName: string;
  company: string;
  price: number;
  serviceZone: string;
  address: string;
  neighborhood: string;
  city: string;
  desiredDate: string;
  desiredTime: string;
  problemDescription: string;
  status: RequestStatus;
  createdAt: string;
}
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Stack } from "../algorithms/detailStack";
import type { IService } from "../interfaces/service.interface";
import { getServiceById } from "../utils/service.utils";

interface UseServiceDetailResult {
  service: IService | undefined;
  handleBack: () => void;
  handleAddToCart: () => void;
  handleRequestNow: () => void;
}

const viewedServicesStack = new Stack();

export function useServiceDetail(): UseServiceDetailResult {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const service: IService | undefined = getServiceById(id);

  useEffect(() => {
    if (service && viewedServicesStack.peek() !== service.id) {
      viewedServicesStack.push(service.id);
      console.log("Servicios vistos:", viewedServicesStack.print());
    }
  }, [service]);

  function handleBack(): void {
    navigate(-1);
  }

  function handleAddToCart(): void {
    alert("Este servicio se conectará al carrito en la HU-013");
  }

  function handleRequestNow(): void {
    alert("La solicitud se conectará en la HU-015");
  }

  return {
    service,
    handleBack,
    handleAddToCart,
    handleRequestNow,
  };
}
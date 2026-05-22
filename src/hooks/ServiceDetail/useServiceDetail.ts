import { useNavigate, useParams } from "react-router-dom";
import type { IService } from "../../interfaces/ServiceDetail/service.interface";
import { getServiceById } from "../../utils/ServiceDetail/service.utils";

interface UseServiceDetailResult {
  service: IService | undefined;
  handleBack: () => void;
  handleAddToCart: () => void;
  handleRequestNow: () => void;
}

export function useServiceDetail(): UseServiceDetailResult {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const service = getServiceById(id);

  function handleBack(): void {
    navigate("/dashboard/servicios");
  }

  function handleAddToCart(): void {
    alert("Esta función se conectará en HU-013.");
  }

  function handleRequestNow(): void {
    alert("Esta función se conectará en HU-015.");
  }

  return {
    service,
    handleBack,
    handleAddToCart,
    handleRequestNow,
  };
}
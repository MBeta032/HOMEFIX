import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Button from "../shared/Button";
import type { IService } from "../../interfaces/ServiceDetail/service.interface";
import type { IRequestFormData } from "../../interfaces/Requests/request.interface";

interface RequestFormProps {
  selectedService: IService;
  onSubmit: (formData: IRequestFormData) => void;
  onCancel: () => void;
}

type RequestFormErrors = Partial<Record<keyof IRequestFormData, string>>;

const initialFormData: IRequestFormData = {
  address: "",
  neighborhood: "",
  city: "",
  desiredDate: "",
  desiredTime: "",
  problemDescription: "",
};

export default function RequestForm({
  selectedService,
  onSubmit,
  onCancel,
}: RequestFormProps) {
  const [formData, setFormData] =
    useState<IRequestFormData>(initialFormData);

  const [errors, setErrors] = useState<RequestFormErrors>({});
  const [generalError, setGeneralError] = useState<string>("");

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const fieldName = event.target.name as keyof IRequestFormData;
    const fieldValue = event.target.value;

    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });

    setErrors({
      ...errors,
      [fieldName]: "",
    });

    setGeneralError("");
  }

  function validateForm(): boolean {
    const newErrors: RequestFormErrors = {};

    if (!formData.address.trim()) {
      newErrors.address = "La dirección es obligatoria.";
    }

    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = "El barrio es obligatorio.";
    }

    if (!formData.city.trim()) {
      newErrors.city = "La ciudad es obligatoria.";
    }

    if (!formData.desiredDate.trim()) {
      newErrors.desiredDate = "La fecha deseada es obligatoria.";
    }

    if (!formData.desiredTime.trim()) {
      newErrors.desiredTime = "La hora deseada es obligatoria.";
    }

    if (!formData.problemDescription.trim()) {
      newErrors.problemDescription =
        "La descripción del problema es obligatoria.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const isValidForm = validateForm();

    if (!isValidForm) {
      setGeneralError("Completa todos los campos obligatorios antes de continuar.");
      return;
    }

    onSubmit(formData);
    setFormData(initialFormData);
  }

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <div className="request-form-header">
        <p className="request-selected-label">Servicio seleccionado</p>

        <h2>{selectedService.name}</h2>

        <p>
          Empresa: <strong>{selectedService.company}</strong>
        </p>

        <p>
          Zona de cobertura del servicio:{" "}
          <strong>{selectedService.zone}</strong>
        </p>
      </div>

      {generalError && (
        <p className="request-form-general-error">{generalError}</p>
      )}

      <div className="request-form-grid">
        <div className="request-form-group">
          <label htmlFor="address">Dirección</label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            placeholder="Ej: Calle 10 # 20-30"
          />
          {errors.address && <span>{errors.address}</span>}
        </div>

        <div className="request-form-group">
          <label htmlFor="neighborhood">Barrio</label>
          <input
            id="neighborhood"
            name="neighborhood"
            type="text"
            value={formData.neighborhood}
            onChange={handleChange}
            placeholder="Ej: San Fernando"
          />
          {errors.neighborhood && <span>{errors.neighborhood}</span>}
        </div>

        <div className="request-form-group">
          <label htmlFor="city">Ciudad</label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            placeholder="Ej: Cali"
          />
          {errors.city && <span>{errors.city}</span>}
        </div>

        <div className="request-form-group">
          <label htmlFor="desiredDate">Fecha deseada</label>
          <input
            id="desiredDate"
            name="desiredDate"
            type="date"
            value={formData.desiredDate}
            onChange={handleChange}
          />
          {errors.desiredDate && <span>{errors.desiredDate}</span>}
        </div>

        <div className="request-form-group">
          <label htmlFor="desiredTime">Hora deseada</label>
          <input
            id="desiredTime"
            name="desiredTime"
            type="time"
            value={formData.desiredTime}
            onChange={handleChange}
          />
          {errors.desiredTime && <span>{errors.desiredTime}</span>}
        </div>
      </div>

      <div className="request-form-group">
        <label htmlFor="problemDescription">Descripción del problema</label>
        <textarea
          id="problemDescription"
          name="problemDescription"
          value={formData.problemDescription}
          onChange={handleChange}
          placeholder="Describe qué necesitas que revise la empresa."
          rows={5}
        />
        {errors.problemDescription && (
          <span>{errors.problemDescription}</span>
        )}
      </div>

      <div className="request-form-actions">
        <Button type="submit" variant="success">
          Enviar solicitud
        </Button>

        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar selección
        </Button>
      </div>
    </form>
  );
}
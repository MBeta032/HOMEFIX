import { useContext } from "react";
import { RatingContext } from "../../context/Rating/RatingContext";

export function useRatings() {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error("useRatings debe usarse dentro de RatingProvider");
  }
  return context;
}

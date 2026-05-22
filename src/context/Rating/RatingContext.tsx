import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { IRating } from "../../interfaces/Rating/rating.interface";

const STORAGE_KEY = "homefix-ratings";

interface RatingContextType {
  ratings: IRating[];
  addRating: (rating: IRating) => void;
  getRatingByRequestId: (requestId: string) => IRating | undefined;
  isRated: (requestId: string) => boolean;
}

export const RatingContext = createContext<RatingContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export function RatingProvider({ children }: Props) {
  const [ratings, setRatings] = useState<IRating[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as IRating[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
  }, [ratings]);

  function addRating(rating: IRating): void {
    const alreadyRated = ratings.some((r) => r.requestId === rating.requestId);
    if (alreadyRated) return;
    setRatings((prev) => [...prev, rating]);
  }

  function getRatingByRequestId(requestId: string): IRating | undefined {
    return ratings.find((r) => r.requestId === requestId);
  }

  function isRated(requestId: string): boolean {
    return ratings.some((r) => r.requestId === requestId);
  }

  return (
    <RatingContext.Provider
      value={{ ratings, addRating, getRatingByRequestId, isRated }}
    >
      {children}
    </RatingContext.Provider>
  );
}

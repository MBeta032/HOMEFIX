import { createContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import type { IRating } from "../../interfaces/Rating/rating.interface"

const STORAGE_KEY = "homefix-ratings"

export interface RatingContextType {
  ratings: IRating[]
  addRating: (rating: IRating) => void
  getRatingByRequestId: (requestId: string) => IRating | undefined
  isRated: (requestId: string) => boolean
}

export const RatingContext = createContext<RatingContextType | undefined>(
  undefined
)

interface RatingProviderProps {
  children: ReactNode
}

function isValidRating(rating: unknown): rating is IRating {
  if (typeof rating !== "object" || rating === null) {
    return false
  }

  const possibleRating = rating as Partial<IRating>

  return (
    typeof possibleRating.id === "string" &&
    typeof possibleRating.requestId === "string" &&
    typeof possibleRating.serviceId === "string" &&
    typeof possibleRating.serviceName === "string" &&
    typeof possibleRating.company === "string" &&
    typeof possibleRating.score === "number" &&
    possibleRating.score >= 1 &&
    possibleRating.score <= 5 &&
    typeof possibleRating.comment === "string" &&
    typeof possibleRating.createdAt === "string"
  )
}

function getRatingsFromStorage(): IRating[] {
  if (typeof window === "undefined") {
    return []
  }

  const storedRatings = localStorage.getItem(STORAGE_KEY)

  if (!storedRatings) {
    return []
  }

  try {
    const parsedRatings = JSON.parse(storedRatings) as unknown

    if (!Array.isArray(parsedRatings)) {
      return []
    }

    return parsedRatings.filter(isValidRating)
  } catch {
    return []
  }
}

export function RatingProvider({ children }: RatingProviderProps) {
  const [ratings, setRatings] = useState<IRating[]>(() =>
    getRatingsFromStorage()
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings))
  }, [ratings])

  function addRating(rating: IRating): void {
    if (!isValidRating(rating)) {
      return
    }

    const alreadyRated = ratings.some(
      (currentRating) => currentRating.requestId === rating.requestId
    )

    if (alreadyRated) {
      return
    }

    setRatings((prevRatings) => [...prevRatings, rating])
  }

  function getRatingByRequestId(requestId: string): IRating | undefined {
    return ratings.find((rating) => rating.requestId === requestId)
  }

  function isRated(requestId: string): boolean {
    return ratings.some((rating) => rating.requestId === requestId)
  }

  return (
    <RatingContext.Provider
      value={{ ratings, addRating, getRatingByRequestId, isRated }}
    >
      {children}
    </RatingContext.Provider>
  )
}
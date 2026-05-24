import { createContext, useEffect, useState } from "react"
import type { ReactNode } from "react"
import type { IRating } from "../../interfaces/Rating/rating.interface"

const getStorageKey = (uid: string) => {
 return uid ?  `homefix-ratings-${uid}`: "homefix-ratings-guest"
}
export interface RatingContextType {
  ratings: IRating[]
  addRating: (rating: IRating) => void
  getRatingByRequestId: (requestId: string) => IRating | undefined
  isRated: (requestId: string) => boolean
}

// eslint-disable-next-line react-refresh/only-export-components
export const RatingContext = createContext<RatingContextType | undefined>(
  undefined
)

interface RatingProviderProps {
  children: ReactNode
  uid: string
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

function getRatingsFromStorage(uid: string): IRating[] {
  if (typeof window === "undefined") {
    return []
  }

  const storedRatings = localStorage.getItem(getStorageKey(uid))

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

export function RatingProvider({ children, uid }: RatingProviderProps) {
  const [ratings, setRatings] = useState<IRating[]>(() =>
    getRatingsFromStorage(uid)
  )

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRatings(getRatingsFromStorage(uid))
  }, [uid])

  useEffect(() => {
    localStorage.setItem(getStorageKey(uid), JSON.stringify(ratings))
  }, [ratings, uid])

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
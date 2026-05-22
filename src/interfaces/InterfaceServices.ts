export interface ServiceBaseMock {
  id: string
  name: string
  category: string
  price: number
  description: string
  company: string
  zone: string
  rating: number
  duration: string
  availability: string
}

export interface ServiceMock extends ServiceBaseMock {
  image: string
  includes: string[]
  excludes: string[]
  recommendations: string[]
  idealFor: string[]
  serviceProcess: string[]
  warranty: string
  urgencyLevel: string
  paymentNote: string
}

export interface FilterServices {
  category?: string
  company?: string
  maxPrice?: number
  zone?: string
  rating?: number
  availability?: string
}

export interface SelectFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: { label: string; value: string }[]
  placeholder?: string
}

export interface FilterBarProps {
  filters: FilterServices
  onChange: (filters: FilterServices) => void
}
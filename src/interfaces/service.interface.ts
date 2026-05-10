export interface IService {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  rating: number;
  provider: string;
  coverageZone: string;
  availability: string;
  includes: string[];
  notIncludes: string[];
  recommendations: string[];
}

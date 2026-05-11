export interface IService {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  company: string;
  zone: string;
  availability: string;
  includes: string[];
  excludes: string[];
  recommendations: string[];
}
export interface CatalogCategory {
  id: string;
  name: string;
  icon: string;
  serviceCategory?: string;
}

export interface CategoryMenuProps {
  selectedCategoryId: string;
  onSelectCategory: (category: CatalogCategory) => void;
}
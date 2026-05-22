import { useMemo, useState } from "react";
import CategoryMenu from "../components/services/CategoryMenu";
import ServiceList from "../components/services/ServiceList";
import PageHeader from "../components/shared/PageHeader";
import { catalogTree } from "../data/CategoriesMock";
import { servicesMock } from "../data/ServicesMock";
import type { CatalogCategory } from "../interfaces/InterfaceCatalog";
import "../styles/Catalog.css";
import "../styles/Services.css";

const catalogMenu = catalogTree.toMenuData();
const firstCategory = catalogMenu.children[0]?.value ?? catalogMenu.value;

function Catalogo() {
  const [selectedCategory, setSelectedCategory] =
    useState<CatalogCategory>(firstCategory);

  const getRelatedServiceCategories = (category: CatalogCategory): string[] => {
    if (category.serviceCategory) {
      return [category.serviceCategory];
    }

    const categoryNode = catalogTree.findNode(category.id);

    if (!categoryNode) {
      return [];
    }

    return categoryNode.children
      .map((child) => child.value.serviceCategory)
      .filter((serviceCategory): serviceCategory is string =>
        Boolean(serviceCategory)
      );
  };

  const selectedServices = useMemo(() => {
    const relatedCategories = getRelatedServiceCategories(selectedCategory);

    return servicesMock.filter((service) =>
      relatedCategories.includes(service.category)
    );
  }, [selectedCategory]);

  return (
    <div className="dashboard-page">
      <PageHeader
        title="Nuestros servicios"
        subtitle="Explora las categorías y subcategorías disponibles en HomeFix"
      />

      <div className="catalogo-layout">
        <CategoryMenu
          tree={catalogMenu}
          selectedCategoryId={selectedCategory.id}
          onSelectCategory={setSelectedCategory}
        />

        <ServiceList
          services={selectedServices}
          selectedCategoryName={selectedCategory.name}
        />
      </div>
    </div>
  );
}

export default Catalogo;
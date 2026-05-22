import type { TreeMenuNode } from "../../algorithms/NaryTree";
import type {
  CatalogCategory,
  CategoryMenuProps,
} from "../../interfaces/InterfaceCatalog";

interface Props extends CategoryMenuProps {
  tree: TreeMenuNode<CatalogCategory>;
}

function CategoryMenu({ tree, selectedCategoryId, onSelectCategory }: Props) {
  return (
    <div className="catalogo-menu">
      {tree.children.map((category) => (
        <div key={category.value.id} className="catalogo-menu-group">
          <button
            className={
              selectedCategoryId === category.value.id
                ? "catalogo-parent-btn active"
                : "catalogo-parent-btn"
            }
            onClick={() => onSelectCategory(category.value)}
          >
            <span>{category.value.icon}</span>
            {category.value.name}
          </button>

          <div className="catalogo-subcategory-list">
            {category.children.map((subcategory) => (
              <button
                key={subcategory.value.id}
                className={
                  selectedCategoryId === subcategory.value.id
                    ? "catalogo-subcategory-btn active"
                    : "catalogo-subcategory-btn"
                }
                onClick={() => onSelectCategory(subcategory.value)}
              >
                <span>{subcategory.value.icon}</span>
                {subcategory.value.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoryMenu;
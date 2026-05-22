import { NaryTree } from "../algorithms/NaryTree";
import type { CatalogCategory } from "../interfaces/InterfaceCatalog";

export const catalogTree = new NaryTree<CatalogCategory>({
  id: "servicios",
  name: "Servicios",
  icon: "🏠",
});

catalogTree.addChild("servicios", {
  id: "reparaciones",
  name: "Reparaciones",
  icon: "🔧",
});

catalogTree.addChild("reparaciones", {
  id: "plomeria",
  name: "Plomería",
  icon: "🚿",
  serviceCategory: "Plomeria",
});

catalogTree.addChild("reparaciones", {
  id: "electricidad",
  name: "Electricidad",
  icon: "⚡",
  serviceCategory: "Electricidad",
});

catalogTree.addChild("reparaciones", {
  id: "carpinteria",
  name: "Carpintería",
  icon: "🪚",
  serviceCategory: "Carpinteria",
});

catalogTree.addChild("reparaciones", {
  id: "pintura",
  name: "Pintura",
  icon: "🎨",
  serviceCategory: "Pintura",
});

catalogTree.addChild("servicios", {
  id: "limpieza",
  name: "Limpieza",
  icon: "🧹",
});

catalogTree.addChild("limpieza", {
  id: "limpieza-hogar",
  name: "Limpieza del hogar",
  icon: "🧼",
  serviceCategory: "Limpieza",
});

catalogTree.addChild("servicios", {
  id: "jardineria",
  name: "Jardinería",
  icon: "🌿",
});

catalogTree.addChild("jardineria", {
  id: "jardines",
  name: "Jardines",
  icon: "🌱",
  serviceCategory: "Jardineria",
});

catalogTree.addChild("servicios", {
  id: "electrodomesticos",
  name: "Electrodomésticos",
  icon: "🔌",
});

catalogTree.addChild("electrodomesticos", {
  id: "lavadoras-neveras",
  name: "Lavadoras y neveras",
  icon: "🧺",
  serviceCategory: "Electrodomesticos",
});

catalogTree.addChild("servicios", {
  id: "mantenimiento",
  name: "Mantenimiento",
  icon: "🏠",
});

catalogTree.addChild("mantenimiento", {
  id: "mantenimiento-general",
  name: "Mantenimiento general",
  icon: "🛠️",
  serviceCategory: "Mantenimiento",
});
# 🏠 HomeFix

> **Soluciones confiables para cada rincón de tu hogar.**

Plataforma web académica para solicitar servicios del hogar como plomería, electricidad, carpintería, pintura, limpieza, jardinería, reparación de electrodomésticos y mantenimiento general.

---

## 🔗 Enlaces importantes

| Recurso | Enlace |
|---|---|
| 🌐 **Aplicación desplegada** | [homefix-khaki.vercel.app](https://homefix-khaki.vercel.app/) |
| 🎨 **Propuesta gráfica (Figma)** | [Ver prototipo en Figma](https://www.figma.com/proto/GiU355AFla1BzZ5B8IM2fM/HomeFix---Propuesta-Gr%C3%A1fica?node-id=0-1&t=nKR2sA7iS56RBRm5-1) |
| 📁 **Repositorio GitHub** | https://github.com/MBeta032/HOMEFIX |

---

## 👥 Integrantes

| Nombre | Rama principal |
|---|---|
| Linda Valeria Quintero Hernandez | `hu-*-Val` |
| Juan Miguel Perdomo Muñoz | `hu-*` |
| Manuel Betancurt Pérez | `hu-*-Manuel` |

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | Framework de UI |
| TypeScript | 6 | Tipado estático |
| Vite | 8 | Bundler y dev server |
| Firebase | 12 | Auth + Firestore |
| React Router | 7 | Navegación SPA |
| React Leaflet | 5 | Mapa interactivo (Cobertura) |
| Leaflet | 1.9 | Motor del mapa |
| SweetAlert2 | 11 | Alertas y notificaciones |
| React Icons | 5 | Iconografía |
| Vercel | — | Despliegue del frontend |

---

## 📐 Alcance del sistema

HomeFix está enfocado **únicamente en el usuario/cliente**. El sistema permite:

- Registro e inicio de sesión real con Firebase Auth (email/contraseña y Google)
- Explorar servicios del hogar con filtros avanzados por categoría, empresa, zona, precio y valoración
- Navegar el catálogo de servicios organizado mediante un árbol N-ario de categorías
- Ver el historial de servicios consultados (Stack LIFO)
- Agregar servicios al carrito y confirmar solicitudes (Queue)
- Consultar el estado de las solicitudes realizadas
- Calificar servicios finalizados
- Ver zonas de cobertura de Cali conectadas con empresas mock y servicios mediante un grafo

> Las empresas son **datos mock** — no existe un panel funcional de empresa ni registro de empresas.

---

## 🧩 Estructura del proyecto

```
src/
├── algorithms/          # Estructuras de datos implementadas
│   ├── Stack.ts
│   ├── RequestQueue.ts
│   ├── NaryTree.ts
│   ├── BinarySearchTree.ts
│   └── Graph.ts
├── components/
│   ├── coverage/        # CoverageMap, CoverageGraphView
│   ├── cart/            # CartItem, CartSummary, CartCounter
│   ├── ratings/         # RatingForm, RatingStars, RatingPreview
│   ├── requests/        # RequestCard, RequestForm, RequestsList...
│   ├── services/        # ServiceCard, CategoryMenu, TopRatedServices
│   ├── ServiceDetail/   # Hero, Info, Actions, ListCard
│   └── shared/          # Button, EmptyState, PageHeader, FilterBar...
├── context/             # AuthContext, CartContext, HistoryContext,
│   │                      RequestContext, RatingContext
├── data/                # ServicesMock, CategoriesMock, coverageGraph.data...
├── firebase/            # config.ts
├── hooks/               # useCart, useHistory, useRequests, useRatings...
├── interfaces/          # Tipado TypeScript de todos los modelos
├── pages/               # 13 vistas principales
├── router/              # AppRouter, PrivateRoutes
├── styles/              # CSS por página/componente
└── utils/               # UtilServices, validaciones, coverageGraph.utils
```

---

## 🔢 Estructuras de datos implementadas

### 1. 📚 Stack (Pila) — `src/algorithms/Stack.ts`
**Uso:** Historial de servicios vistos  
**Métodos:** `push`, `pop`, `peek`, `isEmpty`, `size`, `toArray`  
**Conexión:** `HistoryContext.tsx` → al abrir un servicio se hace `push` al stack. `History.tsx` muestra el resultado ordenado LIFO (último visto = primero mostrado).

---

### 2. 📬 Queue (Cola) — `src/algorithms/RequestQueue.ts`
**Uso:** Solicitudes pendientes del usuario  
**Métodos:** `enqueue`, `dequeue`, `peek`, `isEmpty`, `size`, `getItems`, `clear`  
**Conexión:** `RequestContext.tsx` → al confirmar el checkout se hace `enqueue` por cada servicio. `MyRequestsPage.tsx` muestra la lista de solicitudes.

---

### 3. 🌳 N-ary Tree (Árbol N-ario) — `src/algorithms/NaryTree.ts`
**Uso:** Catálogo de categorías y subcategorías de servicios  
**Métodos:** `addChild`, `findNode`, `getChildren`, `traverse`, `toMenuData`  
**Conexión:** `CategoriesMock.ts` construye el árbol con 5 categorías principales y sus subcategorías. `Catalog.tsx` + `CategoryMenu.tsx` lo usan para la navegación lateral del catálogo.

---

### 4. 🔍 BST (Árbol Binario de Búsqueda) — `src/algorithms/BinarySearchTree.ts`
**Uso:** Servicios mejor valorados ordenados por rating  
**Métodos:** `insert`, `inOrder`, `reverseInOrder`, `search`, `isEmpty`, `size`  
**Conexión:** `UtilServices.ts` → `getTopRatedServices()` inserta servicios en el BST y retorna `reverseInOrder()` para obtener el Top 5. `TopRatedServices.tsx` los muestra en la vista de servicios.

---

### 5. 🕸️ Graph (Grafo no dirigido) — `src/algorithms/Graph.ts`
**Uso:** Zonas de Cali conectadas con empresas mock y servicios disponibles  
**Métodos:** `addNode`, `addEdge`, `getNeighbors`, `printAdjacency`, `printGraph`, `searchNode`, `size`  
**Conexión:** `coverageGraph.utils.ts` construye el grafo con 10 nodos (3 zonas + 3 empresas + 4 servicios) y 9 aristas. `CoveragePage.tsx` + `CoverageMap.tsx` + `CoverageGraphView.tsx` permiten visualizarlo en un mapa Leaflet interactivo de Cali.

---

## 🗺️ Rutas de la aplicación

```
Públicas:
  /                       → Home pública
  /login                  → Inicio de sesión
  /registro               → Registro de cliente

Privadas (requieren autenticación):
  /dashboard              → Panel principal
  /dashboard/servicios    → Listado y búsqueda de servicios
  /dashboard/servicios/:id → Detalle de un servicio
  /dashboard/catalogo     → Catálogo con árbol N-ario
  /dashboard/historial    → Historial con Stack
  /dashboard/carrito      → Carrito de servicios
  /dashboard/checkout     → Confirmar solicitud (Queue)
  /dashboard/solicitudes  → Mis solicitudes
  /dashboard/cobertura    → Cobertura por zonas (Grafo + Mapa)
  /dashboard/perfil       → Perfil del usuario
```

---

## 🚀 Instalación local

```bash
# 1. Clonar el repositorio
git clone [URL_DEL_REPO]
cd homefix

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Crear un archivo .env en la raíz con las credenciales de Firebase:
# VITE_FIREBASE_API_KEY=...
# VITE_FIREBASE_AUTH_DOMAIN=...
# VITE_FIREBASE_PROJECT_ID=...
# VITE_FIREBASE_STORAGE_BUCKET=...
# VITE_FIREBASE_MESSAGING_SENDER_ID=...
# VITE_FIREBASE_APP_ID=...

# 4. Iniciar en modo desarrollo
npm run dev

# 5. Compilar para producción
npm run build
```

---

## 🌿 Ramas del repositorio

El proyecto se desarrolló con una rama por Historia de Usuario (HU).  
Todas las ramas están mezcladas sobre `main`.

```
main
├── hu-001-home-publica - Linda
├── hu-002-zone-search - Linda
├── hu-003-register - Juan
├── hu-004-login - Juan
├── hu-005-dashboard - Juan
├── hu-006-search-services - Juan
├── hu-007-filter-services - Juan
├── hu-008-catalog-ntree - Juan
├── hu-009-top-rated-bst - Juan
├── hu-010-logout - Juan
├── hu-011-service-detail - Manuel 
├── hu-012-history-stack - Manuel 
├── hu-013-add-to-cart - Manuel 
├── hu-014-cart-view - Manuel 
├── hu-015-checkout-queue - Manuel 
├── hu-016-my-requests - Manuel 
└── hu-017-rate-service - Linda
```

---

## ✅ Criterios de la rúbrica cumplidos

| Criterio | Estado |
|---|---|
| Propuesta gráfica en Figma | ✅ |
| Plataforma web funcional | ✅ |
| Navegación pública (Home, Login, Registro) | ✅ |
| Navegación privada (Dashboard y secciones) | ✅ |
| Mapa interactivo (Leaflet + Cobertura) | ✅ |
| Carrito de compras | ✅ |
| 5 estructuras de datos implementadas | ✅ |
| 2 Listas/Pilas/Colas (Stack + Queue) | ✅ |
| 2 Árboles/Tries/Heaps (NaryTree + BST) | ✅ |
| 1 Grafo (Graph) | ✅ |
| Componentes padres e hijos | ✅ |
| Carpeta Helpers/Utils | ✅ |
| Carpeta Context | ✅ |
| Carpeta Pages | ✅ |
| Carpeta Components + Shared | ✅ |
| Carpeta Hooks | ✅ |
| Carpeta Router con AppRoutes | ✅ |
| Publicación frontend en Vercel | ✅ |
| Login y registro reales (Firebase Auth) | ✅ |
| Almacenamiento en base de datos (Firestore) | ✅ |
| Transacción de datos | ✅ |
| Documento final en Git | ✅ |
| README con integrantes y enlaces | ✅ |

---

*Proyecto académico — Estructuras de Datos II · Universidad Autónoma de Occidente*
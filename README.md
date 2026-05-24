# HU-017 — Calificar servicio finalizado

## Archivos entregados

| Archivo | Acción |
|---|---|
| `src/interfaces/Rating/rating.interface.ts` | ✅ CREAR |
| `src/interfaces/Requests/request.interface.ts` | ✅ YA EXISTE (referencia) |
| `src/context/Rating/RatingContext.tsx` | ✅ CREAR |
| `src/hooks/rating/useRatings.ts` | ✅ CREAR |
| `src/components/ratings/RatingStars.tsx` | ✅ CREAR |
| `src/components/ratings/RatingForm.tsx` | ✅ CREAR |
| `src/components/ratings/RatingPreview.tsx` | ✅ CREAR |
| `src/components/requests/RequestCard.tsx` | ✅ MODIFICAR (agrega sección rating al final) |
| `src/styles/Requests/index.css` | ✅ AGREGAR al final (contenido de rating-additions.css) |
| `src/router/AppRouter.tsx` | ✅ MODIFICAR (ver AppRouter_INSTRUCCION.tsx) |

---

## Cómo copiar los archivos al proyecto real

```bash
# Desde la raíz de HOMEFIX, rama hu-017-Rate-service-Val

# 1. Crear carpetas nuevas
mkdir -p src/interfaces/Rating
mkdir -p src/context/Rating
mkdir -p src/hooks/rating
mkdir -p src/components/ratings

# 2. Copiar archivos nuevos
cp [ruta_descarga]/src/interfaces/Rating/rating.interface.ts src/interfaces/Rating/
cp [ruta_descarga]/src/context/Rating/RatingContext.tsx src/context/Rating/
cp [ruta_descarga]/src/hooks/rating/useRatings.ts src/hooks/rating/
cp [ruta_descarga]/src/components/ratings/RatingStars.tsx src/components/ratings/
cp [ruta_descarga]/src/components/ratings/RatingForm.tsx src/components/ratings/
cp [ruta_descarga]/src/components/ratings/RatingPreview.tsx src/components/ratings/

# 3. RequestCard.tsx: copia el archivo entregado O agrega solo la sección
# "request-card__rating" al final de tu RequestCard existente.

# 4. Pegar el contenido de rating-additions.css AL FINAL de:
# src/styles/Requests/index.css

# 5. En AppRouter.tsx: agregar import y envolver con RatingProvider
```

---

## Instrucción para AppRouter.tsx

Solo necesitas hacer 2 cambios:

**1. Agregar el import:**
```tsx
import { RatingProvider } from "../context/Rating/RatingContext";
```

**2. Envolver las rutas:**
```tsx
// Antes (ejemplo):
<CartProvider>
  <RequestProvider>
    <Routes>...</Routes>
  </RequestProvider>
</CartProvider>

// Después:
<CartProvider>
  <RequestProvider>
    <RatingProvider>
      <Routes>...</Routes>
    </RatingProvider>
  </RequestProvider>
</CartProvider>
```

---

## Cómo probar con solicitud Finalizada

Si no tienes una solicitud con estado "Finalizada", pégala en la consola del navegador:

```js
const requests = JSON.parse(localStorage.getItem("homefix-requests") || "[]");

requests.push({
  id: "test-finalizada-001",
  serviceId: "srv-001",
  serviceName: "Plomería residencial",
  company: "AquaFix Servicios",
  price: 80000,
  serviceZone: "Zona Sur",
  address: "Calle 10 # 5-30",
  neighborhood: "La Candelaria",
  city: "Bogotá",
  desiredDate: "2026-05-20",
  desiredTime: "09:00",
  paymentMethod: "Efectivo",
  problemDescription: "Fuga en el baño",
  status: "Finalizada",
  createdAt: new Date().toISOString()
});

localStorage.setItem("homefix-requests", JSON.stringify(requests));
```

Luego recarga la página y entra a `/requests`.

---

## Limpiar calificaciones de prueba

```js
localStorage.removeItem("homefix-ratings");
```

---

## Commits recomendados

```bash
git add src/interfaces/Rating/rating.interface.ts
git commit -m "✨ add rating interface"

git add src/context/Rating/RatingContext.tsx
git commit -m "✨ add rating context"

git add src/hooks/rating/useRatings.ts
git commit -m "✨ add ratings hook"

git add src/components/ratings/RatingStars.tsx
git commit -m "✨ add rating stars component"

git add src/components/ratings/RatingForm.tsx
git commit -m "✨ add rating form"

git add src/components/ratings/RatingPreview.tsx
git commit -m "✨ add rating preview"

git add src/components/requests/RequestCard.tsx
git commit -m "✨ connect ratings with request cards"

git add src/router/AppRouter.tsx
git commit -m "🔀 add rating provider"

git add src/styles/Requests/index.css
git commit -m "💄 style service ratings"

git add .
git commit -m "✨ complete HU-017 service rating flow"
```

---

## Checklist de calidad

- [x] Solo califica solicitudes con status === "Finalizada"
- [x] No aparece formulario en: Pendiente, Asignada, En proceso, Cancelada
- [x] Puntuación obligatoria (1–5)
- [x] Comentario opcional
- [x] Guarda en localStorage con clave `homefix-ratings`
- [x] Persiste al recargar la página
- [x] No permite calificar dos veces la misma solicitud
- [x] Muestra RatingPreview si ya fue calificada
- [x] No usa `any`
- [x] No instala librerías nuevas
- [x] No rompe rutas anteriores
- [x] No usa Firebase, Redux, Zustand, Tailwind ni Bootstrap

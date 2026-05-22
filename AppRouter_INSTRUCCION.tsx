// MODIFICACIÓN DE AppRouter.tsx para HU-017
// Agrega RatingProvider envolviendo las rutas existentes.
// NO borres CartProvider ni RequestProvider.
//
// Ejemplo de cómo debe quedar la parte del return:

/*
import { RatingProvider } from "../context/Rating/RatingContext";

// Dentro del return, envuelve lo que ya existe:

<CartProvider>
  <RequestProvider>
    <RatingProvider>
      <Routes>
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        {/* ...resto de rutas sin cambios... */}
      </Routes>
    </RatingProvider>
  </RequestProvider>
</CartProvider>
*/

// IMPORTANTE: Solo agrega el import de RatingProvider y envuélvelo.
// No cambies ninguna ruta existente.
// No borres ningún provider existente.

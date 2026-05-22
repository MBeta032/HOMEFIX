import { BrowserRouter } from "react-router-dom"
import AppRouter from "./router/AppRouter"
import { AuthProvider } from "./context/AuthContext"
import { HistoryProvider } from "./context/HistoryContext"
import { CartProvider } from "./context/Cart/CartContext"

function App() {
  return (
    <AuthProvider>
      <HistoryProvider>
        <CartProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </CartProvider>
      </HistoryProvider>
    </AuthProvider>
  )
}

export default App
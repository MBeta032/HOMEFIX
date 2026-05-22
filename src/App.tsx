import { BrowserRouter } from "react-router-dom"
import AppRouter from "./router/AppRouter"
import { AuthProvider } from "./context/AuthContext"
import { HistoryProvider } from "./context/HistoryContext"
import { CartProvider } from "./context/Cart/CartContext"
import { RequestProvider } from "./context/Request/RequestContext"
import { RatingProvider } from "./context/Rating/RatingContext"

function App() {
  return (
    <AuthProvider>
      <HistoryProvider>
        <CartProvider>
          <RequestProvider>
            <RatingProvider>
              <BrowserRouter>
                <AppRouter />
              </BrowserRouter>
            </RatingProvider>
          </RequestProvider>
        </CartProvider>
      </HistoryProvider>
    </AuthProvider>
  )
}

export default App
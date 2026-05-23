import { BrowserRouter } from "react-router-dom"
import AppRouter from "./router/AppRouter"
import { AuthContext, AuthProvider } from "./context/AuthContext"
import { HistoryProvider } from "./context/HistoryContext"
import { CartProvider } from "./context/Cart/CartContext"
import { RequestProvider } from "./context/Request/RequestContext"
import { RatingProvider } from "./context/Rating/RatingContext"
import { useContext } from "react"

function AppWithProviders() {
  const auth = useContext(AuthContext)
  const uid = auth?.user?.uid ?? "guest"

  return (
    <HistoryProvider uid={uid}>
      <CartProvider uid={uid}>
        <RequestProvider uid={uid}>
          <RatingProvider uid={uid}>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </RatingProvider>
        </RequestProvider>
      </CartProvider>
    </HistoryProvider>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppWithProviders />
    </AuthProvider>
  )
}

export default App
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./router/AppRouter"
import { AuthProvider } from "./context/AuthContext"
import { HistoryProvider } from "./context/HistoryContext"

function App() {
  return (
    <AuthProvider>
      <HistoryProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </HistoryProvider>
    </AuthProvider>
  )
}

export default App
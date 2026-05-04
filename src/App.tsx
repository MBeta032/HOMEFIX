import { Routes, Route } from "react-router-dom";
import HomePublica from "./pages/HomePublica";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePublica />} />
    </Routes>
  );
}

export default App;
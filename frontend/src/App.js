import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GaragePage from "./pages/GaragePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/garage" element={<GaragePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
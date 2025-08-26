
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from './components/header/Header'
import { CryptoProvider } from './context/useCrypto'
import Dashboard from './pages/Dashboard'
import CryptoDetailsPage from "./pages/CriptoDetails";
import { FavoritesProvider } from "./context/useFavorites";
import FavoritesPage from "./pages/FavoritesPage";


function App() {

  return (
    <BrowserRouter>
      <FavoritesProvider>
        <CryptoProvider>
          <Header />
          <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/crypto/:id" element={<CryptoDetailsPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
      </CryptoProvider>
      </FavoritesProvider>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from './components/header/Header'
import { CryptoProvider } from './context/useCrypto'
import Dashboard from './pages/Dashboard'
import CryptoDetailsPage from "./pages/CriptoDetails";


function App() {

  return (
    <BrowserRouter>
      <CryptoProvider>
          <Header />
          <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/crypto/:id" element={<CryptoDetailsPage />} />
          </Routes>
      </CryptoProvider>
    </BrowserRouter>
  )
}

export default App
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Inicio from './pages/Inicio';
import Nosotros from './pages/Nosotros';
import Servicios from './pages/Servicios';
import Tutorial from './pages/Tutorial';
import Clientes from './pages/Clientes';
import Contactanos from './pages/Contactanos';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import Compra from './pages/Compra';
import Importante from './pages/Importante';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/contactanos" element={<Contactanos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/compra" element={<Compra />} />
        <Route path="/importante" element={<Importante />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

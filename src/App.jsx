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
import Firma from './pages/Firma';
import ServicioDetalle from './pages/ServicioDetalle';
import Perfil from './pages/Perfil';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

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
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin={true}>
            <Admin />
          </ProtectedRoute>
        } />
        <Route path="/compra" element={
          <ProtectedRoute>
            <Compra />
          </ProtectedRoute>
        } />
        <Route path="/importante" element={<Importante />} />
        <Route path="/firma" element={
          <ProtectedRoute>
            <Firma />
          </ProtectedRoute>
        } />
        <Route path="/perfil" element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        } />
        <Route path="/servicio/detalle/:id" element={<ServicioDetalle />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
import { useState } from 'react';
import Inicio from './pages/Inicio';
import Servicios from './pages/Servicios';
import Tutorial from './pages/Tutorial';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Compra from './pages/Compra';
import Clientes from './pages/Clientes';
import Nosotros from './pages/Nosotros';
import Admin from './pages/Admin';
import Contactanos from './pages/Contactanos';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Inicio />
      <Nosotros />
      <Servicios />
      <Footer />
    </>
  );
}

export default App;
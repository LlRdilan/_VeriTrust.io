// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 1) Bootstrap primero (base)
import "./styles/bootstrap.min.css";

// 2) Librerías que dependen de CSS (icons, efectos, etc.)
import "./styles/font-awesome.min.css";
import "./styles/icomoon.css";
import "./styles/animate.min.css";
import "./styles/meanmenu.css";
import "./styles/owl.carousel.min.css";
import "./styles/slick.css";
import "./styles/jquery.fancybox.min.css";
import "./styles/jquery.mCustomScrollbar.min.css";
import "./styles/nice-select.css";
import "./styles/default-skin.css";

// 3) Tus estilos de plantilla al final (para que sobrescriban)
import "./styles/style.css";
import "./styles/responsive.css";


// Componentes comunes
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

// Páginas
import Inicio from "./pages/Inicio.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Servicios from "./pages/Servicios.jsx";
import Contactanos from "./pages/Contactanos.jsx";
import Tutorial from "./pages/Tutorial.jsx";
import Compra from "./pages/Compra.jsx";
import Clientes from "./pages/Clientes.jsx";
import Admin from "./pages/Admin.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contactanos" element={<Contactanos />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/compra" element={<Compra />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Fallback simple por si la ruta no existe */}
        <Route path="*" element={<Inicio />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

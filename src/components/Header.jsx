import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <header>
      <div className="header">
        {/* Resto del header top y middle... */}
        <div className="header_bo">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <nav className="navigation navbar navbar-expand-md navbar-dark">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNavbar} // <-- Aquí usamos nuestro estado
                    aria-controls="navbarsExample04"
                    aria-expanded={!collapsed}
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className={`collapse navbar-collapse ${!collapsed ? 'show' : ''}`} id="navbarsExample04">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to="/">Inicio</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/nosotros">Nosotros</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/servicios">Servicios</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/tutorial">Tutoriales</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/clientes">Clientes</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/contactanos">Contáctanos</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="sign_btn nav-link" to="/login">Iniciar Sesión</Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

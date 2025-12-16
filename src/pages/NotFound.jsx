import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="service page-notfound-container">
      <div className="container">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Página no encontrada</h2>
        <p className="notfound-text">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Link className="btn_primary" to="/">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="service" style={{ padding: "100px 0", textAlign: "center", minHeight: "80vh" }}>
      <div className="container">
        <h1 style={{ fontSize: "80px", color: "#1f235e", fontWeight: "bold" }}>404</h1>
        <h2 style={{ color: "#0FB3D1", marginBottom: "20px" }}>Página no encontrada</h2>
        <p style={{ fontSize: "18px", marginBottom: "40px" }}>
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Link className="btn_primary" to="/">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
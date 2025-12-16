import { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { calcularIVA, calcularTotalConIVA } from "../utils/calculos";
import { getSession } from "../services/auth";

export default function Servicios() {
  const [servicios, setServicios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/servicios")
      .then((res) => res.json())
      .then((data) => {
        setServicios(data);
      })
      .catch((err) => console.error("Error conectando al backend:", err));
  }, []);

  const manejarClickCompra = (servicio, neto, iva, total) => {
    const session = getSession();

    if (!session) {
      navigate("/login");
      return;
    }

    navigate(`/servicio/detalle/${servicio.id}`, {
      state: { servicio, neto, iva, total },
    });
  };


  return (
    <div id="service" className="service">
      <div className="container">
        <div className="row">
          <div className="col-md-7 mx-auto">
            <div className="titlepage">
              <h2><br /> Podemos ayudar a que tu negocio crezca</h2>
            </div>
          </div>
        </div>

        <div className="row mb-5">
            <div className="col-md-12">
                <div className="servicios-banner">
                    <img 
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                        alt="Servicios Digitales" 
                        className="servicios-banner-img"
                    />
                    <div className="servicios-banner-overlay">
                        <h2 className="servicios-banner-title">Tecnología de Punta</h2>
                        <p className="servicios-banner-text">Garantizamos la seguridad de tus transacciones con los estándares más altos del mercado.</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="row">
          {servicios.map((s, i) => {
            if (!s) return null; 
            
            const precioBase = Number(s.precio) || 0;
            const nombreServicio = s.nombre || "Servicio sin nombre";
            const descServicio = s.descripcion || "Descripción no disponible";
            const listaDetalles = Array.isArray(s.detalles) ? s.detalles : [];

            const valorIva = calcularIVA(precioBase);
            const total = calcularTotalConIVA(precioBase);

            return (
              <div key={s.id || i} className="col-md-4 col-sm-6">
                <div id="ho_color" className="service_box">
                  <h3>{nombreServicio}</h3>
                  <h4 className="subtitle">{descServicio}</h4>
                  
                  <ul>
                    {listaDetalles.length > 0 ? (
                      listaDetalles.map((d, idx) => <li key={idx}>{d}</li>)
                    ) : (
                      <li>Información disponible al comprar.</li>
                    )}
                  </ul>
                  
                  <div className="price">
                    <strong>
                      Desde ${precioBase.toLocaleString()} + ${valorIva.toLocaleString()} (IVA)
                    </strong>
                  </div>
                    <button
                      className="comprar_btn"
                      onClick={() => manejarClickCompra(s, precioBase, valorIva, total)}
                    >
                      Ver Detalles
                    </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {servicios.length === 0 && (
            <div className="text-center w-100">
                <p className="servicios-empty-text">No hay servicios cargados en la base de datos o el servidor está apagado.</p>
            </div>
        )}

      </div>
    </div>
  );
}
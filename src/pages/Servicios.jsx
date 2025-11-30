import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Servicios() {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("services")) || [
      {
        name: "Firma Electrónica Simple",
        desc: "Certificado Digital",
        price: 15390,
        details: ["Facturación SII", "Centralización", "Compra Rápida", "Docs Tributarios", "1 año gratis"]
      },
      {
        name: "Firma Avanzada Online",
        desc: "e-token",
        price: 21990,
        details: ["Documentos Ilimitados", "100% Online", "ClaveÚnica", "Validez Legal"]
      },
      {
        name: "Firma Avanzada Notario",
        desc: "Uso profesional",
        price: 42990,
        details: ["Corte Apelaciones", "Token Físico", "Alta Seguridad", "Soporte"]
      },
    ];
    setServicios(guardados);
  }, []);

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

        <div className="row">
          {servicios.map((s, i) => {
            // --- CÁLCULO MATEMÁTICO ---
            const neto = Number(s.price);
            const valorIva = Math.round(neto * 0.19);
            const total = neto + valorIva;
            // --------------------------

            return (
              <div key={i} className="col-md-4 col-sm-6">
                <div id="ho_color" className="service_box">
                  <h3>{s.name}</h3>
                  <h4 className="subtitle">{s.desc}</h4>
                  <ul>
                    {s.details && s.details.length > 0 ? (
                      s.details.map((d, idx) => <li key={idx}>{d}</li>)
                    ) : (
                      <li>Servicio sin descripción detallada.</li>
                    )}
                  </ul>
                  
                  <div className="price">
                    <strong>
                      Desde ${neto.toLocaleString()} + ${valorIva.toLocaleString()} (IVA)
                    </strong>
                  </div>
                  
                  {/* AQUÍ ESTÁ LA MAGIA: Enviamos los datos a la página de compra */}
                  <Link 
                    className="comprar_btn" 
                    to="/compra" 
                    state={{ 
                        nombre: s.name, 
                        neto: neto, 
                        iva: valorIva, 
                        total: total 
                    }}
                  >
                    Comprar
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
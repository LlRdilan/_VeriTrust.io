import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Servicios() {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    // Leer servicios desde localStorage o usar los predeterminados
    const guardados = JSON.parse(localStorage.getItem("services")) || [
      {
        name: "Firma Electrónica Simple",
        desc: "Certificado Digital",
        price: 15390,
        details: [
          "Permite realizar Facturación en el SII.",
          "Centralización Automática del certificado en el sistema del SII.",
          "Compra en menos de 5 minutos. Renovación Express.",
          "Firma documentos tributarios electrónicos como facturas y notas de crédito.",
          "Lleva 1 año gratis en tu certificado digital. 3×2 años.",
        ],
      },
      {
        name: "Firma Electrónica Avanzada Online",
        desc: "e-token",
        price: 21990,
        details: [
          "Permite firmar documentos ilimitados desde cualquier lugar.",
          "Compra 100% online con ClaveÚnica y Cédula Vigente.",
          "Adquisición instantánea e implementación fácil.",
          "Valida para todo tipo de documentos legales y comerciales.",
        ],
      },
      {
        name: "Firma Electrónica Avanzada Notario",
        desc: "Uso profesional",
        price: 42990,
        details: [
          "Requiere Certificado de la Corte de Apelaciones.",
          "Firma portable en dispositivo e-token.",
          "Alta seguridad y validez legal.",
        ],
      },
    ];

    setServicios(guardados);
  }, []);

  return (
    <div id="service" className="service">
      <div className="container">
        {/* Título principal */}
        <div className="row">
          <div className="col-md-7">
            <div className="titlepage">
              <h2>
                <strong className="yellow">Servicios</strong>
                <br /> Podemos ayudar a que tu negocio crezca
              </h2>
            </div>
          </div>
        </div>

        {/* Render dinámico de los servicios */}
        <div className="row">
          {servicios.map((s, i) => (
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
                    Desde ${s.price.toLocaleString()} + IVA
                  </strong>
                </div>
                <Link className="comprar_btn" to="/compra">
                  Comprar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

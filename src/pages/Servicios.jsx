import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Servicios() {
  // Inicializamos con un array vacío (Sin datos de respaldo)
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    // Petición directa al Backend. Si falla, el catch solo registra el error.
    fetch("http://localhost:8080/servicios")
      .then((res) => res.json())
      .then((data) => {
        setServicios(data);
      })
      .catch((err) => console.error("Error conectando al backend:", err));
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

        {/* --- BANNER DECORATIVO --- */}
        <div className="row mb-5">
            <div className="col-md-12">
                <div style={{
                    width: '100%', 
                    height: '300px', 
                    borderRadius: '20px', 
                    overflow: 'hidden', 
                    position: 'relative',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}>
                    <img 
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                        alt="Servicios Digitales" 
                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                    />
                    <div style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        background: 'rgba(31, 35, 94, 0.7)',
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                        color: '#fff', padding: '20px'
                    }}>
                        <h2 style={{color: '#fff', fontSize: '35px', fontWeight: 'bold'}}>Tecnología de Punta</h2>
                        <p style={{color: '#ddd', fontSize: '18px', maxWidth: '600px'}}>Garantizamos la seguridad de tus transacciones con los estándares más altos del mercado.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* --- LISTA DE SERVICIOS REALES (Si está vacía, no muestra nada) --- */}
        <div className="row">
          {servicios.map((s, i) => {
            if (!s) return null; 
            
            const precioBase = Number(s.precio) || 0;
            const nombreServicio = s.nombre || "Servicio sin nombre";
            const descServicio = s.descripcion || "Descripción no disponible";
            const listaDetalles = Array.isArray(s.detalles) ? s.detalles : [];

            const valorIva = Math.round(precioBase * 0.19);
            const total = precioBase + valorIva;

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
                  
                  <Link 
                    className="comprar_btn" 
                    to={`/servicio/detalle/${s.id}`} 
                    state={{ 
                        servicio: s, 
                        neto: precioBase, 
                        iva: valorIva, 
                        total: total,
                    }}
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        
        {servicios.length === 0 && (
            <div className="text-center w-100">
                <p style={{color: '#888'}}>No hay servicios cargados en la base de datos o el servidor está apagado.</p>
            </div>
        )}

      </div>
    </div>
  );
}
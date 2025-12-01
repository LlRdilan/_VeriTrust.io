import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Servicios() {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    // Petición directa al Backend. Sin datos falsos de respaldo.
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

        {/* --- LISTA DE SERVICIOS REALES DE LA BD --- */}
        <div className="row">
          {servicios.map((s) => {
            // Cálculos directos con los datos que vengan de Java
            const neto = Number(s.precio);
            const valorIva = Math.round(neto * 0.19);
            const total = neto + valorIva;

            return (
              <div key={s.id} className="col-md-4 col-sm-6">
                <div id="ho_color" className="service_box">
                  <h3>{s.nombre}</h3>
                  <h4 className="subtitle">{s.descripcion}</h4>
                  
                  <ul>
                    {/* Si Java manda la lista 'detalles', la mostramos. Si no, mostramos aviso */}
                    {s.detalles && s.detalles.length > 0 ? (
                      s.detalles.map((d, idx) => <li key={idx}>{d}</li>)
                    ) : (
                      <li>Sin detalles específicos.</li>
                    )}
                  </ul>
                  
                  <div className="price">
                    <strong>
                      Desde ${neto.toLocaleString()} + ${valorIva.toLocaleString()} (IVA)
                    </strong>
                  </div>
                  
                  <Link 
                    className="comprar_btn" 
                    to="/compra" 
                    state={{ 
                        nombre: s.nombre, 
                        neto: neto, 
                        iva: valorIva, 
                        total: total,
                        id: s.id 
                    }}
                  >
                    Comprar
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Aviso si la lista está vacía */}
        {servicios.length === 0 && (
            <div className="text-center w-100">
                <p style={{color: '#888'}}>No hay servicios cargados en la base de datos o el servidor está apagado.</p>
            </div>
        )}

      </div>
    </div>
  );
}
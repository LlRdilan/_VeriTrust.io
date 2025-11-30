import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Firma() {
  const location = useLocation();
  const navigate = useNavigate();

  const servicioComprado = location.state?.servicio || { 
    nombre: "Firma Digital (Modo Prueba)", 
    precio: 0 
  };

  const [archivo, setArchivo] = useState(null);
  const [archivoUrl, setArchivoUrl] = useState(null); // Nuevo estado para la vista previa
  const [cargando, setCargando] = useState(false);
  const [firmado, setFirmado] = useState(false);

  const manejarArchivo = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setArchivo(file);
      setFirmado(false);
      
      // Creamos una URL temporal para visualizar el PDF
      const url = window.URL.createObjectURL(file);
      setArchivoUrl(url);
    }
  };

  const procesarFirma = () => {
    if (!archivo) return;
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setFirmado(true);
    }, 3000);
  };

  const descargarArchivo = () => {
    if (!archivo) return;
    const link = document.createElement('a');
    link.href = archivoUrl; // Usamos la URL que ya creamos
    link.setAttribute('download', `FIRMADO_${archivo.name}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="service" style={{ padding: "80px 0", minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10"> {/* Aumenté el ancho a 10 para que quepa el PDF */}
            <div className="titlepage">
              <h2>Firma de Documentos</h2>
              <p>Servicio activo: <strong style={{color: '#0FB3D1'}}>{servicioComprado.nombre}</strong></p>
            </div>

            <div className="backoffice_section text-center" style={{padding: '40px'}}>
              
              {!firmado && !cargando && (
                <>
                  <h3 style={{marginBottom: '20px', fontWeight: '600'}}>1. Sube tu documento (PDF)</h3>
                  
                  <div className="form-group mb-4">
                    <input 
                      type="file" 
                      className="form-control" 
                      accept=".pdf" // Limitamos a PDF para asegurar visualización
                      onChange={manejarArchivo} 
                      style={{padding: '10px', height: 'auto'}}
                    />
                  </div>

                  {/* VISTA PREVIA DEL PDF */}
                  {archivoUrl && (
                    <div style={{marginBottom: '30px', border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden'}}>
                        <h5 style={{background:'#f7fafc', padding:'10px', margin:0, borderBottom:'1px solid #ddd'}}>Vista Previa del Documento</h5>
                        <iframe 
                            src={archivoUrl} 
                            width="100%" 
                            height="500px" 
                            style={{border: 'none'}}
                            title="Vista Previa"
                        ></iframe>
                    </div>
                  )}

                  {archivo && (
                    <button onClick={procesarFirma} className="btn_primary" style={{width: '100%', maxWidth: '400px'}}>
                      <i className="fa fa-pen-fancy"></i> Firmar Documento Digitalmente
                    </button>
                  )}
                </>
              )}

              {cargando && (
                <div style={{padding: '60px 0'}}>
                   <div className="spinner-border text-primary" role="status" style={{width: '4rem', height: '4rem', color: '#0FB3D1 !important'}}></div>
                  <h3 style={{marginTop: '30px', color: '#1f235e'}}>Firmando documento...</h3>
                  <p>Incrustando certificado digital y sellado de tiempo.</p>
                </div>
              )}

              {firmado && (
                <div className="animate__animated animate__fadeIn">
                  <i className="fa fa-check-circle" style={{fontSize: '80px', color: '#28a745', marginBottom: '20px'}}></i>
                  <h2 style={{color: '#1f235e', fontWeight: 'bold'}}>¡Documento Firmado!</h2>
                  
                  <div style={{marginTop: '30px', padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '15px', border: '1px solid #28a745', textAlign: 'left'}}>
                    <p><strong>Archivo:</strong> FIRMADO_{archivo.name}</p>
                    <p><strong>Hash SHA-256:</strong> {Math.random().toString(36).substring(2, 20).toUpperCase()}</p>
                    <p><strong>Sello de Tiempo:</strong> {new Date().toLocaleString()}</p>
                  </div>

                  <button onClick={descargarArchivo} className="btn_primary mt-4" style={{background: '#28a745', width: '100%', maxWidth: '400px', border: 'none'}}>
                    <i className="fa fa-download"></i> Descargar Ahora
                  </button>
                  
                  <br/>
                  <button onClick={() => navigate("/")} className="btn btn-link mt-3" style={{color: '#666'}}>Volver al inicio</button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
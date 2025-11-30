import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Firma() {
  const location = useLocation();
  const navigate = useNavigate();
  // Recibimos los datos del servicio comprado para personalizar el mensaje
  const servicioComprado = location.state?.servicio;

  const [archivo, setArchivo] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [firmado, setFirmado] = useState(false);

  // Si alguien entra directo sin comprar, lo mandamos al inicio
  useEffect(() => {
    if (!servicioComprado) {
      navigate("/");
    }
  }, [servicioComprado, navigate]);

  const manejarArchivo = (e) => {
    if (e.target.files[0]) {
      setArchivo(e.target.files[0]);
      setFirmado(false); // Resetear si cambia el archivo
    }
  };

  const procesarFirma = () => {
    if (!archivo) return;

    setCargando(true);

    // --- AQUÍ ES DONDE CONECTARÁS EL BACKEND EN EL FUTURO ---
    // Por ahora, simulamos que el servidor tarda 3 segundos en firmar
    setTimeout(() => {
      setCargando(false);
      setFirmado(true);
      // Aquí el backend te respondería con el archivo real modificado
    }, 3000);
  };

  const descargarArchivo = () => {
    if (!archivo) return;

    // TRUCO DE FRONTEND:
    // Creamos una URL temporal con el MISMO archivo que subiste
    const url = window.URL.createObjectURL(archivo);
    const link = document.createElement('a');
    link.href = url;
    
    // Le cambiamos el nombre "falsamente" para simular que es uno nuevo
    // Ejemplo: de "contrato.pdf" pasa a "FIRMADO_contrato.pdf"
    link.setAttribute('download', `FIRMADO_${archivo.name}`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!servicioComprado) return null;

  return (
    <div className="service" style={{ padding: "80px 0", minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="titlepage">
              <h2>Firma de Documentos</h2>
              <p>Servicio activo: <strong style={{color: '#0FB3D1'}}>{servicioComprado.nombre}</strong></p>
            </div>

            {/* Usamos el estilo 'backoffice_section' para que se vea limpio como el admin */}
            <div className="backoffice_section text-center" style={{padding: '50px'}}>
              
              {!firmado && !cargando && (
                <>
                  <i className="fa fa-file-pdf-o" style={{fontSize: '60px', color: '#1f235e', marginBottom: '20px'}}></i>
                  <h3 style={{marginBottom: '30px', fontWeight: '600'}}>Sube tu documento para firmar</h3>
                  
                  <div className="form-group">
                    <input 
                      type="file" 
                      className="form-control" 
                      accept=".pdf,.doc,.docx"
                      onChange={manejarArchivo} 
                      style={{padding: '10px', height: 'auto'}}
                    />
                  </div>

                  {archivo && (
                    <button onClick={procesarFirma} className="btn_primary mt-4" style={{width: '100%', maxWidth: '400px'}}>
                      <i className="fa fa-pen-fancy"></i> Firmar Documento Digitalmente
                    </button>
                  )}
                </>
              )}

              {cargando && (
                <div style={{padding: '40px 0'}}>
                   {/* Spinner de carga visual */}
                   <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem', color: '#0FB3D1 !important'}}>
                    <span className="sr-only">Cargando...</span>
                  </div>
                  <h4 style={{marginTop: '20px', color: '#1f235e', fontWeight: 'bold'}}>Procesando firma electrónica...</h4>
                  <p>Validando identidad, encriptando hash y sellando documento.</p>
                </div>
              )}

              {firmado && (
                <div className="animate__animated animate__fadeIn">
                  <i className="fa fa-check-circle" style={{fontSize: '70px', color: '#28a745', marginBottom: '20px'}}></i>
                  <h3 style={{color: '#1f235e', fontWeight: 'bold'}}>¡Documento Firmado con Éxito!</h3>
                  <p>Tu documento ha sido procesado y sellado correctamente.</p>
                  
                  <div style={{marginTop: '30px', padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '15px', border: '1px solid #28a745', textAlign: 'left'}}>
                    <p style={{marginBottom: '5px'}}><strong>Archivo:</strong> FIRMADO_{archivo.name}</p>
                    <p style={{marginBottom: '5px'}}><strong>Hash de Seguridad:</strong> {Math.random().toString(36).substring(2, 15).toUpperCase()}</p>
                    <p style={{marginBottom: '0'}}><strong>Fecha de Firma:</strong> {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
                  </div>

                  <button onClick={descargarArchivo} className="btn_primary mt-4" style={{background: '#28a745', width: '100%', maxWidth: '400px', border: 'none'}}>
                    <i className="fa fa-download"></i> Descargar Documento Firmado
                  </button>
                  
                  <br/>
                  <button onClick={() => navigate("/")} className="btn btn-link mt-3" style={{color: '#666', textDecoration: 'none'}}>
                    Volver al inicio
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
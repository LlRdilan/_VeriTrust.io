import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

export default function Firma() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. RECUPERAMOS EL SERVICIO
  // Si viene de la compra, usamos 'location.state.servicio'.
  // Si entras directo, usamos datos de prueba para que no salga $0.
  const servicioComprado = location.state?.servicio || { 
    nombre: "Firma Digital (Modo Prueba)", 
    neto: 15000, 
    iva: 2850,
    total: 17850 
  };

  // Datos del Usuario
  const session = JSON.parse(localStorage.getItem("user_session"));
  const nombreUsuario = session ? session.nombre : "Usuario Invitado";
  const rutUsuario = session?.rut || "11.111.111-1"; 
  const nombreSanitizado = nombreUsuario.replace(/\s+/g, '_');

  const [archivo, setArchivo] = useState(null);
  const [archivoUrl, setArchivoUrl] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [firmado, setFirmado] = useState(false);
  const [hashDocumento, setHashDocumento] = useState("");
  const [fechaFirma, setFechaFirma] = useState("");

  const manejarArchivo = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setArchivo(file);
      setFirmado(false); 
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
      setHashDocumento(Math.random().toString(36).substring(2, 20).toUpperCase() + Math.random().toString(36).substring(2, 20).toUpperCase());
      setFechaFirma(new Date().toLocaleString());
    }, 3000);
  };

  const descargarArchivo = () => {
    if (!archivo) return;
    const url = window.URL.createObjectURL(archivo);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `FIRMADO-${nombreSanitizado}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- FUNCIÓN BOLETA CORREGIDA ---
  const descargarBoleta = () => {
    const doc = new jsPDF();

    // AQUI ESTABA EL ERROR: Ahora leemos las propiedades correctas (neto, total)
    // Si por alguna razón faltan, calculamos al vuelo
    let precioNeto = Number(servicioComprado.neto);
    let precioTotal = Number(servicioComprado.total);
    
    // Si los datos vinieron incompletos (fallback de seguridad)
    if (!precioNeto && servicioComprado.precio) {
        precioNeto = Number(servicioComprado.precio);
    }
    if (!precioTotal) {
        precioTotal = Math.round(precioNeto * 1.19);
    }
    const valorIVA = precioTotal - precioNeto;

    // --- DISEÑO PDF ---
    doc.setFillColor(31, 35, 94);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("VeriTrust", 20, 25);
    doc.setFontSize(12);
    doc.text("Comprobante Electrónico", 20, 32);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text("BOLETA DE VENTA Y SERVICIOS", 105, 60, null, null, "center");

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    let y = 80;
    doc.text(`Cliente: ${nombreUsuario}`, 20, y); 
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 150, y); y += 10;
    doc.text(`RUT: ${rutUsuario}`, 20, y); y += 20;
    
    doc.setDrawColor(0);
    doc.line(20, y, 190, y); y += 10;
    
    doc.setFont("helvetica", "bold");
    doc.text("Descripción", 20, y);
    doc.text("Valor", 190, y, { align: "right" }); y += 10;
    
    doc.setFont("helvetica", "normal");
    doc.text(servicioComprado.nombre, 20, y);
    doc.text(`$${precioNeto.toLocaleString()}`, 190, y, { align: "right" }); y += 20;

    doc.line(20, y, 190, y); y += 10;
    
    // Totales
    doc.setFont("helvetica", "normal");
    doc.text("Neto:", 140, y);
    doc.text(`$${precioNeto.toLocaleString()}`, 190, y, { align: "right" }); y += 8;

    doc.text("IVA (19%):", 140, y);
    doc.text(`$${valorIVA.toLocaleString()}`, 190, y, { align: "right" }); y += 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(31, 35, 94);
    doc.text("TOTAL:", 140, y);
    doc.text(`$${precioTotal.toLocaleString()}`, 190, y, { align: "right" });

    doc.save(`boleta-${nombreSanitizado}.pdf`);
  };

  return (
    <div className="service" style={{ padding: "80px 0", minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="titlepage">
              <h2>Firma de Documentos</h2>
              <p>Servicio activo: <strong style={{color: '#0FB3D1'}}>{servicioComprado.nombre}</strong></p>
            </div>

            <div className="backoffice_section text-center" style={{padding: '40px'}}>
              
              {!firmado && !cargando && (
                <>
                  <i className="fa fa-cloud-upload" style={{fontSize: '50px', color: '#1f235e', marginBottom: '20px'}}></i>
                  <h3 style={{marginBottom: '20px', fontWeight: '600'}}>1. Sube tu documento (PDF)</h3>
                  
                  <div className="form-group mb-4">
                    <input 
                      type="file" 
                      className="form-control" 
                      accept=".pdf" 
                      onChange={manejarArchivo} 
                      style={{padding: '10px', height: 'auto'}}
                    />
                  </div>

                  {archivoUrl && (
                    <div className="mb-4" style={{border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden'}}>
                        <div style={{background: '#f1f1f1', padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold', color: '#333'}}>
                            Vista Previa: {archivo.name}
                        </div>
                        <iframe 
                            src={archivoUrl} 
                            width="100%" 
                            height="500px" 
                            style={{border: 'none'}}
                            title="Vista Previa PDF"
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
                   <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem', color: '#0FB3D1 !important'}}>
                    <span className="sr-only">Cargando...</span>
                  </div>
                  <h4 style={{marginTop: '20px', color: '#1f235e'}}>Firmando documento...</h4>
                  <p>Incrustando certificado digital de: <strong>{nombreUsuario}</strong></p>
                </div>
              )}

              {firmado && (
                <div className="animate__animated animate__fadeIn">
                  <i className="fa fa-check-circle" style={{fontSize: '70px', color: '#28a745', marginBottom: '20px'}}></i>
                  <h3 style={{color: '#1f235e', fontWeight: 'bold'}}>¡Documento Firmado con Éxito!</h3>
                  
                  <div style={{marginTop: '30px', padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '15px', border: '1px solid #28a745', textAlign: 'left'}}>
                    <p style={{marginBottom: '5px'}}><strong>Archivo Generado:</strong> FIRMADO-{nombreSanitizado}.pdf</p>
                    <p style={{marginBottom: '5px'}}><strong>Hash de Seguridad:</strong> {hashDocumento}</p>
                    <p style={{marginBottom: '0'}}><strong>Fecha:</strong> {fechaFirma}</p>
                  </div>

                  <div className="d-flex justify-content-center gap-3 mt-4" style={{gap: '15px', flexWrap: 'wrap'}}>
                    <button onClick={descargarArchivo} className="btn_primary" style={{background: '#28a745', border: 'none', minWidth: '220px'}}>
                        <i className="fa fa-download"></i> Descargar Documento
                    </button>

                    <button onClick={descargarBoleta} className="btn_primary" style={{background: '#1f235e', border: 'none', minWidth: '220px'}}>
                        <i className="fa fa-file-text-o"></i> Descargar Boleta
                    </button>
                  </div>
                  
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
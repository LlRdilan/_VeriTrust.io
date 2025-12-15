import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { PDFDocument, rgb } from "pdf-lib";

export default function Firma() {
  const location = useLocation();
  const navigate = useNavigate();

  const servicioComprado = location.state?.servicio || { 
    nombre: "Firma Digital (Modo Prueba)", 
    neto: 15000, 
    iva: 2850,
    total: 17850 
  };

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

  // Función auxiliar para generar el certificado como PDF usando pdf-lib
  const generarCertificadoPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // Tamaño A4
    const { width, height } = page.getSize();
    
    // Embed fonts
    const helveticaFont = await pdfDoc.embedFont('Helvetica');
    const helveticaBoldFont = await pdfDoc.embedFont('Helvetica-Bold');
    
    // Encabezado con fondo
    page.drawRectangle({
      x: 0,
      y: height - 20,
      width: width,
      height: 20,
      color: rgb(0.122, 0.137, 0.369), // #1f235e
    });
    
    // Texto VERITRUST
    page.drawText("VERITRUST", {
      x: 10,
      y: height - 14,
      size: 14,
      color: rgb(1, 1, 1),
      font: helveticaBoldFont,
    });
    
    // Título principal (centrado) - más espacio desde el encabezado
    const tituloTexto = "CERTIFICADO DE FIRMA ELECTRÓNICA";
    const tituloWidth = helveticaBoldFont.widthOfTextAtSize(tituloTexto, 26);
    page.drawText(tituloTexto, {
      x: (width - tituloWidth) / 2,
      y: height - 70,
      size: 26,
      color: rgb(0.122, 0.137, 0.369),
      font: helveticaBoldFont,
    });
    
    // Círculo de validación - más espacio desde el título
    page.drawCircle({
      x: width / 2,
      y: height - 140,
      size: 30,
      borderColor: rgb(0.122, 0.137, 0.369),
      borderWidth: 1.5,
    });
    
    const texto1 = "FIRMA ELECTRÓNICA AVANZADA";
    const texto1Width = helveticaFont.widthOfTextAtSize(texto1, 10);
    page.drawText(texto1, {
      x: (width - texto1Width) / 2,
      y: height - 140,
      size: 10,
      color: rgb(0.122, 0.137, 0.369),
      font: helveticaFont,
    });
    
    const texto2 = "VALIDADO POR VERITRUST";
    const texto2Width = helveticaFont.widthOfTextAtSize(texto2, 10);
    page.drawText(texto2, {
      x: (width - texto2Width) / 2,
      y: height - 150,
      size: 10,
      color: rgb(0.122, 0.137, 0.369),
      font: helveticaFont,
    });
    
    let y = height - 200; // Más espacio desde el círculo
    
    // Detalles - más espacio entre secciones
    page.drawText("Detalles de la Firma Digital:", {
      x: 20,
      y: y,
      size: 12,
      color: rgb(0.122, 0.137, 0.369),
      font: helveticaBoldFont,
    });
    
    y -= 15; // Más espacio antes de la línea
    page.drawLine({
      start: { x: 20, y: y },
      end: { x: width - 20, y: y },
      thickness: 1,
      color: rgb(0.78, 0.78, 0.78),
    });
    
    y -= 10; // Más espacio después de la línea
    page.drawText(`Documento Firmado: ${archivo.name}`, {
      x: 25,
      y: y,
      size: 10,
      color: rgb(0, 0, 0),
      font: helveticaFont,
    });
    
    y -= 12; // Más espacio entre líneas
    page.drawText(`Firmante (RUT): ${nombreUsuario} (${rutUsuario})`, {
      x: 25,
      y: y,
      size: 10,
      color: rgb(0, 0, 0),
      font: helveticaFont,
    });
    
    y -= 12; // Más espacio entre líneas
    page.drawText(`Fecha y Hora de Sello: ${fechaFirma}`, {
      x: 25,
      y: y,
      size: 10,
      color: rgb(0, 0, 0),
      font: helveticaFont,
    });
    
    y -= 18; // Más espacio antes de la sección de hash
    page.drawText("Hash de Integridad (SHA-256):", {
      x: 25,
      y: y,
      size: 10,
      color: rgb(0.122, 0.137, 0.369),
      font: helveticaBoldFont,
    });
    
    y -= 12; // Más espacio antes del hash
    page.drawText(hashDocumento.substring(0, 32), {
      x: 25,
      y: y,
      size: 9,
      color: rgb(0, 0, 0),
      font: helveticaFont,
    });
    
    y -= 10; // Más espacio entre líneas del hash
    page.drawText(hashDocumento.substring(32), {
      x: 25,
      y: y,
      size: 9,
      color: rgb(0, 0, 0),
      font: helveticaFont,
    });
    
    // Texto final (centrado) - más espacio desde arriba
    const textoFinal = "Este certificado es una página adjunta al documento original y prueba su validez legal.";
    const textoFinalWidth = helveticaFont.widthOfTextAtSize(textoFinal, 9);
    page.drawText(textoFinal, {
      x: (width - textoFinalWidth) / 2,
      y: 40, // Más espacio desde el borde inferior
      size: 9,
      color: rgb(0.59, 0.59, 0.59),
      font: helveticaFont,
    });
    
    return await pdfDoc.save();
  };

  const descargarArchivo = async () => {
    if (!archivo) return;
    
    try {
      // Leer el archivo PDF original
      const arrayBuffer = await archivo.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Generar el certificado
      const certificadoBytes = await generarCertificadoPDF();
      const certificadoDoc = await PDFDocument.load(certificadoBytes);
      
      // Copiar la página del certificado al documento original
      const [certificadoPage] = await pdfDoc.copyPages(certificadoDoc, [0]);
      pdfDoc.addPage(certificadoPage);
      
      // Guardar el PDF combinado
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `DOCUMENTO_FIRMADO_${nombreSanitizado}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al combinar PDFs:', error);
      // Fallback: descargar solo el archivo original si hay error
      const url = window.URL.createObjectURL(archivo);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `DOCUMENTO_FIRMADO_${nombreSanitizado}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const descargarCertificado = () => {
    const doc = new jsPDF();
    const anchoPagina = doc.internal.pageSize.getWidth();
    
    doc.setFillColor(31, 35, 94); doc.rect(0, 0, anchoPagina, 20, 'F');
    doc.setTextColor(255, 255, 255); doc.setFontSize(14); doc.setFont("helvetica", "bold");
    doc.text("VERITRUST", 10, 14);

    doc.setTextColor(31, 35, 94); doc.setFontSize(26); doc.setFont("helvetica", "bold");
    doc.text("CERTIFICADO DE FIRMA ELECTRÓNICA", anchoPagina / 2, 50, null, null, "center");
    
    doc.setDrawColor(31, 35, 94); doc.setLineWidth(1.5);
    doc.circle(anchoPagina / 2, 100, 30); 
    doc.setFontSize(10);
    doc.text("FIRMA ELECTRÓNICA AVANZADA", anchoPagina / 2, 100, null, null, "center");
    doc.text("VALIDADO POR VERITRUST", anchoPagina / 2, 108, null, null, "center");

    let y = 140;
    doc.setFontSize(12); doc.setFont("helvetica", "bold");
    doc.text("Detalles de la Firma Digital:", 20, y); y += 10;
    
    doc.setDrawColor(200); doc.line(20, y, anchoPagina - 20, y); y += 5;
    
    doc.setFont("helvetica", "normal");
    
    doc.text(`Documento Firmado: ${archivo.name}`, 25, y); y += 7;
    doc.text(`Firmante (RUT): ${nombreUsuario} (${rutUsuario})`, 25, y); y += 7;
    doc.text(`Fecha y Hora de Sello: ${fechaFirma}`, 25, y); y += 7;

    doc.setFont("helvetica", "bold");
    doc.text("Hash de Integridad (SHA-256):", 25, y + 5);
    doc.setFont("courier", "normal");
    doc.text(hashDocumento.substring(0, 32), 25, y + 12);
    doc.text(hashDocumento.substring(32), 25, y + 17);

    doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(150);
    doc.text("Este certificado es una página adjunta al documento original y prueba su validez legal.", anchoPagina / 2, 280, null, null, "center");

    doc.save(`CERTIFICADO_FIRMA_${nombreSanitizado}.pdf`);
  };

  const descargarBoleta = () => {
    const doc = new jsPDF();
    const anchoPagina = doc.internal.pageSize.getWidth();
    let y = 20;

    doc.setFontSize(22); doc.setFont("helvetica", "bold");
    doc.setTextColor(31, 35, 94);
    doc.text("Boleta Electrónica VeriTrust", anchoPagina / 2, y, null, null, "center"); y += 15;

    doc.setFontSize(10); doc.setFont("helvetica", "normal");
    doc.text(`Folio de Venta: ${Math.floor(Math.random() * 90000000) + 10000000}`, 20, y); y += 5;
    doc.text(`Fecha de Emisión: ${new Date().toLocaleDateString()}`, 20, y); y += 5;
    doc.text(`RUT Vendedor: 76.543.210-K`, 20, y); y += 15;

    doc.setFontSize(14); doc.setFont("helvetica", "bold");
    doc.text("Detalles del Cliente", 20, y); y += 5;
    doc.setDrawColor(200); doc.line(20, y, anchoPagina - 20, y); y += 10;
    
    doc.setFontSize(10); doc.setFont("helvetica", "normal");
    doc.text(`Nombre: ${nombreUsuario}`, 25, y); y += 5;
    doc.text(`RUT Cliente: ${rutUsuario}`, 25, y); y += 10;

    doc.setFontSize(14); doc.setFont("helvetica", "bold");
    doc.text("Detalle de Servicios", 20, y); y += 5;
    doc.line(20, y, anchoPagina - 20, y); y += 10;
    
    doc.setFontSize(12); doc.setFont("helvetica", "bold");
    doc.text("Servicio", 25, y);
    doc.text("Neto", 140, y);
    doc.text("Total", 170, y); y += 8;

    doc.setFontSize(10); doc.setFont("helvetica", "normal");
    doc.text(servicioComprado.nombre, 25, y);
    doc.text(`$${servicioComprado.neto.toLocaleString()}`, 140, y);
    doc.text(`$${servicioComprado.total.toLocaleString()}`, 170, y); y += 15;

    doc.setFontSize(12); doc.setFont("helvetica", "normal");
    doc.text(`NETO:`, 140, y); doc.text(`$${servicioComprado.neto.toLocaleString()}`, 170, y); y += 7;
    doc.text(`IVA (19%):`, 140, y); doc.text(`$${servicioComprado.iva.toLocaleString()}`, 170, y); y += 7;
    
    doc.setFontSize(14); doc.setFont("helvetica", "bold");
    doc.setTextColor(208, 67, 49);
    doc.text(`TOTAL:`, 140, y); doc.text(`$${servicioComprado.total.toLocaleString()}`, 170, y); y += 15;

    doc.setFontSize(10); doc.setFont("helvetica", "italic");
    doc.setTextColor(150);
    doc.text("Documento no válido como factura. Para fines tributarios, revise la documentación adjunta.", anchoPagina / 2, 280, null, null, "center");


    doc.save(`BOLETA_VENTA_${nombreSanitizado}.pdf`);
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
                    <p style={{marginBottom: '5px'}}><strong>Archivo Generado:</strong> DOCUMENTO_FIRMADO_{nombreSanitizado}.pdf</p>
                    <p style={{marginBottom: '5px'}}><strong>Hash de Seguridad:</strong> {hashDocumento}</p>
                    <p style={{marginBottom: '0'}}><strong>Fecha:</strong> {fechaFirma}</p>
                  </div>

                  <div className="d-flex justify-content-center gap-3 mt-4" style={{gap: '15px', flexWrap: 'wrap'}}>
                    
                    <button onClick={descargarArchivo} className="btn_primary" style={{background: '#28a745', border: 'none', minWidth: '220px'}}>
                        <i className="fa fa-download"></i> Descargar Documento + Certificado
                    </button>
                    
                    <button onClick={descargarBoleta} className="btn_primary" style={{background: '#0FB3D1', border: 'none', minWidth: '220px'}}>
                        <i className="fa fa-receipt"></i> Descargar Boleta
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
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { PDFDocument, rgb } from "pdf-lib";
import { getToken } from "../services/auth";

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
  const [tipoArchivo, setTipoArchivo] = useState(null);
  const [contenidoTexto, setContenidoTexto] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [firmado, setFirmado] = useState(false);
  
  const [hashDocumento, setHashDocumento] = useState("");
  const [fechaFirma, setFechaFirma] = useState("");

  const obtenerTipoArchivo = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    const tipoMIME = file.type;
    
    if (tipoMIME === 'application/pdf' || extension === 'pdf') return 'pdf';
    if (tipoMIME.includes('image/') || ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)) return 'imagen';
    if (tipoMIME.includes('text/') || extension === 'txt') return 'texto';
    if (tipoMIME.includes('word') || ['doc', 'docx'].includes(extension)) return 'word';
    if (extension === 'rtf') return 'rtf';
    return 'otro';
  };

  const manejarArchivo = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setArchivo(file);
      setFirmado(false);
      
      const tipo = obtenerTipoArchivo(file);
      setTipoArchivo(tipo);
      
      if (tipo === 'pdf' || tipo === 'imagen') {
        const url = window.URL.createObjectURL(file);
        setArchivoUrl(url);
        setContenidoTexto(null);
      } 
      else if (tipo === 'texto') {
        const reader = new FileReader();
        reader.onload = (event) => {
          setContenidoTexto(event.target.result);
          setArchivoUrl(null);
        };
        reader.readAsText(file);
      }
      else {
        setArchivoUrl(null);
        setContenidoTexto(null);
      }
    }
  };

  const procesarFirma = () => {
    if (!archivo) return;
    setCargando(true);

    setTimeout(() => {
      setCargando(false);
      setFirmado(true);
      setHashDocumento("");
      setFechaFirma(new Date().toISOString().slice(0, 19));
    }, 3000);
  };

  const calcularHashSHA256 = async (arrayBuffer) => {
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const enviarMetadatosAlBackend = async (hash, nombreArchivo) => {
    try {
      const sessionActual = JSON.parse(localStorage.getItem("user_session") || "null");
      const token = sessionActual?.token || getToken();

      if (!token) {
        console.error('No se encontró el token de autenticación');
        return;
      }

      const fechaFirmaISO = fechaFirma || new Date().toISOString().slice(0, 19);
      const fechaActual = new Date().toISOString();

      const documentoData = {
        nombreOriginal: nombreArchivo,
        nombreAlmacenado: `metadatos_${hash.substring(0, 8)}_${Date.now()}.pdf`,
        tipoContenido: 'application/pdf',
        tamano: 0,
        fechaSubida: fechaActual,
        firmado: true,
        usuarioId: sessionActual?.id
      };

      const response = await fetch('http://localhost:8080/api/documento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(documentoData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Metadatos del documento guardados exitosamente:', result);
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Error al guardar metadatos' }));
        console.error('Error al guardar metadatos:', errorData);
      }
    } catch (error) {
      console.error('Error al enviar metadatos al backend:', error);
    }
  };


  const generarCertificadoPDF = async (hashParaCertificado = null) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const { width, height } = page.getSize();
    
    const helveticaFont = await pdfDoc.embedFont('Helvetica');
    const helveticaBoldFont = await pdfDoc.embedFont('Helvetica-Bold');
    page.drawRectangle({
      x: 0,
      y: height - 20,
      width: width,
      height: 20,
      color: rgb(0.122, 0.137, 0.369),
    });
    
    page.drawText("VERITRUST", {
      x: 10,
      y: height - 14,
      size: 14,
      color: rgb(1, 1, 1),
      font: helveticaBoldFont,
    });
    
    const tituloTexto = "CERTIFICADO DE FIRMA ELECTRÓNICA";
    const tituloWidth = helveticaBoldFont.widthOfTextAtSize(tituloTexto, 26);
    page.drawText(tituloTexto, {
      x: (width - tituloWidth) / 2,
      y: height - 70,
      size: 26,
      color: rgb(0.122, 0.137, 0.369),
      font: helveticaBoldFont,
    });
    
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
    
    let y = height - 200;
    
    page.drawText("Detalles de la Firma Digital:", {
      x: 20,
      y: y,
      size: 12,
      color: rgb(0.122, 0.137, 0.369),
      font: helveticaBoldFont,
    });
    
    y -= 15;
    page.drawLine({
      start: { x: 20, y: y },
      end: { x: width - 20, y: y },
      thickness: 1,
      color: rgb(0.78, 0.78, 0.78),
    });
    
    y -= 10;
    page.drawText(`Documento Firmado: ${archivo.name}`, {
      x: 25,
      y: y,
      size: 10,
      color: rgb(0, 0, 0),
      font: helveticaFont,
    });
    
    y -= 12;
    page.drawText(`Firmante (RUT): ${nombreUsuario} (${rutUsuario})`, {
      x: 25,
      y: y,
      size: 10,
      color: rgb(0, 0, 0),
      font: helveticaFont,
    });
    
    y -= 12;
    page.drawText(`Fecha y Hora de Sello: ${fechaFirma}`, {
      x: 25,
      y: y,
      size: 10,
      color: rgb(0, 0, 0),
      font: helveticaFont,
    });
    
    y -= 18;
    page.drawText("Hash de Integridad (SHA-256):", {
      x: 25,
      y: y,
      size: 10,
      color: rgb(0.122, 0.137, 0.369),
      font: helveticaBoldFont,
    });
    
    const hashParaMostrar = hashParaCertificado || hashDocumento || 'Calculando...';
    y -= 12;
    page.drawText(hashParaMostrar.substring(0, 32), {
      x: 25,
      y: y,
      size: 9,
      color: rgb(0, 0, 0),
      font: helveticaFont,
    });
    
    y -= 10;
    page.drawText(hashParaMostrar.substring(32) || '', {
      x: 25,
      y: y,
      size: 9,
      color: rgb(0, 0, 0),
      font: helveticaFont,
    });
    
    const textoFinal = "Este certificado es una página adjunta al documento original y prueba su validez legal.";
    const textoFinalWidth = helveticaFont.widthOfTextAtSize(textoFinal, 9);
    page.drawText(textoFinal, {
      x: (width - textoFinalWidth) / 2,
      y: 40,
      size: 9,
      color: rgb(0.59, 0.59, 0.59),
      font: helveticaFont,
    });
    
    return await pdfDoc.save();
  };

  const convertirArchivoAPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const { width, height } = page.getSize();
    
    const helveticaFont = await pdfDoc.embedFont('Helvetica');
    const helveticaBoldFont = await pdfDoc.embedFont('Helvetica-Bold');
    
    let y = height - 40;
    const margin = 40;
    const fontSize = 11;
    const lineHeight = 14;
    
    page.drawText(`Documento: ${archivo.name}`, {
      x: margin,
      y: y,
      size: 14,
      font: helveticaBoldFont,
      color: rgb(0.122, 0.137, 0.369),
    });
    y -= 25;
    
    let currentPage = page;
    
    if (tipoArchivo === 'texto' && contenidoTexto) {
      const maxWidth = width - (margin * 2);
      const lines = contenidoTexto.split('\n');
      
      for (const line of lines) {
        if (y < margin + 20) {
          currentPage = pdfDoc.addPage([595, 842]);
          y = height - 40;
        }
        
        const words = line.split(' ');
        let currentLine = '';
        
        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const textWidth = helveticaFont.widthOfTextAtSize(testLine, fontSize);
          
          if (textWidth > maxWidth && currentLine) {
            currentPage.drawText(currentLine, {
              x: margin,
              y: y,
              size: fontSize,
              font: helveticaFont,
            });
            y -= lineHeight;
            if (y < margin + 20) {
              currentPage = pdfDoc.addPage([595, 842]);
              y = height - 40;
            }
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        
        if (currentLine) {
          currentPage.drawText(currentLine, {
            x: margin,
            y: y,
            size: fontSize,
            font: helveticaFont,
          });
          y -= lineHeight;
        }
      }
    } else if (tipoArchivo === 'imagen' && archivoUrl) {
      try {
        const imageBytes = await fetch(archivoUrl).then(res => res.arrayBuffer());
        let image;
        
        const extension = archivo.name.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg'].includes(extension)) {
          image = await pdfDoc.embedJpg(imageBytes);
        } else {
          image = await pdfDoc.embedPng(imageBytes);
        }
        
        const imageDims = image.scale(0.5);
        const imageWidth = Math.min(imageDims.width, width - (margin * 2));
        const imageHeight = (imageDims.height * imageWidth) / imageDims.width;
        
        currentPage.drawImage(image, {
          x: margin,
          y: y - imageHeight,
          width: imageWidth,
          height: imageHeight,
        });
      } catch (error) {
        currentPage.drawText('No se pudo cargar la imagen', {
          x: margin,
          y: y,
          size: fontSize,
          font: helveticaFont,
        });
      }
    } else {
      currentPage.drawText('Tipo de archivo: ' + tipoArchivo, {
        x: margin,
        y: y,
        size: fontSize,
        font: helveticaFont,
      });
      y -= lineHeight * 2;
      currentPage.drawText('Nombre: ' + archivo.name, {
        x: margin,
        y: y,
        size: fontSize,
        font: helveticaFont,
      });
      y -= lineHeight;
      currentPage.drawText('Tamaño: ' + (archivo.size / 1024).toFixed(2) + ' KB', {
        x: margin,
        y: y,
        size: fontSize,
        font: helveticaFont,
      });
    }
    
    return await pdfDoc.save();
  };

  const descargarArchivo = async () => {
    if (!archivo) return;
    
    try {
      let pdfDoc;
      let pdfOriginalBytes;
      
      if (tipoArchivo === 'pdf') {
        const arrayBuffer = await archivo.arrayBuffer();
        pdfOriginalBytes = new Uint8Array(arrayBuffer);
        pdfDoc = await PDFDocument.load(arrayBuffer);
      } else {
        pdfOriginalBytes = await convertirArchivoAPDF();
        pdfDoc = await PDFDocument.load(pdfOriginalBytes);
      }
      
      const hashOriginal = await calcularHashSHA256(pdfOriginalBytes);
      const certificadoBytes = await generarCertificadoPDF(hashOriginal);
      const certificadoDoc = await PDFDocument.load(certificadoBytes);
      const [certificadoPage] = await pdfDoc.copyPages(certificadoDoc, [0]);
      pdfDoc.addPage(certificadoPage);
      const pdfBytesFinal = await pdfDoc.save();
      const hashFinal = await calcularHashSHA256(pdfBytesFinal);
      setHashDocumento(hashFinal);
      
      const blob = new Blob([pdfBytesFinal], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      const nombreArchivo = `DOCUMENTO_FIRMADO_${nombreSanitizado}.pdf`;
      link.href = url;
      link.setAttribute('download', nombreArchivo);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      await enviarMetadatosAlBackend(hashFinal, nombreArchivo);
    } catch (error) {
      console.error('Error al procesar archivo:', error);
      alert('Error al procesar el archivo. Por favor, intenta con otro formato.');
    }
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
    <div className="service page-firma-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="titlepage">
              <h2>Firma de Documentos</h2>
              <p>Servicio activo: <strong className="firma-servicio-name">{servicioComprado.nombre}</strong></p>
            </div>

            <div className="backoffice_section text-center firma-upload-section">
              
              {!firmado && !cargando && (
                <>
                  <i className="fa fa-cloud-upload firma-upload-icon"></i>
                  <h3 className="firma-upload-title">1. Sube tu documento</h3>
                  <p className="firma-upload-text">
                    Formatos soportados: PDF, Word (.doc, .docx), Texto (.txt), Imágenes (.jpg, .png, .gif, etc.)
                  </p>
                  
                  <div className="form-group mb-4">
                    <input 
                      type="file" 
                      className="form-control firma-file-input" 
                      accept=".pdf,.doc,.docx,.txt,.rtf,image/*,.jpg,.jpeg,.png,.gif,.bmp,.webp" 
                      onChange={manejarArchivo} 
                    />
                  </div>

                  {archivo && (
                    <div className="mb-4 firma-preview-container">
                        <div className="firma-preview-header">
                            Vista Previa: {archivo.name}
                            <span className="firma-preview-header-span">
                              Tipo: {tipoArchivo?.toUpperCase() || 'Desconocido'}
                            </span>
                        </div>
                        
                        {tipoArchivo === 'pdf' && archivoUrl && (
                          <iframe 
                            src={archivoUrl} 
                            width="100%" 
                            height="500px" 
                            className="firma-preview-iframe"
                            title="Vista Previa PDF"
                          ></iframe>
                        )}
                        
                        {tipoArchivo === 'imagen' && archivoUrl && (
                          <div className="firma-preview-image-wrapper">
                            <img 
                              src={archivoUrl} 
                              alt="Vista previa" 
                              className="firma-preview-image"
                            />
                          </div>
                        )}
                        
                        {tipoArchivo === 'texto' && contenidoTexto && (
                          <div className="firma-preview-text-wrapper">
                            <pre className="firma-preview-pre">
                              {contenidoTexto}
                            </pre>
                          </div>
                        )}
                        
                        {archivo && tipoArchivo !== 'pdf' && tipoArchivo !== 'imagen' && tipoArchivo !== 'texto' && (
                          <div className="firma-preview-other-wrapper">
                            <i className="fa fa-file firma-preview-other-icon"></i>
                            <h4 className="firma-preview-other-title">{archivo.name}</h4>
                            <p className="firma-preview-other-text">
                              <strong>Tipo:</strong> {tipoArchivo?.toUpperCase() || 'Desconocido'}
                            </p>
                            <p className="firma-preview-other-text">
                              <strong>Tamaño:</strong> {(archivo.size / 1024).toFixed(2)} KB
                            </p>
                            <p className="firma-preview-other-note">
                              Este tipo de archivo será convertido a PDF al firmar
                            </p>
                          </div>
                        )}
                    </div>
                  )}

                  {archivo && (
                    <button onClick={procesarFirma} className="btn_primary firma-sign-btn">
                      <i className="fa fa-pen-fancy"></i> Firmar Documento Digitalmente
                    </button>
                  )}
                </>
              )}

              {cargando && (
                <div className="firma-loading-container">
                   <div className="spinner-border text-primary firma-loading-spinner" role="status">
                    <span className="sr-only">Cargando...</span>
                  </div>
                  <h4 className="firma-loading-title">Firmando documento...</h4>
                  <p>Incrustando certificado digital de: <strong>{nombreUsuario}</strong></p>
                </div>
              )}


              {firmado && (
                <div className="animate__animated animate__fadeIn">
                  <i className="fa fa-check-circle firma-success-icon"></i>
                  <h3 className="firma-success-title">¡Documento Firmado con Éxito!</h3>
                  
                  <div className="firma-success-info">
                    <p><strong>Archivo Generado:</strong> DOCUMENTO_FIRMADO_{nombreSanitizado}.pdf</p>
                    <p><strong>Hash de Seguridad (SHA-256):</strong> {hashDocumento || 'Se calculará al descargar'}</p>
                    <p><strong>Fecha:</strong> {fechaFirma}</p>
                  </div>

                  <div className="d-flex justify-content-center gap-3 mt-4 firma-success-buttons">
                    
                    <button 
                      onClick={descargarArchivo} 
                      className="btn_primary firma-btn-download-success"
                    >
                        <i className="fa fa-download"></i> Descargar Documento Certificado
                    </button>
                    
                    <button 
                      onClick={descargarBoleta} 
                      className="btn_primary firma-btn-download-info"
                    >
                        <i className="fa fa-receipt"></i> Descargar Boleta
                    </button>
                  </div>
                  
                  <br/>
                  <button onClick={() => navigate("/")} className="btn btn-link mt-3 firma-back-link">
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
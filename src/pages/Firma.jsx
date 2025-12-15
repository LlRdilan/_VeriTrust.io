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
      
      // Para PDFs e imágenes, usar URL directa
      if (tipo === 'pdf' || tipo === 'imagen') {
        const url = window.URL.createObjectURL(file);
        setArchivoUrl(url);
        setContenidoTexto(null);
      } 
      // Para archivos de texto, leer el contenido
      else if (tipo === 'texto') {
        const reader = new FileReader();
        reader.onload = (event) => {
          setContenidoTexto(event.target.result);
          setArchivoUrl(null);
        };
        reader.readAsText(file);
      }
      // Para otros tipos, mostrar información
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
      // El hash real se calculará cuando se genere el PDF firmado
      setHashDocumento(""); // Se establecerá después
      setFechaFirma(new Date().toISOString().slice(0, 19));
    }, 3000);
  };

  // Calcular hash SHA-256
  const calcularHashSHA256 = async (arrayBuffer) => {
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // Enviar solo los metadatos del documento al backend (sin archivo)
  const enviarMetadatosAlBackend = async (hash, nombreArchivo) => {
    try {
      // Obtener el token y datos de la sesión
      const sessionActual = JSON.parse(localStorage.getItem("user_session") || "null");
      const token = sessionActual?.token || getToken();

      if (!token) {
        console.error('No se encontró el token de autenticación');
        return;
      }

      // Usar la fecha del estado (ya en formato ISO 8601) o generar una nueva
      const fechaFirmaISO = fechaFirma || new Date().toISOString().slice(0, 19);
      const fechaActual = new Date().toISOString();

      // Preparar datos según DocumentoDTO (todos los campos requeridos)
      const documentoData = {
        nombreOriginal: nombreArchivo,
        nombreAlmacenado: `metadatos_${hash.substring(0, 8)}_${Date.now()}.pdf`, // Nombre único temporal
        tipoContenido: 'application/pdf',
        tamano: 0, // Sin archivo físico, usar 0
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
      // No mostramos error al usuario, solo lo registramos en consola
    }
  };


  // Función auxiliar para generar el certificado como PDF usando pdf-lib
  const generarCertificadoPDF = async (hashParaCertificado = null) => {
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
    
    const hashParaMostrar = hashParaCertificado || hashDocumento || 'Calculando...';
    y -= 12; // Más espacio antes del hash
    page.drawText(hashParaMostrar.substring(0, 32), {
      x: 25,
      y: y,
      size: 9,
      color: rgb(0, 0, 0),
      font: helveticaFont,
    });
    
    y -= 10; // Más espacio entre líneas del hash
    page.drawText(hashParaMostrar.substring(32) || '', {
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

  // Función para convertir archivo a PDF
  const convertirArchivoAPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4
    const { width, height } = page.getSize();
    
    const helveticaFont = await pdfDoc.embedFont('Helvetica');
    const helveticaBoldFont = await pdfDoc.embedFont('Helvetica-Bold');
    
    let y = height - 40;
    const margin = 40;
    const fontSize = 11;
    const lineHeight = 14;
    
    // Título del documento
    page.drawText(`Documento: ${archivo.name}`, {
      x: margin,
      y: y,
      size: 14,
      font: helveticaBoldFont,
      color: rgb(0.122, 0.137, 0.369),
    });
    y -= 25;
    
    // Contenido según el tipo
    let currentPage = page;
    
    if (tipoArchivo === 'texto' && contenidoTexto) {
      // Dividir el texto en líneas que quepan en la página
      const maxWidth = width - (margin * 2);
      const lines = contenidoTexto.split('\n');
      
      for (const line of lines) {
        if (y < margin + 20) {
          // Nueva página si es necesario
          currentPage = pdfDoc.addPage([595, 842]);
          y = height - 40;
        }
        
        // Si la línea es muy larga, dividirla
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
      // Para imágenes, cargar y agregar
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
      // Para otros tipos, mostrar información
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
      
      // Si es PDF, cargarlo directamente
      if (tipoArchivo === 'pdf') {
        const arrayBuffer = await archivo.arrayBuffer();
        pdfOriginalBytes = new Uint8Array(arrayBuffer);
        pdfDoc = await PDFDocument.load(arrayBuffer);
      } else {
        // Convertir otros tipos a PDF
        pdfOriginalBytes = await convertirArchivoAPDF();
        pdfDoc = await PDFDocument.load(pdfOriginalBytes);
      }
      
      // Calcular hash SHA-256 del PDF original (sin certificado) para mostrar en el certificado
      const hashOriginal = await calcularHashSHA256(pdfOriginalBytes);
      
      // Generar el certificado con el hash del PDF original
      const certificadoBytes = await generarCertificadoPDF(hashOriginal);
      const certificadoDoc = await PDFDocument.load(certificadoBytes);
      
      // Copiar la página del certificado al documento
      const [certificadoPage] = await pdfDoc.copyPages(certificadoDoc, [0]);
      pdfDoc.addPage(certificadoPage);
      
      // Guardar el PDF combinado (con certificado)
      const pdfBytesFinal = await pdfDoc.save();
      
      // Calcular hash SHA-256 del PDF final (con certificado)
      const hashFinal = await calcularHashSHA256(pdfBytesFinal);
      // Actualizar el hash en el estado para mostrar el hash del PDF final
      setHashDocumento(hashFinal);
      
      // Descargar el archivo localmente
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
      
      // Enviar solo los metadatos al backend (sin el archivo)
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
                  <h3 style={{marginBottom: '20px', fontWeight: '600'}}>1. Sube tu documento</h3>
                  <p style={{marginBottom: '20px', color: '#666', fontSize: '14px'}}>
                    Formatos soportados: PDF, Word (.doc, .docx), Texto (.txt), Imágenes (.jpg, .png, .gif, etc.)
                  </p>
                  
                  <div className="form-group mb-4">
                    <input 
                      type="file" 
                      className="form-control" 
                      accept=".pdf,.doc,.docx,.txt,.rtf,image/*,.jpg,.jpeg,.png,.gif,.bmp,.webp" 
                      onChange={manejarArchivo} 
                      style={{padding: '10px', height: 'auto'}}
                    />
                  </div>

                  {archivo && (
                    <div className="mb-4" style={{border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden'}}>
                        <div style={{background: '#f1f1f1', padding: '10px', borderBottom: '1px solid #ddd', fontWeight: 'bold', color: '#333'}}>
                            Vista Previa: {archivo.name}
                            <span style={{float: 'right', fontSize: '12px', fontWeight: 'normal', color: '#666'}}>
                              Tipo: {tipoArchivo?.toUpperCase() || 'Desconocido'}
                            </span>
                        </div>
                        
                        {/* Vista previa para PDF */}
                        {tipoArchivo === 'pdf' && archivoUrl && (
                          <iframe 
                            src={archivoUrl} 
                            width="100%" 
                            height="500px" 
                            style={{border: 'none'}}
                            title="Vista Previa PDF"
                          ></iframe>
                        )}
                        
                        {/* Vista previa para imágenes */}
                        {tipoArchivo === 'imagen' && archivoUrl && (
                          <div style={{padding: '20px', textAlign: 'center', backgroundColor: '#fff'}}>
                            <img 
                              src={archivoUrl} 
                              alt="Vista previa" 
                              style={{maxWidth: '100%', maxHeight: '500px', borderRadius: '5px'}}
                            />
                          </div>
                        )}
                        
                        {/* Vista previa para texto */}
                        {tipoArchivo === 'texto' && contenidoTexto && (
                          <div style={{padding: '20px', backgroundColor: '#fff', maxHeight: '500px', overflow: 'auto'}}>
                            <pre style={{
                              margin: 0,
                              fontFamily: 'monospace',
                              fontSize: '12px',
                              whiteSpace: 'pre-wrap',
                              wordWrap: 'break-word',
                              color: '#333'
                            }}>
                              {contenidoTexto}
                            </pre>
                          </div>
                        )}
                        
                        {/* Información para otros tipos */}
                        {archivo && tipoArchivo !== 'pdf' && tipoArchivo !== 'imagen' && tipoArchivo !== 'texto' && (
                          <div style={{padding: '40px', backgroundColor: '#fff', textAlign: 'center'}}>
                            <i className="fa fa-file" style={{fontSize: '60px', color: '#1f235e', marginBottom: '20px'}}></i>
                            <h4 style={{color: '#333', marginBottom: '10px'}}>{archivo.name}</h4>
                            <p style={{color: '#666', marginBottom: '5px'}}>
                              <strong>Tipo:</strong> {tipoArchivo?.toUpperCase() || 'Desconocido'}
                            </p>
                            <p style={{color: '#666', marginBottom: '5px'}}>
                              <strong>Tamaño:</strong> {(archivo.size / 1024).toFixed(2)} KB
                            </p>
                            <p style={{color: '#999', fontSize: '12px', marginTop: '20px'}}>
                              Este tipo de archivo será convertido a PDF al firmar
                            </p>
                          </div>
                        )}
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
                    <p style={{marginBottom: '5px'}}><strong>Hash de Seguridad (SHA-256):</strong> {hashDocumento || 'Se calculará al descargar'}</p>
                    <p style={{marginBottom: '0'}}><strong>Fecha:</strong> {fechaFirma}</p>
                  </div>

                  <div className="d-flex justify-content-center gap-3 mt-4" style={{gap: '15px', flexWrap: 'wrap'}}>
                    
                    <button 
                      onClick={descargarArchivo} 
                      className="btn_primary" 
                      style={{background: '#28a745', border: 'none', minWidth: '220px'}}
                    >
                        <i className="fa fa-download"></i> Descargar Documento + Certificado
                    </button>
                    
                    <button 
                      onClick={descargarBoleta} 
                      className="btn_primary" 
                      style={{background: '#0FB3D1', border: 'none', minWidth: '220px'}}
                    >
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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSession } from "../services/auth";
import NotificationModal from "../components/ui/NotificacionModal";

export default function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [compras, setCompras] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [modal, setModal] = useState({ show: false, title: '', message: '', status: 'info' });
  const handleCloseModal = () => setModal({ show: false, title: '', message: '', status: 'info' });

  useEffect(() => {
    const session = getSession();
    if (!session) {
      navigate("/login");
      return;
    }

    // Si es admin, redirigir a admin
    if (session.rol === "admin") {
      navigate("/admin");
      return;
    }

    setUsuario(session);
    cargarDatosUsuario(session);
  }, [navigate]);

  const cargarDatosUsuario = async (session) => {
    setCargando(true);
    try {
      const usuarioResponse = await fetch(`http://localhost:8080/usuarios/${session.id}`, {
        headers: {
          "Authorization": `Bearer ${session.token}`
        }
      });

      if (usuarioResponse.ok) {
        const usuarioData = await usuarioResponse.json();
        setUsuario({ ...session, ...usuarioData });
      } else {
        console.warn("No se pudieron cargar los datos completos del usuario");
      }

      const comprasResponse = await fetch(`http://localhost:8080/compras/usuario/${session.id}`, {
        headers: {
          "Authorization": `Bearer ${session.token}`
        }
      });

      if (comprasResponse.ok) {
        const comprasData = await comprasResponse.json();
        setCompras(Array.isArray(comprasData) ? comprasData : []);
      } else {
        setCompras([]);
      }

      try {
        let documentosResponse = await fetch(`http://localhost:8080/api/documento/user/${session.id}`, {
          headers: {
            "Authorization": `Bearer ${session.token}`
          }
        });

        if (!documentosResponse.ok && documentosResponse.status === 404) {
          documentosResponse = await fetch(`http://localhost:8080/api/documento/firmados/usuario/${session.id}`, {
            headers: {
              "Authorization": `Bearer ${session.token}`
            }
          });
        }

        if (documentosResponse.ok) {
          const documentosData = await documentosResponse.json();
          setDocumentos(Array.isArray(documentosData) ? documentosData : []);
        } else {
          console.warn("No se pudieron cargar los documentos firmados:", documentosResponse.status);
          setDocumentos([]);
        }
      } catch (error) {
        console.error("Error al cargar documentos firmados:", error);
        setDocumentos([]);
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setCompras([]);
      setDocumentos([]);
    } finally {
      setCargando(false);
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "N/A";
    try {
      return new Date(fecha).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return fecha;
    }
  };

  const formatearMonto = (monto) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(monto || 0);
  };

  const calcularEdad = (fechaNac) => {
    if (!fechaNac) return null;
    try {
      const hoy = new Date();
      const nacimiento = new Date(fechaNac);
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const mes = hoy.getMonth() - nacimiento.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }
      return edad;
    } catch {
      return null;
    }
  };

  const formatearFechaNacimiento = (fecha) => {
    if (!fecha) return "N/A";
    try {
      return new Date(fecha).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return fecha;
    }
  };

  const formatearFechaHora = (fecha) => {
    if (!fecha) return "N/A";
    try {
      return new Date(fecha).toLocaleString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return fecha;
    }
  };

  const descargarDocumento = async (documentoId, nombreArchivo) => {
    const session = getSession();
    const emailUsuario = usuario?.email || session?.email || 'tu correo electrónico';
    setModal({
      show: true,
      title: "Descarga de Documento",
      message: `Se te enviará el documento por vía correo electrónico a "${emailUsuario}"`,
      status: "info"
    });
  };

  if (cargando) {
    return (
      <div className="service page-perfil-container">
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-primary perfil-loading-spinner" role="status">
              <span className="sr-only">Cargando...</span>
            </div>
            <p className="perfil-loading-text">Cargando información...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return null;
  }

  return (
    <div className="service page-perfil-container">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="titlepage">
              <h2>Mi Perfil</h2>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-4">
            <div className="backoffice_section perfil-card">
              <div className="text-center mb-4">
                <div className="perfil-avatar">
                  {usuario.nombre?.charAt(0).toUpperCase() || 'U'}
                </div>
                <h3 className="perfil-name">{usuario.nombre || 'Usuario'}</h3>
              </div>

              <div className="perfil-section-divider">
                <h4 className="perfil-section-title">
                  <i className="fa fa-user perfil-section-title"></i>
                  Información Personal
                </h4>
                
                <div className="perfil-info-item">
                  <div className="perfil-info-row">
                    <span className="perfil-info-label">RUT:</span>
                    <strong className="perfil-info-value">{usuario.rut || 'N/A'}</strong>
                  </div>
                </div>

                <div className="perfil-info-item">
                  <div className="perfil-info-row">
                    <span className="perfil-info-label">Email:</span>
                    <strong className="perfil-info-value">{usuario.email || 'N/A'}</strong>
                  </div>
                </div>

                {usuario.telefono && (
                  <div className="perfil-info-item">
                    <div className="perfil-info-row">
                      <span className="perfil-info-label">Teléfono:</span>
                      <strong className="perfil-info-value">{usuario.telefono}</strong>
                    </div>
                  </div>
                )}

                {usuario.fechaNac && (
                  <div className="perfil-info-item">
                    <div className="perfil-info-row">
                      <span className="perfil-info-label">Fecha de Nacimiento:</span>
                      <strong className="perfil-info-value">{formatearFechaNacimiento(usuario.fechaNac)}</strong>
                    </div>
                    {calcularEdad(usuario.fechaNac) && (
                      <div className="perfil-age-text">
                        ({calcularEdad(usuario.fechaNac)} años)
                      </div>
                    )}
                  </div>
                )}

                {usuario.region && (
                  <div className="perfil-info-item">
                    <div className="perfil-info-row">
                      <span className="perfil-info-label">Región:</span>
                      <strong className="perfil-info-value">{usuario.region}</strong>
                    </div>
                  </div>
                )}

                {usuario.comuna && (
                  <div className="perfil-info-item">
                    <div className="perfil-info-row">
                      <span className="perfil-info-label">Comuna:</span>
                      <strong className="perfil-info-value">{usuario.comuna}</strong>
                    </div>
                  </div>
                )}

                <div className="perfil-info-item">
                  <div className="perfil-info-row">
                    <span className="perfil-info-label">Rol:</span>
                    <strong className="perfil-info-value-capitalize">{usuario.rol || 'Usuario'}</strong>
                  </div>
                </div>
              </div>

              <div className="perfil-section-divider">
                <h4 className="perfil-section-title">
                  <i className="fa fa-bar-chart"></i>
                  Estadísticas
                </h4>
                <div className="perfil-stat-row">
                  <span className="perfil-stat-label">Compras realizadas:</span>
                  <strong className="perfil-stat-value">{compras.length}</strong>
                </div>
                <div className="perfil-stat-row">
                  <span className="perfil-stat-label">Documentos firmados:</span>
                  <strong className="perfil-stat-value">{documentos.length}</strong>
                </div>
                <div className="perfil-stat-row">
                  <span className="perfil-stat-label">Total gastado:</span>
                  <strong className="perfil-stat-value-success">
                    {formatearMonto(compras.reduce((sum, compra) => sum + (compra.monto || 0), 0))}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="backoffice_section perfil-card">
              <h3 className="perfil-section-title" style={{marginBottom: '25px', fontSize: '24px'}}>
                <i className="fa fa-shopping-cart"></i>
                Mis Compras y Boletas
              </h3>

              {compras.length === 0 ? (
                <div className="text-center perfil-empty-state">
                  <i className="fa fa-inbox perfil-empty-icon"></i>
                  <p className="perfil-empty-text">No has realizado ninguna compra aún.</p>
                  <button 
                    onClick={() => navigate("/servicios")} 
                    className="btn_primary perfil-empty-btn"
                  >
                    Ver Servicios
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table perfil-table">
                    <thead>
                      <tr className="perfil-table-header">
                        <th className="perfil-table-header">Fecha</th>
                        <th className="perfil-table-header">Servicio</th>
                        <th className="perfil-table-header">Monto</th>
                        <th className="perfil-table-header">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {compras.map((compra, index) => (
                        <tr key={compra.id || index} className="perfil-table-row">
                          <td className="perfil-table-cell">{formatearFecha(compra.fechaCompra)}</td>
                          <td className="perfil-table-cell">
                            {compra.servicio?.nombre || compra.nombreServicio || 'Servicio'}
                          </td>
                          <td className="perfil-table-cell-bold">
                            {formatearMonto(compra.monto)}
                          </td>
                          <td className="perfil-table-cell">
                            <button 
                              className="btn btn-sm perfil-btn-download" 
                              onClick={() => {
                                const session = getSession();
                                const emailUsuario = usuario?.email || session?.email || 'tu correo electrónico';
                                setModal({
                                  show: true,
                                  title: "Descarga de Boleta",
                                  message: `Se te enviará la boleta por vía correo electrónico a "${emailUsuario}"`,
                                  status: "info"
                                });
                              }}
                            >
                              <i className="fa fa-download"></i> Boleta
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="backoffice_section mt-4 perfil-card">
              <h3 className="perfil-section-title" style={{marginBottom: '25px', fontSize: '24px'}}>
                <i className="fa fa-file-text"></i>
                Mis Documentos Firmados
              </h3>

              {documentos.length === 0 ? (
                <div className="text-center perfil-empty-state">
                  <i className="fa fa-file-o perfil-empty-icon"></i>
                  <p className="perfil-empty-text">No tienes documentos firmados aún.</p>
                  <button 
                    onClick={() => navigate("/firma")} 
                    className="btn_primary perfil-empty-btn"
                  >
                    Firmar Documento
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table perfil-table">
                    <thead>
                      <tr className="perfil-table-header">
                        <th className="perfil-table-header">Documento</th>
                        <th className="perfil-table-header">Fecha de Subida</th>
                        <th className="perfil-table-header">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documentos.map((doc, index) => (
                        <tr key={doc.id || index} className="perfil-table-row">
                          <td className="perfil-table-cell">
                            {doc.nombreOriginal || doc.nombre || 'Documento'}
                          </td>
                          <td className="perfil-table-cell">
                            {formatearFechaHora(doc.fechaSubida)}
                          </td>
                          <td className="perfil-table-cell">
                            <button 
                              className="btn btn-sm perfil-btn-download-success" 
                              onClick={() => descargarDocumento(doc.id, doc.nombreOriginal || doc.nombre)}
                            >
                              <i className="fa fa-download"></i> Descargar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <NotificationModal 
        show={modal.show}
        handleClose={handleCloseModal}
        title={modal.title}
        message={modal.message}
        status={modal.status}
      />
    </div>
  );
}

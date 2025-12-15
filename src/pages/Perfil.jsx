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
      // Cargar datos completos del usuario desde el backend
      const usuarioResponse = await fetch(`http://localhost:8080/usuarios/${session.id}`, {
        headers: {
          "Authorization": `Bearer ${session.token}`
        }
      });

      if (usuarioResponse.ok) {
        const usuarioData = await usuarioResponse.json();
        // Combinar datos de la sesión con los datos completos del backend
        setUsuario({ ...session, ...usuarioData });
      } else {
        // Si no se pueden cargar los datos completos, usar los de la sesión
        console.warn("No se pudieron cargar los datos completos del usuario");
      }

      // Cargar compras del usuario
      const comprasResponse = await fetch(`http://localhost:8080/compras/usuario/${session.id}`, {
        headers: {
          "Authorization": `Bearer ${session.token}`
        }
      });

      if (comprasResponse.ok) {
        const comprasData = await comprasResponse.json();
        setCompras(Array.isArray(comprasData) ? comprasData : []);
      } else {
        // Si no hay compras o el endpoint no existe, usar array vacío
        setCompras([]);
      }

      // Cargar documentos firmados del usuario
      try {
        // Usar el endpoint correcto según el backend: /api/documento/user/{userId}
        let documentosResponse = await fetch(`http://localhost:8080/api/documento/user/${session.id}`, {
          headers: {
            "Authorization": `Bearer ${session.token}`
          }
        });

        // Si falla, intentar con el endpoint alternativo /api/documento/firmados/usuario/{userId}
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
          // Si no hay documentos o el endpoint no existe, usar array vacío
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
    // Mostrar mensaje de que se enviará por correo
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
      <div className="service" style={{ padding: "80px 0", minHeight: "100vh" }}>
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem', color: '#0FB3D1'}}>
              <span className="sr-only">Cargando...</span>
            </div>
            <p style={{marginTop: '20px', color: '#666'}}>Cargando información...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return null;
  }

  return (
    <div className="service" style={{ padding: "80px 0", minHeight: "100vh" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="titlepage">
              <h2>Mi Perfil</h2>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          {/* Información del Usuario */}
          <div className="col-md-4">
            <div className="backoffice_section" style={{padding: '30px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
              <div className="text-center mb-4">
                <div style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: '#1f235e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: '#fff',
                  fontSize: '40px',
                  fontWeight: 'bold'
                }}>
                  {usuario.nombre?.charAt(0).toUpperCase() || 'U'}
                </div>
                <h3 style={{color: '#1f235e', marginBottom: '15px'}}>{usuario.nombre || 'Usuario'}</h3>
              </div>

              <div style={{borderTop: '1px solid #ddd', paddingTop: '20px', marginTop: '20px'}}>
                <h4 style={{color: '#1f235e', fontSize: '18px', marginBottom: '15px'}}>
                  <i className="fa fa-user" style={{marginRight: '8px'}}></i>
                  Información Personal
                </h4>
                
                <div style={{marginBottom: '12px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                    <span style={{color: '#666', fontWeight: '500'}}>RUT:</span>
                    <strong style={{color: '#333'}}>{usuario.rut || 'N/A'}</strong>
                  </div>
                </div>

                <div style={{marginBottom: '12px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                    <span style={{color: '#666', fontWeight: '500'}}>Email:</span>
                    <strong style={{color: '#333'}}>{usuario.email || 'N/A'}</strong>
                  </div>
                </div>

                {usuario.telefono && (
                  <div style={{marginBottom: '12px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                      <span style={{color: '#666', fontWeight: '500'}}>Teléfono:</span>
                      <strong style={{color: '#333'}}>{usuario.telefono}</strong>
                    </div>
                  </div>
                )}

                {usuario.fechaNac && (
                  <div style={{marginBottom: '12px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                      <span style={{color: '#666', fontWeight: '500'}}>Fecha de Nacimiento:</span>
                      <strong style={{color: '#333'}}>{formatearFechaNacimiento(usuario.fechaNac)}</strong>
                    </div>
                    {calcularEdad(usuario.fechaNac) && (
                      <div style={{textAlign: 'right', fontSize: '12px', color: '#999'}}>
                        ({calcularEdad(usuario.fechaNac)} años)
                      </div>
                    )}
                  </div>
                )}

                {usuario.region && (
                  <div style={{marginBottom: '12px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                      <span style={{color: '#666', fontWeight: '500'}}>Región:</span>
                      <strong style={{color: '#333'}}>{usuario.region}</strong>
                    </div>
                  </div>
                )}

                {usuario.comuna && (
                  <div style={{marginBottom: '12px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                      <span style={{color: '#666', fontWeight: '500'}}>Comuna:</span>
                      <strong style={{color: '#333'}}>{usuario.comuna}</strong>
                    </div>
                  </div>
                )}

                <div style={{marginBottom: '12px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                    <span style={{color: '#666', fontWeight: '500'}}>Rol:</span>
                    <strong style={{color: '#333', textTransform: 'capitalize'}}>{usuario.rol || 'Usuario'}</strong>
                  </div>
                </div>
              </div>

              <div style={{borderTop: '1px solid #ddd', paddingTop: '20px', marginTop: '20px'}}>
                <h4 style={{color: '#1f235e', fontSize: '18px', marginBottom: '15px'}}>
                  <i className="fa fa-bar-chart" style={{marginRight: '8px'}}></i>
                  Estadísticas
                </h4>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                  <span style={{color: '#666'}}>Compras realizadas:</span>
                  <strong style={{color: '#0FB3D1'}}>{compras.length}</strong>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                  <span style={{color: '#666'}}>Documentos firmados:</span>
                  <strong style={{color: '#0FB3D1'}}>{documentos.length}</strong>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <span style={{color: '#666'}}>Total gastado:</span>
                  <strong style={{color: '#28a745'}}>
                    {formatearMonto(compras.reduce((sum, compra) => sum + (compra.monto || 0), 0))}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Compras y Boletas */}
          <div className="col-md-8">
            <div className="backoffice_section" style={{padding: '30px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
              <h3 style={{color: '#1f235e', marginBottom: '25px'}}>
                <i className="fa fa-shopping-cart" style={{marginRight: '10px'}}></i>
                Mis Compras y Boletas
              </h3>

              {compras.length === 0 ? (
                <div className="text-center" style={{padding: '40px'}}>
                  <i className="fa fa-inbox" style={{fontSize: '60px', color: '#ccc', marginBottom: '20px'}}></i>
                  <p style={{color: '#666'}}>No has realizado ninguna compra aún.</p>
                  <button 
                    onClick={() => navigate("/servicios")} 
                    className="btn_primary"
                    style={{marginTop: '20px'}}
                  >
                    Ver Servicios
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table" style={{marginBottom: 0}}>
                    <thead>
                      <tr style={{backgroundColor: '#f8f9fa'}}>
                        <th style={{padding: '12px', borderBottom: '2px solid #ddd'}}>Fecha</th>
                        <th style={{padding: '12px', borderBottom: '2px solid #ddd'}}>Servicio</th>
                        <th style={{padding: '12px', borderBottom: '2px solid #ddd'}}>Monto</th>
                        <th style={{padding: '12px', borderBottom: '2px solid #ddd'}}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {compras.map((compra, index) => (
                        <tr key={compra.id || index} style={{borderBottom: '1px solid #eee'}}>
                          <td style={{padding: '12px'}}>{formatearFecha(compra.fechaCompra)}</td>
                          <td style={{padding: '12px'}}>
                            {compra.servicio?.nombre || compra.nombreServicio || 'Servicio'}
                          </td>
                          <td style={{padding: '12px', fontWeight: 'bold', color: '#28a745'}}>
                            {formatearMonto(compra.monto)}
                          </td>
                          <td style={{padding: '12px'}}>
                            <button 
                              className="btn btn-sm" 
                              style={{
                                backgroundColor: '#0FB3D1',
                                color: '#fff',
                                border: 'none',
                                padding: '5px 15px',
                                borderRadius: '5px',
                                cursor: 'pointer'
                              }}
                              onClick={() => {
                                // Mostrar mensaje de que se enviará por correo
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

            {/* Documentos Firmados */}
            <div className="backoffice_section mt-4" style={{padding: '30px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
              <h3 style={{color: '#1f235e', marginBottom: '25px'}}>
                <i className="fa fa-file-text" style={{marginRight: '10px'}}></i>
                Mis Documentos Firmados
              </h3>

              {documentos.length === 0 ? (
                <div className="text-center" style={{padding: '40px'}}>
                  <i className="fa fa-file-o" style={{fontSize: '60px', color: '#ccc', marginBottom: '20px'}}></i>
                  <p style={{color: '#666'}}>No tienes documentos firmados aún.</p>
                  <button 
                    onClick={() => navigate("/firma")} 
                    className="btn_primary"
                    style={{marginTop: '20px'}}
                  >
                    Firmar Documento
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table" style={{marginBottom: 0}}>
                    <thead>
                      <tr style={{backgroundColor: '#f8f9fa'}}>
                        <th style={{padding: '12px', borderBottom: '2px solid #ddd'}}>Documento</th>
                        <th style={{padding: '12px', borderBottom: '2px solid #ddd'}}>Fecha de Subida</th>
                        <th style={{padding: '12px', borderBottom: '2px solid #ddd'}}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documentos.map((doc, index) => (
                        <tr key={doc.id || index} style={{borderBottom: '1px solid #eee'}}>
                          <td style={{padding: '12px'}}>
                            {doc.nombreOriginal || doc.nombre || 'Documento'}
                          </td>
                          <td style={{padding: '12px'}}>
                            {formatearFechaHora(doc.fechaSubida)}
                          </td>
                          <td style={{padding: '12px'}}>
                            <button 
                              className="btn btn-sm" 
                              style={{
                                backgroundColor: '#28a745',
                                color: '#fff',
                                border: 'none',
                                padding: '5px 15px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginRight: '5px'
                              }}
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

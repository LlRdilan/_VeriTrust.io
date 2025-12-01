import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotificationModal from "../components/ui/NotificacionModal"; 
// Asumo que este componente ya lo creaste e instalaste react-quill:
import RichTextEditor from "../components/RichTextEditor.jsx"; 

// --- VALIDACIÓN DE SERVICIO EN FRONTEND ---
export function ComprobarServicio(servicio) {
  if (!servicio || typeof servicio !== "object") {
    throw new Error("Servicio inválido");
  }

  const nombre = (servicio.nombre ?? "").toString();
  const descripcion = (servicio.descripcion ?? "").toString();
  let precio = servicio.precio;

  if (typeof precio === "string") precio = parseFloat(precio);
  
  if (!nombre.trim() || !descripcion.trim()) {
    throw new Error("El nombre y la descripción corta son obligatorios.");
  }

  if (typeof precio !== "number" || !Number.isFinite(precio) || precio <= 0 || precio % 1 !== 0) {
    throw new Error("El precio debe ser un número entero positivo.");
  }
  
  return true;
}

// ---------------------------------------------------------------------

export default function Admin() {
  const navegar = useNavigate();
  const [servicios, setServicios] = useState([]);
  
  // ESTADO COMPLETO: Incluye descripcionCompleta
  const [form, setForm] = useState({ 
    nombre: "", 
    descripcion: "", 
    precio: "", 
    detalles: "", 
    descripcionCompleta: ""
  });
  
  const [usuarioNombre, setUsuarioNombre] = useState("");
  const [idEdicion, setIdEdicion] = useState(null);
  
  const [modal, setModal] = useState({ show: false, title: '', message: '', status: 'info', isConfirmation: false });
  const [servicioAEliminar, setServicioAEliminar] = useState(null); 
  const handleCloseModal = () => setModal({ show: false, title: '', message: '', status: 'info', isConfirmation: false });

  const API_URL = "http://localhost:8080/servicios"; 

  useEffect(() => {
    const session = localStorage.getItem("user_session");
    if (!session) {
      navegar("/login");
    } else {
      const user = JSON.parse(session);
      setUsuarioNombre(user.nombre);
    }
    cargarServicios();
  }, [navegar]);

  const cargarServicios = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setServicios(data);
    } catch (error) {
      console.error("Error al cargar servicios (BD):", error);
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    
    const detallesArray = form.detalles.split("\n");
    
    const servicioData = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: parseFloat(form.precio),
        detalles: detallesArray.filter(d => d.trim() !== ""),
        // CAMBIO: Incluimos la nueva descripción rica
        descripcionCompleta: form.descripcionCompleta 
    };

    try {
        ComprobarServicio(servicioData);
    } catch (error) {
        setModal({ show: true, title: "Error de Formulario", message: error.message, status: "warning" });
        return;
    }

    try {
      let url = API_URL;
      let method = "POST";

      if (idEdicion !== null) {
        url = `${API_URL}/${idEdicion}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(servicioData)
      });

      if (res.ok) {
        setModal({ 
            show: true, 
            title: "Operación Exitosa", 
            message: idEdicion !== null ? "Servicio actualizado en BD." : "Servicio creado correctamente en BD.", 
            status: "success" 
        });
        setForm({ nombre: "", descripcion: "", precio: "", detalles: "", descripcionCompleta: "" });
        setIdEdicion(null);
        cargarServicios();
      } else {
        setModal({ 
            show: true, 
            title: "Error del Servidor", 
            message: "Fallo al guardar o actualizar. Revisa el log de Java.", 
            status: "error" 
        });
      }
    } catch (error) {
      setModal({ show: true, title: "Error de Conexión", message: "No se pudo alcanzar la API.", status: "error" });
    }
  };

  // Lógica para mostrar el modal de confirmación de borrado
  const manejarEliminarClick = (id) => {
    setServicioAEliminar(id); 
    setModal({
        show: true,
        title: "¿Confirmar Eliminación?",
        message: "¿Estás seguro de eliminar este servicio de la Base de Datos? Esta acción es irreversible.",
        status: "warning",
        isConfirmation: true,
    });
  };

  const handleAceptarEliminar = async () => {
    const id = servicioAEliminar;
    handleCloseModal(); 

    if (!id) return; 

    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        setModal({ show: true, title: "Eliminado", message: "El servicio fue eliminado de la Base de Datos.", status: "success" });
        cargarServicios();
    } catch (error) {
        setModal({ show: true, title: "Error", message: "Fallo al eliminar el servicio.", status: "error" });
    } finally {
        setServicioAEliminar(null);
    }
  };

  const handleCancelarEliminacion = () => {
    setServicioAEliminar(null);
    handleCloseModal(); 
  };

  // Carga los datos en el formulario para editar
  const cargarParaEditar = (servicio) => {
    setIdEdicion(servicio.id);
    setForm({
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      precio: servicio.precio,
      detalles: servicio.detalles ? servicio.detalles.join("\n") : "",
      // Mapeamos el campo existente al editor
      descripcionCompleta: servicio.descripcionCompleta || '' 
    });
  };

  const cancelarEdicion = () => {
    setForm({ nombre: "", descripcion: "", precio: "", detalles: "", descripcionCompleta: "" });
    setIdEdicion(null);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("user_session");
    navegar("/login");
  };

  return (
    <div className="service" style={{ minHeight: "100vh", paddingBottom: "100px" }}>
      <div className="container">
        <div className="titlepage">
            <h2>Panel de Administración</h2>
            <p>Conectado como: <strong>{usuarioNombre}</strong></p>
        </div>
        
        {/* FORMULARIO DE CREACIÓN / EDICIÓN */}
        <div className="backoffice_section">
          <h4 style={{borderBottom: '2px solid #0FB3D1', paddingBottom: '10px', marginBottom: '20px'}}>
            {idEdicion !== null ? "Editar Servicio" : "Crear Nuevo Servicio"}
          </h4>
          <form onSubmit={manejarEnvio}>
            <div className="row">
              {/* PRIMERA FILA: Campos cortos */}
              <div className="col-md-3">
                <label>Nombre</label>
                <input className="form-control" placeholder="Ej: Firma Avanzada" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
              </div>
              <div className="col-md-3">
                <label>Descripción Corta</label>
                <input className="form-control" placeholder="Ej: 100% Online" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} required />
              </div>
              <div className="col-md-2">
                <label>Precio (Entero)</label>
                <input type="number" className="form-control" placeholder="15000" value={form.precio} onChange={e => setForm({...form, precio: e.target.value})} required />
              </div>
              <div className="col-md-4">
                <label>Detalles (Líneas)</label>
                <textarea className="form-control" rows="1" placeholder="Detalle 1..." value={form.detalles} onChange={e => setForm({...form, detalles: e.target.value})} ></textarea>
              </div>
              
              {/* SEGUNDA FILA: EDITOR DE CONTENIDO ENRIQUECIDO */}
              <div className="col-md-12 mt-4">
                <label>Descripción Completa (Editor)</label>
                <RichTextEditor
                    value={form.descripcionCompleta}
                    onChange={(content) => setForm({...form, descripcionCompleta: content})}
                    placeholder="Escribe la descripción completa del servicio aquí..."
                />
              </div>

              <div className="col-12 mt-5">
                <button className="btn_primary w-100">
                    {idEdicion !== null ? "Guardar Cambios" : "Crear Servicio"}
                </button>
                
                {idEdicion !== null && (
                    <button type="button" onClick={cancelarEdicion} className="btn btn-secondary mt-2 w-100">
                        Cancelar Edición
                    </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* TABLA DE SERVICIOS (Resto del código igual) */}
        <div className="backoffice_section">
          <h4>Servicios Actuales (Base de Datos)</h4>
          <div className="table-responsive">
            <table className="table">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio Neto</th>
                    <th>Con IVA (+19%)</th>
                    <th className="text-right">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {servicios.length === 0 ? (
                    <tr><td colSpan="5" className="text-center">No hay servicios registrados.</td></tr>
                ) : (
                    servicios.map((s) => {
                        const neto = Number(s.precio);
                        const total = Math.round(neto * 1.19);

                        return (
                            <tr key={s.id}>
                                <td style={{fontWeight: 'bold', color: '#1f235e'}}>{s.nombre}</td>
                                <td>{s.descripcion}</td>
                                <td>${neto.toLocaleString()}</td>
                                <td style={{fontWeight: 'bold', color: '#0FB3D1'}}>${total.toLocaleString()}</td>
                                <td className="text-right">
                                    <button onClick={() => cargarParaEditar(s)} className="btn btn-sm btn-warning mr-2" style={{color:'#fff'}}>
                                        <i className="fa fa-edit"></i>
                                    </button>
                                    <button onClick={() => manejarEliminarClick(s.id)} className="btn btn-sm btn-danger">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                )}
                </tbody>
            </table>
          </div>
        </div>
        
        <div className="text-center mt-4">
            <button onClick={cerrarSesion} className="btn btn-secondary">Cerrar Sesión</button>
        </div>
      </div>

      {/* RENDERIZADO DEL MODAL */}
      <NotificationModal 
        show={modal.show}
        handleClose={modal.isConfirmation ? handleCancelarEliminacion : handleCloseModal} 
        title={modal.title}
        message={modal.message}
        status={modal.status}
        isConfirmation={modal.isConfirmation} 
        onConfirm={handleAceptarEliminar} 
      />
    </div>
  );
}
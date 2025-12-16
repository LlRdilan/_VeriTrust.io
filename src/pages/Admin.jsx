import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotificationModal from "../components/ui/NotificacionModal"; 
import RichTextEditor from "../components/RichTextEditor";
import { getSession, removeSession } from "../services/auth";
import { calcularIVA, calcularTotalConIVA } from "../utils/calculos";
import { handleError, handleHttpError } from "../services/errorHandler";

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


export default function Admin() {
  const navegar = useNavigate();
  const [servicios, setServicios] = useState([]);
  
  const [form, setForm] = useState({ 
    nombre: "", 
    descripcion: "", 
    precio: "", 
    detalles: "", 
    descripcionCompleta: "",
  });
  const [usuarioNombre, setUsuarioNombre] = useState("");
  const [idEdicion, setIdEdicion] = useState(null);
  const [modal, setModal] = useState({ show: false, title: '', message: '', status: 'info', isConfirmation: false });
  const [servicioAEliminar, setServicioAEliminar] = useState(null);
  const [cargandoServicios, setCargandoServicios] = useState(false);
  const [cargandoForm, setCargandoForm] = useState(false);
  const handleCloseModal = () => setModal({ show: false, title: '', message: '', status: 'info', isConfirmation: false });
  const API_URL = "http://localhost:8080/servicios"; 

  useEffect(() => {
    const session = getSession();
    if (!session) {
        navegar("/login");
    } else {
        if (session.rol !== "admin") {
            navegar("/servicios"); 
            return;
        }
        setUsuarioNombre(session.nombre);
    }

    cargarServicios();
  }, [navegar]);

  const cargarServicios = async () => {
    setCargandoServicios(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        const errorInfo = await handleHttpError(res);
        setModal({ show: true, title: errorInfo.title, message: errorInfo.message, status: errorInfo.status });
        return;
      }
      const data = await res.json();
      setServicios(data);
    } catch (error) {
      const errorInfo = handleError(error);
      setModal({ show: true, title: errorInfo.title, message: errorInfo.message, status: errorInfo.status });
    } finally {
      setCargandoServicios(false);
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setCargandoForm(true);
    
    const detallesArray = form.detalles.split("\n");
    const cleanedDescription = form.descripcionCompleta 
        ? form.descripcionCompleta.replace(/<p>\s*<br\s*\/?>\s*<\/p>/g, '').trim()
        : "";

    const servicioData = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: parseFloat(form.precio),
        detalles: detallesArray.filter(d => d.trim() !== ""),
        descripcionCompleta: cleanedDescription,
    };

    try {
        ComprobarServicio(servicioData);
    } catch (error) {
        setModal({ show: true, title: "Error de Formulario", message: error.message, status: "warning" });
        setCargandoForm(false);
        return;
    }

    // OBTENEMOS EL TOKEN
    const session = getSession();
    const token = session ? session.token : "";

    try {
      let url = API_URL;
      let method = "POST";
      if (idEdicion !== null) {
        url = `${API_URL}/${idEdicion}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method: method,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // ENVIAMOS EL TOKEN
        },
        body: JSON.stringify(servicioData)
      });
      
      if (res.ok) {
        setModal({ 
            show: true, 
            title: "Operación Exitosa", 
            message: idEdicion !== null ? "Servicio actualizado correctamente en BD." : "Servicio creado correctamente en BD.", 
            status: "success" 
        });
        setForm({ nombre: "", descripcion: "", precio: "", detalles: "", descripcionCompleta: "" });
        setIdEdicion(null);
        cargarServicios();
      } else {
        const errorInfo = await handleHttpError(res);
        setModal({ 
            show: true, 
            title: errorInfo.title, 
            message: errorInfo.message, 
            status: errorInfo.status 
        });
      }
    } catch (error) {
      const errorInfo = handleError(error);
      setModal({ show: true, title: errorInfo.title, message: errorInfo.message, status: errorInfo.status });
    } finally {
      setCargandoForm(false);
    }
  };

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

    // OBTENEMOS EL TOKEN
    const session = getSession();
    const token = session ? session.token : "";

    try {
        const res = await fetch(`${API_URL}/${id}`, { 
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}` // ENVIAMOS EL TOKEN
            } 
        });
        
        if (res.ok) {
            setModal({ show: true, title: "Eliminado", message: "El servicio fue eliminado de la Base de Datos.", status: "success" });
            cargarServicios();
        } else {
            const errorInfo = await handleHttpError(res);
            setModal({ show: true, title: errorInfo.title, message: errorInfo.message, status: errorInfo.status });
        }
    } catch (error) {
        const errorInfo = handleError(error);
        setModal({ show: true, title: errorInfo.title, message: errorInfo.message, status: errorInfo.status });
    } finally {
        setServicioAEliminar(null);
    }
  };

  const handleCancelarEliminacion = () => {
    setServicioAEliminar(null);
    handleCloseModal(); 
  };

  const cargarParaEditar = (servicio) => {
    setIdEdicion(servicio.id);
    setForm({
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      precio: servicio.precio,
      detalles: servicio.detalles ? servicio.detalles.join("\n") : "",
      descripcionCompleta: servicio.descripcionCompleta || '',
    });
  };

  const cancelarEdicion = () => {
    setForm({ nombre: "", descripcion: "", precio: "", detalles: "", descripcionCompleta: "" });
    setIdEdicion(null);
  };

  const cerrarSesion = () => {
    setModal({
        show: true,
        title: "¿Cerrar Sesión?",
        message: "¿Estás seguro de que deseas cerrar sesión?",
        status: "warning",
        isConfirmation: true,
    });
  };

  const handleConfirmarCerrarSesion = () => {
    removeSession();
    handleCloseModal();
    navegar("/login");
  };

  return (
    <div className="service page-admin-container">
      <div className="container">
        <div className="titlepage">
            <h2>Panel de Administración</h2>
            <p>Conectado como: <strong>{usuarioNombre}</strong></p>
        </div>
        
        <div className="backoffice_section">
          <h4 className="admin-section-title">
            {idEdicion !== null ? "Editar Servicio" : "Crear Nuevo Servicio"}
          </h4>
          <form onSubmit={manejarEnvio}>
            <div className="row">
              <div className="col-md-4">
                <label>Nombre</label>
                <input className="form-control" placeholder="Ej: Firma Avanzada" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
              </div>
              <div className="col-md-3">
                <label>Precio (Entero)</label>
                <input type="number" className="form-control" placeholder="15000" value={form.precio} onChange={e => setForm({...form, precio: e.target.value})} required />
              </div>
              <div className="col-md-5">
                <label>Descripción Corta</label>
                <input className="form-control" placeholder="Ej: Certificado Digital" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} required />
              </div>
              
              <div className="col-md-4 mt-4">
                <label>Detalles (Líneas)</label>
                <textarea className="form-control" rows="1" placeholder="Detalle 1..." value={form.detalles} onChange={e => setForm({...form, detalles: e.target.value})} ></textarea>
              </div>

              <div className="col-md-8 mt-4">
                <label>Descripción Completa (CKEditor)</label>
                <RichTextEditor
                    value={form.descripcionCompleta}
                    onChange={(content) => setForm({...form, descripcionCompleta: content})}
                    placeholder="Escribe la descripción completa del servicio aquí..."
                />
              </div>

              <div className="col-12 mt-5">
                <button className="btn_primary w-100" disabled={cargandoForm}>
                    {cargandoForm ? "Guardando..." : (idEdicion !== null ? "Guardar Cambios" : "Crear Servicio")}
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

        <div className="backoffice_section">
          <h4>Servicios Actuales (Base de Datos)</h4>
          {cargandoServicios && (
            <div className="text-center mb-3">
              <p>Cargando servicios...</p>
            </div>
          )}
          <div className="table-responsive">
            <table className="table">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio Neto</th>
                    <th>IVA (19%)</th>
                    <th>Total</th>
                    <th className="text-right">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {servicios.length === 0 ? (
                    <tr><td colSpan="6" className="text-center">No hay servicios registrados.</td></tr>
                ) : (
                    servicios.map((s) => {
                        const neto = Number(s.precio);
                        const iva = calcularIVA(neto);
                        const total = calcularTotalConIVA(neto);

                        return (
                          <tr key={s.id}>
                                <td className="admin-table-name">{s.nombre}</td>
                                <td>{s.descripcion}</td>
                                <td>${neto.toLocaleString()}</td>
                                <td>${iva.toLocaleString()}</td> 
                                <td className="admin-table-total">${total.toLocaleString()}</td> 
                                <td className="text-right">
                                    <button onClick={() => cargarParaEditar(s)} className="btn btn-sm btn-warning mr-2 admin-btn-edit">
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

      <NotificationModal 
        show={modal.show}
        handleClose={modal.isConfirmation ? (modal.title === "¿Cerrar Sesión?" ? handleCloseModal : handleCancelarEliminacion) : handleCloseModal} 
        title={modal.title}
        message={modal.message}
        status={modal.status}
        isConfirmation={modal.isConfirmation} 
        onConfirm={modal.title === "¿Cerrar Sesión?" ? handleConfirmarCerrarSesion : handleAceptarEliminar} 
      />
    </div>
  );
}
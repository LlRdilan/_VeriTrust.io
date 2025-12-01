import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navegar = useNavigate();
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState({ nombre: "", descripcion: "", precio: "", detalles: "" });
  const [usuarioNombre, setUsuarioNombre] = useState("");
  
  const [idEdicion, setIdEdicion] = useState(null);

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
      console.error("Error al cargar servicios");
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      const servicioData = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: parseInt(form.precio),
        detalles: form.detalles.split("\n").filter(d => d.trim() !== "")
      };

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
        alert(idEdicion !== null ? "Servicio actualizado correctamente" : "Servicio creado correctamente");
        setForm({ nombre: "", descripcion: "", precio: "", detalles: "" });
        setIdEdicion(null);
        cargarServicios(); 
      } else {
        alert("Error al guardar en el servidor");
      }
    } catch (error) {
      alert("Error de conexión");
    }
  };

  const cargarParaEditar = (servicio) => {
    setForm({
      nombre: servicio.nombre,
      descripcion: servicio.descripcion,
      precio: servicio.precio,
      detalles: servicio.detalles ? servicio.detalles.join("\n") : ""
    });
    setIdEdicion(servicio.id);
  };

  const cancelarEdicion = () => {
    setForm({ nombre: "", descripcion: "", precio: "", detalles: "" });
    setIdEdicion(null);
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este servicio de la Base de Datos?")) {
      try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        cargarServicios();
      } catch (error) {
        alert("Error al eliminar");
      }
    }
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
        
        <div className="backoffice_section">
          <h4 style={{borderBottom: '2px solid #0FB3D1', paddingBottom: '10px', marginBottom: '20px'}}>
            {idEdicion !== null ? "Editar Servicio" : "Crear Nuevo Servicio"}
          </h4>
          <form onSubmit={manejarEnvio}>
            <div className="row">
              <div className="col-md-3">
                <label>Nombre</label>
                <input className="form-control" placeholder="Ej: Firma Avanzada" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
              </div>
              <div className="col-md-3">
                <label>Descripción</label>
                <input className="form-control" placeholder="Ej: 100% Online" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} required />
              </div>
              <div className="col-md-2">
                <label>Precio</label>
                <input type="number" className="form-control" placeholder="15000" value={form.precio} onChange={e => setForm({...form, precio: e.target.value})} required />
              </div>
              <div className="col-md-4">
                <label>Detalles (Enter para nueva línea)</label>
                <textarea className="form-control" rows="1" placeholder="Detalle 1..." value={form.detalles} onChange={e => setForm({...form, detalles: e.target.value})} ></textarea>
              </div>
              
              <div className="col-12 mt-4">
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

        <div className="backoffice_section">
          <h4>Servicios Actuales (Base de Datos)</h4>
          <div className="table-responsive">
            <table className="table">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th className="text-right">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {servicios.length === 0 ? (
                    <tr><td colSpan="4" className="text-center">No hay servicios registrados.</td></tr>
                ) : (
                    servicios.map((s) => (
                        <tr key={s.id}>
                            <td style={{fontWeight: 'bold', color: '#1f235e'}}>{s.nombre}</td>
                            <td>{s.descripcion}</td>
                            <td>${Number(s.precio).toLocaleString()}</td>
                            <td className="text-right">
                                <button onClick={() => cargarParaEditar(s)} className="btn btn-sm btn-warning mr-2" style={{color:'#fff'}}>
                                    <i className="fa fa-edit"></i>
                                </button>
                                <button onClick={() => eliminar(s.id)} className="btn btn-sm btn-danger">
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
          </div>
        </div>
        
        <div className="text-center mt-4">
            <button onClick={cerrarSesion} className="btn btn-secondary">Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
}
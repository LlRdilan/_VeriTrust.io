import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ComprobarServicio(servicio) {
  if (!servicio || typeof servicio !== "object") throw new Error("Servicio invalido");
  const { name, desc, price, details } = servicio;
  if (!name?.trim() || !desc?.trim()) throw new Error("Nombre y descripcion son obligatorios");
  if (typeof price !== "number" || price <= 0) throw new Error("El precio debe ser un numero positivo");
  if (!Array.isArray(details) || details.length < 3) throw new Error("La descripcion larga debe tener al menos 3 lineas (detalles)");
  return true;
}

export default function Admin() {
  const navegar = useNavigate();
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState({ name: "", desc: "", price: "", details: "" });
  const [indiceEditar, setIndiceEditar] = useState(null);
  const [usuarioNombre, setUsuarioNombre] = useState("");

  useEffect(() => {
    // --- VERIFICAR TOKEN DE SESIÓN ---
    const session = localStorage.getItem("user_session");
    
    if (!session) {
      navegar("/login");
    } else {
      const user = JSON.parse(session);
      setUsuarioNombre(user.nombre); // Guardamos nombre para mostrarlo
    }

    const guardados = JSON.parse(localStorage.getItem("services")) || [
        { name: "Firma Simple", desc: "Certificado Digital", price: 15390, details: ["Rápida", "Segura", "Económica"] },
        { name: "Firma Avanzada", desc: "e-Token", price: 21990, details: ["Profesional", "USB Token", "Legal"] }
    ];
    setServicios(guardados);
  }, [navegar]);

  const guardarCambios = (nuevosServicios) => {
    localStorage.setItem("services", JSON.stringify(nuevosServicios));
    setServicios(nuevosServicios);
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    try {
      const detallesArray = form.details.split("\n").filter(d => d.trim() !== "");
      const servicioNormalizado = {
        name: form.name,
        desc: form.desc,
        price: parseFloat(form.price),
        details: detallesArray
      };
      ComprobarServicio(servicioNormalizado);
      let actualizados;
      if (indiceEditar !== null) {
        actualizados = servicios.map((s, i) => (i === indiceEditar ? servicioNormalizado : s));
      } else {
        actualizados = [...servicios, servicioNormalizado];
      }
      guardarCambios(actualizados);
      setForm({ name: "", desc: "", price: "", details: "" });
      setIndiceEditar(null);
      alert("Operación exitosa");
    } catch (error) {
      alert(error.message);
    }
  };

  const cargarParaEditar = (i) => {
    const s = servicios[i];
    setForm({
      name: s.name,
      desc: s.desc,
      price: s.price,
      details: Array.isArray(s.details) ? s.details.join("\n") : s.details
    });
    setIndiceEditar(i);
  };

  const eliminar = (i) => {
    if (window.confirm("¿Eliminar servicio?")) {
      const actualizados = servicios.filter((_, index) => index !== i);
      guardarCambios(actualizados);
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
            <p>Bienvenido, <strong>{usuarioNombre}</strong></p>
        </div>
        
        <div className="backoffice_section">
          <h4 style={{borderBottom: '2px solid #0FB3D1', paddingBottom: '10px', marginBottom: '20px'}}>
            {indiceEditar !== null ? "Editar Servicio" : "Nuevo Servicio"}
          </h4>
          <form onSubmit={manejarEnvio}>
            <div className="row">
              <div className="col-md-3">
                <label>Nombre</label>
                <input className="form-control" placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="col-md-3">
                <label>Descripción</label>
                <input className="form-control" placeholder="Desc. Corta" value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} />
              </div>
              <div className="col-md-2">
                <label>Precio Neto</label>
                <input type="number" className="form-control" placeholder="Precio Neto" value={form.price} onChange={e => setForm({...form, price: e.target.value})} />
              </div>
              <div className="col-md-4">
                <label>Detalles (Enter para nueva línea)</label>
                <textarea className="form-control" rows="1" value={form.details} onChange={e => setForm({...form, details: e.target.value})} ></textarea>
              </div>
              <div className="col-12 mt-4">
                <button className="btn_primary w-100">{indiceEditar !== null ? "Actualizar" : "Crear"}</button>
                {indiceEditar !== null && <button type="button" onClick={() => {setIndiceEditar(null); setForm({name:"", desc:"", price:"", details:""})}} className="btn btn-secondary mt-2 w-100">Cancelar</button>}
              </div>
            </div>
          </form>
        </div>

        <div className="backoffice_section">
          <h4>Listado de Servicios</h4>
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
                {servicios.map((s, i) => {
                    const neto = Number(s.price);
                    const total = Math.round(neto * 1.19);
                    return (
                        <tr key={i}>
                            <td style={{fontWeight: 'bold', color: '#1f235e'}}>{s.name}</td>
                            <td>{s.desc}</td>
                            <td>${neto.toLocaleString()}</td>
                            <td style={{fontWeight: 'bold', color: '#0FB3D1'}}>${total.toLocaleString()}</td>
                            <td className="text-right">
                            <button onClick={() => cargarParaEditar(i)} className="btn btn-sm btn-warning mr-2"><i className="fa fa-edit"></i></button>
                            <button onClick={() => eliminar(i)} className="btn btn-sm btn-danger"><i className="fa fa-trash"></i></button>
                            </td>
                        </tr>
                    )
                })}
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
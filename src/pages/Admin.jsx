import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ComprobarServicio(servicio) {
  if (!servicio || typeof servicio !== "object") {
    throw new Error("Servicio invalido");
  }

  // aceptar claves en español o inglés
  const nombre = (servicio.nombre ?? servicio.name ?? "").toString();
  const descripcion = (servicio.descripcion ?? servicio.desc ?? "").toString();

  // precio puede venir como string o number, en clave precio o price
  let precio = servicio.precio ?? servicio.price;
  if (typeof precio === "string") precio = parseFloat(precio);

  // detalles puede venir como array (detalles) o string con saltos de linea (longDesc / detalles)
  let detalles = [];
  if (Array.isArray(servicio.detalles)) {
    detalles = servicio.detalles;
  } else if (typeof servicio.longDesc === "string") {
    detalles = servicio.longDesc.split("\n");
  } else if (typeof servicio.detalles === "string") {
    detalles = servicio.detalles.split("\n");
  } else {
    detalles = [];
  }

  if (!nombre.trim() || !descripcion.trim()) {
    throw new Error("Nombre y descripcion son obligatorios");
  }

  if (typeof precio !== "number" || !Number.isFinite(precio) || precio <= 0 || precio % 1 !== 0) {
    throw new Error("El precio debe ser un numero entero positivo");
  }

  const detallesValidos = Array.isArray(detalles) ? detalles.filter(d => typeof d === "string" && d.trim() !== "") : [];
  if (detallesValidos.length < 3) {
    throw new Error("La descripcion larga debe tener al menos 3 lineas");
  }

  return true;
}

export default function Admin() {
  const navegar = useNavigate();

  const [servicios, setServicios] = useState([]);
  const [formulario, setFormulario] = useState({ nombre: "", descripcion: "", precio: "", detalles: [] });
  const [indiceEditar, setIndiceEditar] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("adminLogged")) {
      navegar("/login");
    }

    const guardados = JSON.parse(localStorage.getItem("services")) || [
      { nombre: "Firma Electronica Simple", descripcion: "Certificado Digital", precio: 15390, detalles: [] },
      { nombre: "Firma Avanzada Online", descripcion: "e-token", precio: 21990, detalles: [] },
      { nombre: "Firma Avanzada Notario", descripcion: "Uso profesional", precio: 42990, detalles: [] },
    ];
    setServicios(guardados);
  }, [navegar]);

  const guardarEnStorage = (datos) => {
    const normalizados = datos.map((s) => ({
      name: s.nombre ?? s.name ?? "",
      desc: s.descripcion ?? s.desc ?? "",
      price:
        typeof (s.precio ?? s.price) === "string"
          ? parseFloat(s.precio ?? s.price)
          : (s.precio ?? s.price) ?? 0,
      details: Array.isArray(s.detalles)
        ? s.detalles
        : typeof s.detalles === "string"
        ? s.detalles.split("\n")
        : s.details ?? [],
    }));

    localStorage.setItem("services", JSON.stringify(normalizados));
    // Mantener el estado del admin con las claves en español para el formulario
    setServicios(datos);
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    try {
      const precioParseado = parseFloat(formulario.precio);
      ComprobarServicio({ ...formulario, precio: precioParseado });
    } catch (error) {
      alert(error.message);
      return;
    }

    const nuevoServicio = {
      ...formulario,
      precio: parseFloat(formulario.precio),
      detalles: formulario.detalles.filter(d => d.trim() !== "")
    };

    const serviciosActualizados =
      indiceEditar !== null
        ? servicios.map((s, i) => (i === indiceEditar ? nuevoServicio : s))
        : [...servicios, nuevoServicio];

    guardarEnStorage(serviciosActualizados);
    setFormulario({ nombre: "", descripcion: "", precio: "", detalles: [] });
    setIndiceEditar(null);

    alert("Servicio creado o actualizado correctamente");
  };

  const manejarEditar = (indice) => {
    setFormulario(servicios[indice]);
    setIndiceEditar(indice);
  };

  const manejarEliminar = (indice) => {
    if (!window.confirm("Deseas eliminar este servicio?")) return;
    const serviciosActualizados = servicios.filter((_, i) => i !== indice);
    guardarEnStorage(serviciosActualizados);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("adminLogged");
    navegar("/login");
  };

  const verServiciosPublicos = () => {
    navegar("/servicios");
  };

  return (
    <div id="admin" className="service">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="titlepage">
              <h2>Administracion de Servicios</h2>
              <p>Administra los servicios disponibles en el sitio web.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="backoffice_section">
              <form onSubmit={manejarEnvio}>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label htmlFor="nombreServicio" className="form-label">Nombre</label>
                    <input
                      type="text"
                      id="nombreServicio"
                      className="form-control"
                      value={formulario.nombre}
                      onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="descripcionServicio" className="form-label">Descripcion</label>
                    <input
                      type="text"
                      id="descripcionServicio"
                      className="form-control"
                      value={formulario.descripcion}
                      onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="precioServicio" className="form-label">Precio</label>
                    <input
                      type="number"
                      id="precioServicio"
                      className="form-control"
                      value={formulario.precio}
                      onChange={(e) => setFormulario({ ...formulario, precio: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="detallesServicio" className="form-label">Detalles (1 por linea)</label>
                    <textarea
                      id="detallesServicio"
                      className="form-control"
                      value={formulario.detalles ? formulario.detalles.join("\n") : ""}
                      onChange={(e) =>
                        setFormulario({ ...formulario, detalles: e.target.value.split("\n") })
                      }
                      placeholder="Ingresa cada detalle en una linea"
                      rows={4}
                    ></textarea>
                  </div>
                  <div className="col-md-12 mt-2">
                    <button type="submit" className="btn_primary w-100">
                      {indiceEditar !== null ? "Actualizar" : "Guardar"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="backoffice_section mt-4">
              <h4>Servicios registrados</h4>
              <table className="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Precio</th>
                    <th style={{ width: "150px" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {servicios.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center">No hay servicios registrados.</td>
                    </tr>
                  ) : (
                    servicios.map((s, i) => (
                      <tr key={i}>
                        <td>{s.nombre}</td>
                        <td>{s.descripcion}</td>
                        <td>${Number(s.precio).toLocaleString()}</td>
                        <td>
                          <button className="btn btn-warning btn-sm me-2" onClick={() => manejarEditar(i)}>
                            <i className="fa fa-edit"></i>
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => manejarEliminar(i)}>
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-4 d-flex justify-content-center gap-3">
              <button onClick={verServiciosPublicos} className="btn_primary">
                <i className="fa fa-eye"></i> Ver servicios publicos
              </button>
              <button onClick={cerrarSesion} className="btn btn-secondary ms-2">
                <i className="fa fa-sign-out"></i> Cerrar sesion
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

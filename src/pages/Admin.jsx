import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: "", desc: "", price: "", details: [] });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("adminLogged")) {
      navigate("/login");
    }

    const stored = JSON.parse(localStorage.getItem("services")) || [
      { name: "Firma Electrónica Simple", desc: "Certificado Digital", price: 15390, details: [] },
      { name: "Firma Avanzada Online", desc: "e-token", price: 21990, details: [] },
      { name: "Firma Avanzada Notario", desc: "Uso profesional", price: 42990, details: [] },
    ];
    setServices(stored);
  }, [navigate]);

  const saveToStorage = (data) => {
    localStorage.setItem("services", JSON.stringify(data));
    setServices(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, desc, price, details } = form;

    if (!name || !desc || isNaN(price)) {
      alert("Complete todos los campos correctamente.");
      return;
    }

    const newService = { 
      name, 
      desc, 
      price: parseInt(price, 10), 
      details: details || [] 
    };

    const updated =
      editIndex !== null
        ? services.map((s, i) => (i === editIndex ? newService : s))
        : [...services, newService];

    saveToStorage(updated);
    setForm({ name: "", desc: "", price: "", details: [] });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setForm(services[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (!window.confirm("¿Deseas eliminar este servicio?")) return;
    const updated = services.filter((_, i) => i !== index);
    saveToStorage(updated);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLogged");
    navigate("/login");
  };

  const handlePreview = () => {
    navigate("/servicios");
  };

  return (
    <div id="admin" className="service">
      <div className="container">
        {/* Encabezado */}
        <div className="row">
          <div className="col-md-12">
            <div className="titlepage">
              <h2>Administración de Servicios</h2>
              <p>Administra los servicios disponibles en el sitio web.</p>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="row">
          <div className="col-md-12">
            <div className="backoffice_section">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-3">
                    <label htmlFor="serviceName" className="form-label">Nombre</label>
                    <input
                      type="text"
                      id="serviceName"
                      className="form-control"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="serviceDesc" className="form-label">Descripción</label>
                    <input
                      type="text"
                      id="serviceDesc"
                      className="form-control"
                      value={form.desc}
                      onChange={(e) => setForm({ ...form, desc: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="servicePrice" className="form-label">Precio</label>
                    <input
                      type="number"
                      id="servicePrice"
                      className="form-control"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="serviceDetails" className="form-label">Detalles (1 por línea)</label>
                    <textarea
                      id="serviceDetails"
                      className="form-control"
                      value={form.details ? form.details.join("\n") : ""}
                      onChange={(e) =>
                        setForm({ ...form, details: e.target.value.split("\n") })
                      }
                      placeholder="Ingresa cada detalle en una línea"
                      rows={4}
                    ></textarea>
                  </div>
                  <div className="col-md-12 mt-2">
                    <button type="submit" className="btn_primary w-100">
                      {editIndex !== null ? "Actualizar" : "Guardar"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Tabla de servicios */}
        <div className="row">
          <div className="col-md-12">
            <div className="backoffice_section mt-4">
              <h4>Servicios registrados</h4>
              <table className="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th style={{ width: "150px" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {services.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center">No hay servicios registrados.</td>
                    </tr>
                  ) : (
                    services.map((s, i) => (
                      <tr key={i}>
                        <td>{s.name}</td>
                        <td>{s.desc}</td>
                        <td>${Number(s.price).toLocaleString()}</td>
                        <td>
                          <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(i)}>
                            <i className="fa fa-edit"></i>
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(i)}>
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Botones inferiores */}
            <div className="text-center mt-4 d-flex justify-content-center gap-3">
              <button onClick={handlePreview} className="btn_primary">
                <i className="fa fa-eye"></i> Ver servicios públicos
              </button>
              <button onClick={handleLogout} className="btn btn-secondary ms-2">
                <i className="fa fa-sign-out"></i> Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

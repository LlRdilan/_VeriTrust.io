import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReCAPTCHA from "../components/api/ReCaptcha";

export default function Registro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    rut: "",
    nombre: "",
    fechaNac: "", // Cambié fecha a fechaNac para coincidir con tu Backend
    telefono: "",
    email: "",
    contraseña: "",
  });

  const [captchaValido, setCaptchaValido] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValido) {
      alert("Debes completar el reCAPTCHA");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // Enviamos el formulario tal cual
      });

      if (response.ok) {
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        navigate("/login");
      } else {
        alert("Error al registrar. Verifica los datos.");
      }
    } catch (error) {
      alert("Error de conexión con el servidor");
    }
  };

  const onCaptchaChange = (value) => {
    setCaptchaValido(!!value);
  };

  return (
    <div className="contact" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div style={{ background: "#fff", padding: "40px", borderRadius: "20px", boxShadow: "0 5px 20px rgba(0,0,0,0.05)" }}>
                <div className="titlepage" style={{paddingBottom: '30px'}}>
                  <h2>Crea tu cuenta</h2>
                </div>

                <form className="contact_form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <label>RUT</label>
                      <input type="text" className="contact_control" placeholder="12345678-9" 
                        value={form.rut} onChange={(e) => setForm({ ...form, rut: e.target.value })} required />
                    </div>
                    <div className="col-md-6">
                      <label>Nombre</label>
                      <input type="text" className="contact_control" placeholder="Nombre completo" 
                        value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
                    </div>
                    <div className="col-md-6">
                      <label>Fecha Nacimiento</label>
                      <input type="text" className="contact_control" placeholder="YYYY-MM-DD"
                        value={form.fechaNac} onChange={(e) => setForm({ ...form, fechaNac: e.target.value })} required />
                    </div>
                    <div className="col-md-6">
                      <label>Teléfono</label>
                      <input type="text" className="contact_control" placeholder="+569..." 
                        value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} required />
                    </div>
                    <div className="col-md-6">
                      <label>Email</label>
                      <input type="email" className="contact_control" placeholder="correo@ejemplo.com" 
                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    </div>
                    <div className="col-md-6">
                      <label>Contraseña</label>
                      <input type="password" className="contact_control" placeholder="******" 
                        value={form.contraseña} onChange={(e) => setForm({ ...form, contraseña: e.target.value })} required />
                    </div>

                    <div className="col-md-12 mt-4 d-flex justify-content-center">
                      <ReCAPTCHA onChange={onCaptchaChange} />
                    </div>

                    <div className="col-md-12 mt-4">
                      <button type="submit" className="send_btn" style={{margin:'0 auto'}}>Registrarme</button>
                    </div>
                  </div>
                </form>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
}
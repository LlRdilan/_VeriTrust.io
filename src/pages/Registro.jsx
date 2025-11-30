import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReCAPTCHA from "../components/api/ReCaptcha";

export const validarRut = (rutCompleto) => {
  if (!rutCompleto) return false;
  let rutLimpio = rutCompleto.replace(/\./g, "").replace("-", "");
  if (rutLimpio.length < 2) return false;
  
  let cuerpo = rutLimpio.slice(0, -1);
  let dv = rutLimpio.slice(-1).toUpperCase();
  if (!/^\d+$/.test(cuerpo)) return false;

  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  let dvEsperado = 11 - (suma % 11);
  if (dvEsperado === 11) dvEsperado = "0";
  else if (dvEsperado === 10) dvEsperado = "K";
  else dvEsperado = dvEsperado.toString();

  return dv === dvEsperado;
};

export default function Registro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    rut: "",
    nombre: "",
    fecha: "",
    telefono: "",
    email: "",
    confirmarEmail: "",
    contraseña: "",
    confirmarContraseña: "",
    terminos: false,
  });

  const [errores, setErrores] = useState({});
  const [captchaValido, setCaptchaValido] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    let valido = true;

    const { rut, nombre, fecha, telefono, email, confirmarEmail, contraseña, confirmarContraseña, terminos } = form;

    if (!captchaValido) {
      alert("Debes completar el reCAPTCHA");
      return;
    }

    if (!validarRut(rut)) { nuevosErrores.rut = "RUT inválido"; valido = false; }
    if (nombre.length < 3) { nuevosErrores.nombre = "Ingresa un nombre válido"; valido = false; }
    
    if (!fecha) {
      nuevosErrores.fecha = "Ingresa tu fecha de nacimiento"; valido = false;
    } else {
      let FechaNac = new Date(fecha);
      let hoy = new Date();
      let edad = hoy.getFullYear() - FechaNac.getFullYear();
      if (edad < 18 || (edad === 18 && hoy < new Date(FechaNac.setFullYear(FechaNac.getFullYear() + 18)))) {
        nuevosErrores.fecha = "Debes ser mayor de 18 años"; valido = false;
      }
    }

    if (!/^\+?\d{7,15}$/.test(telefono.replace(/\s+/g, ""))) { nuevosErrores.telefono = "Número de teléfono inválido"; valido = false; }
    if (!email.includes("@")) { nuevosErrores.email = "Correo inválido"; valido = false; }
    if (email !== confirmarEmail) { nuevosErrores.confirmarEmail = "Los correos no coinciden"; valido = false; }
    if (contraseña.length < 6) { nuevosErrores.contraseña = "Mínimo 6 caracteres"; valido = false; }
    if (contraseña !== confirmarContraseña) { nuevosErrores.confirmarContraseña = "Las contraseñas no coinciden"; valido = false; }
    if (!terminos) { nuevosErrores.terminos = "Debes aceptar los términos"; valido = false; }

    setErrores(nuevosErrores);

    if (valido) {
      alert("Registro exitoso");
      navigate("/login");
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
            
            <div style={{
                background: "#fff",
                padding: "40px",
                borderRadius: "20px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.05)"
            }}>
                
                <div className="titlepage" style={{paddingBottom: '30px'}}>
                  <h2>Crea tu cuenta</h2>
                  <p style={{marginTop: '10px'}}>Únete a VeriTrust para gestionar tu identidad digital</p>
                </div>

                <form className="contact_form" onSubmit={handleSubmit}>
                  <div className="row">

                    <div className="col-md-6">
                      <label>RUT/RUN</label>
                      <input type="text" className="contact_control" placeholder="Ej: 12345678-9" 
                        value={form.rut} onChange={(e) => setForm({ ...form, rut: e.target.value })} required />
                      {errores.rut && <small style={{ color: "red", display:'block', marginTop:'-15px', marginBottom:'10px' }}>{errores.rut}</small>}
                    </div>

                    <div className="col-md-6">
                      <label>Nombre completo</label>
                      <input type="text" className="contact_control" placeholder="Tu nombre" 
                        value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
                      {errores.nombre && <small style={{ color: "red", display:'block', marginTop:'-15px', marginBottom:'10px' }}>{errores.nombre}</small>}
                    </div>

                    <div className="col-md-6">
                      <label>Fecha nacimiento</label>
                      <input type="date" className="contact_control" 
                        value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} required />
                      {errores.fecha && <small style={{ color: "red", display:'block', marginTop:'-15px', marginBottom:'10px' }}>{errores.fecha}</small>}
                    </div>

                    <div className="col-md-6">
                      <label>Teléfono</label>
                      <input type="tel" className="contact_control" placeholder="+569..." 
                        value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} required />
                      {errores.telefono && <small style={{ color: "red", display:'block', marginTop:'-15px', marginBottom:'10px' }}>{errores.telefono}</small>}
                    </div>

                    <div className="col-md-6">
                      <label>Correo electrónico</label>
                      <input type="email" className="contact_control" placeholder="nombre@correo.com" 
                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                      {errores.email && <small style={{ color: "red", display:'block', marginTop:'-15px', marginBottom:'10px' }}>{errores.email}</small>}
                    </div>

                    <div className="col-md-6">
                      <label>Confirmar correo</label>
                      <input type="email" className="contact_control" placeholder="Repite tu correo" 
                        value={form.confirmarEmail} onChange={(e) => setForm({ ...form, confirmarEmail: e.target.value })} required />
                      {errores.confirmarEmail && <small style={{ color: "red", display:'block', marginTop:'-15px', marginBottom:'10px' }}>{errores.confirmarEmail}</small>}
                    </div>

                    <div className="col-md-6">
                      <label>Contraseña</label>
                      <input type="password" className="contact_control" placeholder="******" 
                        value={form.contraseña} onChange={(e) => setForm({ ...form, contraseña: e.target.value })} required />
                      {errores.contraseña && <small style={{ color: "red", display:'block', marginTop:'-15px', marginBottom:'10px' }}>{errores.contraseña}</small>}
                    </div>

                    <div className="col-md-6">
                      <label>Confirmar contraseña</label>
                      <input type="password" className="contact_control" placeholder="******" 
                        value={form.confirmarContraseña} onChange={(e) => setForm({ ...form, confirmarContraseña: e.target.value })} required />
                      {errores.confirmarContraseña && <small style={{ color: "red", display:'block', marginTop:'-15px', marginBottom:'10px' }}>{errores.confirmarContraseña}</small>}
                    </div>

                    <div className="col-md-12 mt-3 text-center">
                      <div className="form-check d-inline-block">
                        <input type="checkbox" className="form-check-input" id="Terminos" 
                          checked={form.terminos} onChange={(e) => setForm({ ...form, terminos: e.target.checked })} />
                        
                        {/* AQUI ESTA EL CAMBIO: Link hacia /importante con target="_blank" */}
                        <label className="form-check-label" htmlFor="Terminos">
                          Acepto los <Link to="/importante" target="_blank" style={{color: '#0FB3D1', textDecoration: 'underline'}}>términos y condiciones</Link>
                        </label>

                      </div>
                      {errores.terminos && <small style={{ color: "red", display:'block' }}>{errores.terminos}</small>}
                    </div>

                    <div className="col-md-12 mt-4 d-flex justify-content-center">
                      <ReCAPTCHA onChange={onCaptchaChange} />
                    </div>

                    <div className="col-md-12 mt-4">
                      <button type="submit" className="send_btn" style={{margin:'0 auto'}}>Registrarme</button>
                    </div>
                    
                    <div className="col-md-12 mt-3 text-center">
                       <p>¿Ya tienes cuenta? <Link to="/login" style={{color: '#0FB3D1', fontWeight: 'bold'}}>Inicia Sesión</Link></p>
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
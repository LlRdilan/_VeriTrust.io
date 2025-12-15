import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReCAPTCHA from "../components/api/ReCaptcha";
import NotificationModal from "../components/ui/NotificacionModal";
import { validarRut, validarEmail, calcularEdad } from "../utils/validaciones";
import { handleError, handleHttpError } from "../services/errorHandler";
import { 
  obtenerRegiones, 
  obtenerComunasPorRegion, 
  obtenerRegionPorComuna,
  validarComunaRegion 
} from "../utils/regionesComunas";

export default function Registro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    rut: "",
    nombre: "",
    fechaNac: "",
    telefono: "",
    email: "",
    confirmarEmail: "",
    contraseña: "",
    confirmarContraseña: "",
    region: "",
    comuna: "",
    terminos: false,
  });
  
  const [errores, setErrores] = useState({});
  const [captchaValido, setCaptchaValido] = useState(false);
  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  const [regionesDisponibles, setRegionesDisponibles] = useState(obtenerRegiones());
  
  const [modal, setModal] = useState({ show: false, title: '', message: '', status: 'info' });
  const handleCloseModal = () => setModal({ show: false, title: '', message: '', status: 'info' });

  const validateForm = () => {
    const nuevosErrores = {};
    let valido = true;

    if (!validarRut(form.rut)) {
        nuevosErrores.rut = "RUT inválido"; valido = false;
    }
    if (form.nombre.length < 3) {
        nuevosErrores.nombre = "Ingresa un nombre válido"; valido = false;
    }
    if (!form.fechaNac) {
        nuevosErrores.fechaNac = "Ingresa tu fecha de nacimiento"; valido = false;
    } else {
        const edad = calcularEdad(form.fechaNac);
        if (edad < 18) {
            nuevosErrores.fechaNac = "Debes ser mayor de 18 años"; valido = false;
        }
    }
    if (!validarEmail(form.email)) { nuevosErrores.email = "Correo inválido"; valido = false; }
    if (form.email !== form.confirmarEmail) { nuevosErrores.confirmarEmail = "Los correos no coinciden"; valido = false; }
    
    if (form.contraseña.length < 6) { nuevosErrores.contraseña = "Mínimo 6 caracteres"; valido = false; }
    if (form.contraseña !== form.confirmarContraseña) { nuevosErrores.confirmarContraseña = "Las contraseñas no coinciden"; valido = false; }
    
    if (!form.region) {
        nuevosErrores.region = "Debes seleccionar una región"; valido = false;
    }
    
    if (!form.comuna) {
        nuevosErrores.comuna = "Debes seleccionar una comuna"; valido = false;
    } else if (form.region && !validarComunaRegion(form.comuna, form.region)) {
        nuevosErrores.comuna = "La comuna seleccionada no pertenece a la región seleccionada"; valido = false;
    }
    
    if (!form.terminos) {
        nuevosErrores.terminos = "Debes aceptar los términos y condiciones"; valido = false;
    }
    
    setErrores(nuevosErrores);
    return valido;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCloseModal();

    if (!captchaValido) {
      setModal({ show: true, title: "Error de Seguridad", message: "Debes completar el reCAPTCHA.", status: "error" });
      return;
    }

    if (!validateForm()) {
        setModal({ show: true, title: "Verifica el Formulario", message: "Existen errores en los datos ingresados. Revisa los campos marcados.", status: "warning" });
        return;
    }

    try {
      const userData = {
          rut: form.rut,
          nombre: form.nombre,
          fechaNac: form.fechaNac,
          telefono: form.telefono,
          email: form.email,
          contraseña: form.contraseña,
          // region y comuna no están en el UsuarioDTO del backend, se eliminan
      };

      const response = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData), 
      });

      if (response.ok) {
        setModal({ show: true, title: "Registro Exitoso", message: "¡Tu cuenta ha sido creada! Ahora puedes iniciar sesión.", status: "success" });
        setTimeout(() => navigate("/login"), 1500); 
      } else {
        const errorInfo = await handleHttpError(response);
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
    }
  };

  const onCaptchaChange = (value) => {
    setCaptchaValido(!!value);
  };

  const handleRegionChange = (e) => {
    const regionSeleccionada = e.target.value;
    const comunas = regionSeleccionada ? obtenerComunasPorRegion(regionSeleccionada) : [];
    
    setForm(prev => {
      // Si hay una comuna seleccionada y no pertenece a la nueva región, limpiarla
      if (prev.comuna && regionSeleccionada && !comunas.includes(prev.comuna)) {
        return { ...prev, region: regionSeleccionada, comuna: "" };
      }
      return { ...prev, region: regionSeleccionada };
    });
    
    setComunasDisponibles(comunas);
    
    // Si se seleccionó una región, actualizar las regiones disponibles para mostrar todas
    setRegionesDisponibles(obtenerRegiones());
  };

  const handleComunaChange = (e) => {
    const comunaSeleccionada = e.target.value;
    const regionDeComuna = comunaSeleccionada ? obtenerRegionPorComuna(comunaSeleccionada) : null;
    
    setForm(prev => {
      // Si se selecciona una comuna, establecer su región automáticamente
      if (comunaSeleccionada && regionDeComuna) {
        // Si ya hay una región seleccionada y no coincide, actualizar la región
        return { ...prev, comuna: comunaSeleccionada, region: regionDeComuna };
      }
      // Si se limpia la comuna, mantener la región si existe
      return { ...prev, comuna: comunaSeleccionada };
    });
    
    // Si se selecciona una comuna, filtrar las regiones disponibles para mostrar solo la de esa comuna
    if (comunaSeleccionada && regionDeComuna) {
      setRegionesDisponibles([regionDeComuna]);
      setComunasDisponibles(obtenerComunasPorRegion(regionDeComuna));
    } else {
      // Si se limpia la comuna, restaurar todas las regiones disponibles
      setRegionesDisponibles(obtenerRegiones());
      // Si hay una región seleccionada, mostrar sus comunas
      const regionActual = comunaSeleccionada === "" ? form.region : null;
      if (regionActual) {
        setComunasDisponibles(obtenerComunasPorRegion(regionActual));
      } else {
        // Si no hay región, no mostrar comunas (o todas si se quiere permitir selección de comuna primero)
        setComunasDisponibles([]);
      }
    }
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
                      <input type="text" className="contact_control" placeholder="12.345.678-9 (Sin puntos ni guion)" 
                        value={form.rut} onChange={(e) => setForm({ ...form, rut: e.target.value })} required />
                      {errores.rut && <small style={{ color: "red" }}>{errores.rut}</small>}
                    </div>
                    <div className="col-md-6">
                      <label>Nombre</label>
                      <input type="text" className="contact_control" placeholder="Nombre completo" 
                        value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
                      {errores.nombre && <small style={{ color: "red" }}>{errores.nombre}</small>}
                    </div>
                    <div className="col-md-6">
                      <label>Fecha Nacimiento</label>
                      <input type="date" className="contact_control" 
                        value={form.fechaNac} onChange={(e) => setForm({ ...form, fechaNac: e.target.value })} required />
                      {errores.fechaNac && <small style={{ color: "red" }}>{errores.fechaNac}</small>}
                    </div>
                    <div className="col-md-6">
                      <label>Teléfono</label>
                      <input type="text" className="contact_control" placeholder="+569..." 
                        value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} required />
                      {errores.telefono && <small style={{ color: "red" }}>{errores.telefono}</small>}
                    </div>
                    <div className="col-md-6">
                      <label>Email</label>
                      <input type="email" className="contact_control" placeholder="correo@ejemplo.com" 
                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                      {errores.email && <small style={{ color: "red" }}>{errores.email}</small>}
                    </div>
                    <div className="col-md-6">
                      <label>Confirmar Email</label>
                      <input type="email" className="contact_control" placeholder="Repite tu correo" 
                        value={form.confirmarEmail} onChange={(e) => setForm({ ...form, confirmarEmail: e.target.value })} required />
                      {errores.confirmarEmail && <small style={{ color: "red" }}>{errores.confirmarEmail}</small>}
                    </div>
                    <div className="col-md-6">
                      <label>Contraseña</label>
                      <input type="password" className="contact_control" placeholder="****** (Min. 6 caracteres)" 
                        value={form.contraseña} onChange={(e) => setForm({ ...form, contraseña: e.target.value })} required />
                      {errores.contraseña && <small style={{ color: "red" }}>{errores.contraseña}</small>}
                    </div>
                    <div className="col-md-6">
                      <label>Confirmar Contraseña</label>
                      <input type="password" className="contact_control" placeholder="Repite la contraseña" 
                        value={form.confirmarContraseña} onChange={(e) => setForm({ ...form, confirmarContraseña: e.target.value })} required />
                      {errores.confirmarContraseña && <small style={{ color: "red" }}>{errores.confirmarContraseña}</small>}
                    </div>
                    <div className="col-md-6">
                      <label>Región</label>
                      <select 
                        className="contact_control" 
                        value={form.region} 
                        onChange={handleRegionChange}
                        required
                      >
                        <option value="">Selecciona una región</option>
                        {regionesDisponibles.map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                      {errores.region && <small style={{ color: "red" }}>{errores.region}</small>}
                    </div>
                    <div className="col-md-6">
                      <label>Comuna</label>
                      <select 
                        className="contact_control" 
                        value={form.comuna} 
                        onChange={handleComunaChange}
                        required
                      >
                        <option value="">Selecciona una comuna</option>
                        {comunasDisponibles.length > 0 ? (
                          comunasDisponibles.map((comuna) => (
                            <option key={comuna} value={comuna}>
                              {comuna}
                            </option>
                          ))
                        ) : form.region ? (
                          obtenerComunasPorRegion(form.region).map((comuna) => (
                            <option key={comuna} value={comuna}>
                              {comuna}
                            </option>
                          ))
                        ) : (
                          // Si no hay región seleccionada, mostrar todas las comunas para permitir selección primero
                          obtenerRegiones().flatMap(region => 
                            obtenerComunasPorRegion(region).map(comuna => (
                              <option key={comuna} value={comuna}>
                                {comuna}
                              </option>
                            ))
                          )
                        )}
                      </select>
                      {errores.comuna && <small style={{ color: "red" }}>{errores.comuna}</small>}
                    </div>

                    <div className="col-md-12 mt-3 text-center">
                      <div className="form-check d-inline-block">
                        <input type="checkbox" className="form-check-input" id="Terminos" 
                          checked={form.terminos} onChange={(e) => setForm({ ...form, terminos: e.target.checked })} />
                        
                        <label className="form-check-label" htmlFor="Terminos">
                          Acepto los <Link to="/importante" target="_blank" style={{color: '#0FB3D1', fontWeight: 'bold'}}>términos y condiciones</Link>
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
                  </div>
                </form>
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
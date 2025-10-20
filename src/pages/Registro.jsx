import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "../components/api/ReCaptcha";

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

  const validarRut = (rutCompleto) => {
    let rutLimpio = rutCompleto.replace(/\./g, "").replace("-", "");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    let valido = true;

    const {
      rut,
      nombre,
      fecha,
      telefono,
      email,
      confirmarEmail,
      contraseña,
      confirmarContraseña,
      terminos,
    } = form;

    if (!captchaValido) {
      alert("Debes completar el reCAPTCHA");
      return;
    }

    if (!validarRut(rut)) {
      nuevosErrores.rut = "RUT inválido";
      valido = false;
    }

    if (nombre.length < 3) {
      nuevosErrores.nombre = "Ingresa un nombre válido";
      valido = false;
    }

    if (!fecha) {
      nuevosErrores.fecha = "Ingresa tu fecha de nacimiento";
      valido = false;
    } else {
      let FechaNac = new Date(fecha);
      let hoy = new Date();
      let edad = hoy.getFullYear() - FechaNac.getFullYear();
      if (
        edad < 18 ||
        (edad === 18 &&
          hoy < new Date(FechaNac.setFullYear(FechaNac.getFullYear() + 18)))
      ) {
        nuevosErrores.fecha = "Debes ser mayor de 18 años";
        valido = false;
      }
    }

    if (!/^\+?\d{7,15}$/.test(telefono.replace(/\s+/g, ""))) {
      nuevosErrores.telefono = "Número de teléfono inválido";
      valido = false;
    }

    if (!email.includes("@")) {
      nuevosErrores.email = "Correo inválido";
      valido = false;
    }

    if (email !== confirmarEmail) {
      nuevosErrores.confirmarEmail = "Los correos no coinciden";
      valido = false;
    }

    if (contraseña.length < 6) {
      nuevosErrores.contraseña = "La contraseña debe tener al menos 6 caracteres";
      valido = false;
    }

    if (contraseña !== confirmarContraseña) {
      nuevosErrores.confirmarContraseña = "Las contraseñas no coinciden";
      valido = false;
    }

    if (!terminos) {
      nuevosErrores.terminos = "Debes aceptar los términos y condiciones";
      valido = false;
    }

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
    <div className="contact" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="titlepage">
              <h2 className="yellow">Crea tu cuenta para acceder a nuestros servicios</h2>
            </div>

            <form className="contact_form" onSubmit={handleSubmit}>
              <div className="row">

                <div className="col-md-12">
                  <label>RUT/RUN (Sin punto, pero con guion)</label>
                  <input
                    type="text"
                    className="contact_control"
                    placeholder="Ej: 12345678-9"
                    value={form.rut}
                    onChange={(e) => setForm({ ...form, rut: e.target.value })}
                    required
                  />
                  {errores.rut && <small style={{ color: "red" }}>{errores.rut}</small>}
                </div>

                <div className="col-md-12">
                  <label>Nombre completo</label>
                  <input
                    type="text"
                    className="contact_control"
                    placeholder="Ingresa tu nombre completo"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    required
                  />
                  {errores.nombre && <small style={{ color: "red" }}>{errores.nombre}</small>}
                </div>

                <div className="col-md-12">
                  <label>Fecha de nacimiento</label>
                  <input
                    type="date"
                    className="contact_control"
                    value={form.fecha}
                    onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                    required
                  />
                  {errores.fecha && <small style={{ color: "red" }}>{errores.fecha}</small>}
                </div>

                <div className="col-md-12">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    className="contact_control"
                    placeholder="Ej: +569 1234 5678"
                    value={form.telefono}
                    onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                    required
                  />
                  {errores.telefono && <small style={{ color: "red" }}>{errores.telefono}</small>}
                </div>

                <div className="col-md-12">
                  <label>Correo electrónico</label>
                  <input
                    type="email"
                    className="contact_control"
                    placeholder="Ingresa tu correo electrónico"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                  {errores.email && <small style={{ color: "red" }}>{errores.email}</small>}
                </div>

                <div className="col-md-12">
                  <label>Confirma tu correo electrónico</label>
                  <input
                    type="email"
                    className="contact_control"
                    placeholder="Repite tu correo electrónico"
                    value={form.confirmarEmail}
                    onChange={(e) => setForm({ ...form, confirmarEmail: e.target.value })}
                    required
                  />
                  {errores.confirmarEmail && (
                    <small style={{ color: "red" }}>{errores.confirmarEmail}</small>
                  )}
                </div>

                <div className="col-md-12">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    className="contact_control"
                    placeholder="Crea una contraseña"
                    value={form.contraseña}
                    onChange={(e) => setForm({ ...form, contraseña: e.target.value })}
                    required
                  />
                  {errores.contraseña && <small style={{ color: "red" }}>{errores.contraseña}</small>}
                </div>

                <div className="col-md-12">
                  <label>Confirma tu contraseña</label>
                  <input
                    type="password"
                    className="contact_control"
                    placeholder="Repite tu contraseña"
                    value={form.confirmarContraseña}
                    onChange={(e) => setForm({ ...form, confirmarContraseña: e.target.value })}
                    required
                  />
                  {errores.confirmarContraseña && (
                    <small style={{ color: "red" }}>{errores.confirmarContraseña}</small>
                  )}
                </div>

                <div className="col-md-12 mt-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="Terminos"
                      checked={form.terminos}
                      onChange={(e) => setForm({ ...form, terminos: e.target.checked })}
                    />
                    <label className="form-check-label">
                      Acepto los <a href="#">términos y condiciones</a>
                    </label>
                  </div>
                  {errores.terminos && (
                    <small style={{ color: "red" }}>{errores.terminos}</small>
                  )}
                </div>

                <div className="col-md-12 mt-3 d-flex justify-content-center">
                  <ReCAPTCHA
                    sitekey="TU_SITE_KEY_AQUI"
                    onChange={onCaptchaChange}
                  />
                </div>

                <div className="col-md-12 mt-3">
                  <button type="submit" className="send_btn">
                    Crear cuenta
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    suma += parseInt(cuerpo[i], 10) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  let dvEsperado = 11 - (suma % 11);
  if (dvEsperado === 11) dvEsperado = "0";
  else if (dvEsperado === 10) dvEsperado = "K";
  else dvEsperado = dvEsperado.toString();

  return dv === dvEsperado;
};

export default function Login() {
  const [rut, setRut] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [captchaValido, setCaptchaValido] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!captchaValido) {
      alert("Debes completar el reCAPTCHA");
      return;
    }

    if (!validarRut(rut)) {
      setError("RUT inválido");
      return;
    }

    setCargando(true);

    try {
      const response = await fetch("http://localhost:8080/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            rut: rut,
            contraseña: contraseña 
        }),
      });

      if (response.ok) {
        const usuario = await response.json();
        
        const sessionData = {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          rut: usuario.rut,
          rol: usuario.rol || "user"
        };

        localStorage.setItem("user_session", JSON.stringify(sessionData));
        navigate("/admin"); 
      } else if (response.status === 401) {
        setError("RUT o contraseña incorrectos");
      } else {
        setError(`Error del servidor (${response.status})`);
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setCargando(false);
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
              <h2><strong className="yellow">Iniciar Sesión</strong></h2>
            </div>
            <form className="contact_form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <label>RUT (Sin puntos y con guion)</label>
                  <input
                    type="text"
                    className="contact_control"
                    placeholder="Ej: 12345678-9"
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-12">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    className="contact_control"
                    placeholder="Ingresa tu contraseña"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                  />
                  {error && <small className="error" style={{ color: "red" }}>{error}</small>}
                </div>

                <div className="col-md-12 mt-3 justify-content-center d-flex">
                  <ReCAPTCHA onChange={onCaptchaChange} />
                </div>

                <div className="col-md-12 mt-3">
                  <button type="submit" className="send_btn" disabled={cargando}>
                    {cargando ? "Cargando..." : "Ingresar"}
                  </button>
                </div>
                <div className="col-md-12 mt-3 text-center">
                  <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
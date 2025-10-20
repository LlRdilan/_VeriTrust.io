import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [rut, setRut] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [errorRut, setErrorRut] = useState("");
  const [errorContraseña, setErrorContraseña] = useState("");

  const navigate = useNavigate();

  const validarRut = (rutCompleto) => {
    let rutSinPuntos = rutCompleto.replace(/\./g, "").replace("-", "");
    let cuerpo = rutSinPuntos.slice(0, -1);
    let dv = rutSinPuntos.slice(-1).toUpperCase();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorRut("");
    setErrorContraseña("");

    if (!validarRut(rut)) {
      setErrorRut("RUT inválido");
      return;
    }

    // Usuario prueba
    if (!(rut === "21867698-7" && contraseña === "admin")) {
      setErrorContraseña("Usuario o contraseña incorrectos");
      return;
    }

    // Guardar sesión y redirigir
    try {
      localStorage.setItem("adminLogged", "1");
    } catch {
      sessionStorage.setItem("adminLogged", "1");
    }

    navigate("/admin");
  };

  return (
    <div className="contact" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="titlepage">
              <h2>
                <strong className="yellow">Iniciar Sesión</strong>
                <br />
                Accede a tu cuenta
              </h2>
            </div>
            <form className="contact_form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="InputRut">RUT/RUN (Sin punto, pero con guion)</label>
                  <input
                    type="text"
                    className="contact_control"
                    id="InputRut"
                    placeholder="Ej: 12345678-9"
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                    required
                  />
                  {errorRut && <small className="error" style={{ color: "red" }}>{errorRut}</small>}
                </div>

                <div className="col-md-12">
                  <label htmlFor="InputContraseña">Contraseña</label>
                  <input
                    type="password"
                    className="contact_control"
                    id="InputContraseña"
                    placeholder="Ingresa tu contraseña"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                  />
                  {errorContraseña && <small className="error" style={{ color: "red" }}>{errorContraseña}</small>}
                </div>

                <div className="col-md-12 mt-3">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="Recuerdame" />
                    <label className="form-check-label" htmlFor="Recuerdame">Recuérdame</label>
                  </div>
                </div>

                <div className="col-md-12">
                  <button type="submit" className="send_btn">Ingresar</button>
                </div>

                <div className="col-md-12 mt-3 text-center">
                  <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
                  <p><a href="#">¿Olvidaste tu contraseña?</a></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

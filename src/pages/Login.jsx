import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function validarRut(rutCompleto) {
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
}

export default function Login() {
  const [rut, setRut] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [errorRut, setErrorRut] = useState("");
  const [errorContraseña, setErrorContraseña] = useState("");

  const navegar = useNavigate();

  const manejarEnvio = (e) => {
    e.preventDefault();
    setErrorRut("");
    setErrorContraseña("");

    if (!validarRut(rut)) {
      setErrorRut("RUT invalido");
      return;
    }

    if (!(rut === "21867698-7" && contraseña === "admin")) {
      setErrorContraseña("Usuario o contraseña incorrectos");
      return;
    }

    try {
      localStorage.setItem("adminLogged", "1");
    } catch {
      sessionStorage.setItem("adminLogged", "1");
    }

    navegar("/admin");
  };

  return (
    <div className="contact" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="titlepage">
              <h2>
                <strong className="yellow">Iniciar Sesion</strong>
                <br />
                Accede a tu cuenta
              </h2>
            </div>
            <form className="contact_form" onSubmit={manejarEnvio}>
              <div className="row">
                <div className="col-md-12">
                  <label>RUT/RUN (Sin punto, pero con guion)</label>
                  <input
                    type="text"
                    className="contact_control"
                    placeholder="Ej: 12345678-9"
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                    required
                  />
                  {errorRut && <small style={{ color: "red" }}>{errorRut}</small>}
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
                  {errorContraseña && <small style={{ color: "red" }}>{errorContraseña}</small>}
                </div>

                <div className="col-md-12 mt-3">
                  <button type="submit" className="send_btn">Ingresar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

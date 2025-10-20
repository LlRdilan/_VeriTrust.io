import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "../components/api/ReCaptcha";

export default function Login() {
  const [rut, setRut] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [errorRut, setErrorRut] = useState("");
  const [errorContraseña, setErrorContraseña] = useState("");
  const [captchaValido, setCaptchaValido] = useState(false);

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

    if (!captchaValido) {
      alert("Debes completar el reCAPTCHA");
      return;
    }

    if (!validarRut(rut)) {
      setErrorRut("RUT inválido");
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

    navigate("/admin");
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

                <div className="col-md-12 mt-3 justify-content-center d-flex">
                  <ReCAPTCHA
                    sitekey="6Lc4UPArAAAAABbDqu7ecWIfeTKE5bbuhfs0Px4_"
                    onChange={onCaptchaChange}
                  />
                </div>

                <div className="col-md-12 mt-3">
                  <button type="submit" className="send_btn">Ingresar</button>
                </div>
                <div className="col-md-12 mt-3 text-center">
                  <p>¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
                  <p><Link to="/importante">¿Olvidaste tu contraseña?</Link></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

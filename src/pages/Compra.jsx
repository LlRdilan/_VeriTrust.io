import { useState } from "react";
import ReCAPTCHA from "../components/api/ReCaptcha";

export default function Compra() {
  const [nombreTarjeta, setNombreTarjeta] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [mesExpiracion, setMesExpiracion] = useState("");
  const [anioExpiracion, setAnioExpiracion] = useState("");
  const [cvv, setCvv] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  const validarNumeroTarjeta = (numero) => {
    let suma = 0;
    let doble = false;
    for (let i = numero.length - 1; i >= 0; i--) {
      let digito = parseInt(numero.charAt(i), 10);
      if (doble) {
        digito *= 2;
        if (digito > 9) digito -= 9;
      }
      suma += digito;
      doble = !doble;
    }
    return suma % 10 === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    setMensajeError("");

    if (!captchaToken) {
      alert("Por favor completa el captcha");
      return;
    }

    if (!/^\d{16}$/.test(numeroTarjeta) || !validarNumeroTarjeta(numeroTarjeta)) {
      setMensajeError("Numero de tarjeta invalido");
      return;
    }

    const mes = parseInt(mesExpiracion, 10);
    if (!/^\d{2}$/.test(mesExpiracion) || mes < 1 || mes > 12) {
      setMensajeError("Mes de expiracion invalido");
      return;
    }

    const anioActual = new Date().getFullYear();
    const anio = parseInt(anioExpiracion, 10);
    if (!/^\d{4}$/.test(anioExpiracion) || anio < anioActual) {
      setMensajeError("Anio de expiracion invalido");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      setMensajeError("CVV invalido");
      return;
    }

    alert("Compra realizada con exito");

    setNombreTarjeta("");
    setNumeroTarjeta("");
    setMesExpiracion("");
    setAnioExpiracion("");
    setCvv("");
    setMensajeError("");
    setCaptchaToken(null);
  };

  return (
    <main className="container" style={{ padding: "60px 0" }}>
      <h1 className="text-center">Compra tu servicio VeriTrust</h1>

      <div
        className="card"
        style={{
          padding: "30px",
          maxWidth: "600px",
          margin: "40px auto",
          boxShadow: "0 2px 8px rgba(11,31,46,0.1)",
          borderRadius: "12px",
          background: "#fff"
        }}
      >
        <h2 className="text-center" style={{ marginBottom: "25px", color: "#0FB3D1" }}>
          Detalles de tu compra
        </h2>

        <form onSubmit={manejarEnvio}>

          <div className="form-group">
            <label htmlFor="nombreTarjeta">Nombre en la tarjeta:</label>
            <input
              type="text"
              id="nombreTarjeta"
              className="form-control"
              value={nombreTarjeta}
              onChange={(e) => setNombreTarjeta(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="numeroTarjeta">Numero de tarjeta:</label>
            <input
              type="text"
              id="numeroTarjeta"
              maxLength={16}
              className="form-control"
              value={numeroTarjeta}
              onChange={(e) => setNumeroTarjeta(e.target.value)}
              required
            />
          </div>
          <div className="row">
            <div className="col-md-6 form-group">
              <label htmlFor="mesExpiracion">Mes de expiracion:</label>
              <input
                type="text"
                id="mesExpiracion"
                maxLength={2}
                placeholder="MM"
                className="form-control"
                value={mesExpiracion}
                onChange={(e) => setMesExpiracion(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="anioExpiracion">Año de expiracion:</label>
              <input
                type="text"
                id="anioExpiracion"
                maxLength={4}
                placeholder="AAAA"
                className="form-control"
                value={anioExpiracion}
                onChange={(e) => setAnioExpiracion(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              maxLength={3}
              className="form-control"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>

          <div className="col-md-12 mt-3 justify-content-center d-flex">
            <ReCAPTCHA onChange={(token) => setCaptchaToken(token)} />
          </div>

          <div className="form-group text-center mt-3">
            <button className="comprar_btn" type="submit">Pagar</button>
          </div>

          {mensajeError && <div style={{ color: "red", marginTop: "10px" }}>{mensajeError}</div>}
        </form>
      </div>
    </main>
  );
}

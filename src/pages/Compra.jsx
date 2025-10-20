import { useState } from "react";

export default function Compra() {
  const [nombreTarjeta, setNombreTarjeta] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [mesExp, setMesExp] = useState("");
  const [anoExp, setAnoExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const validarTarjeta = (numero) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensajeError("");

    // Validar número de tarjeta
    if (!/^\d{16}$/.test(numeroTarjeta) || !validarTarjeta(numeroTarjeta)) {
      setMensajeError("Número de tarjeta inválido");
      return;
    }

    // Validar mes
    const mes = parseInt(mesExp, 10);
    if (!/^\d{2}$/.test(mesExp) || mes < 1 || mes > 12) {
      setMensajeError("Mes de expiración inválido");
      return;
    }

    // Validar año
    const añoActual = new Date().getFullYear();
    const año = parseInt(anoExp, 10);
    if (!/^\d{4}$/.test(anoExp) || año < añoActual) {
      setMensajeError("Año de expiración inválido");
      return;
    }

    // Validar CVV
    if (!/^\d{3}$/.test(cvv)) {
      setMensajeError("CVV inválido");
      return;
    }

    alert("Compra realizada con éxito!");

    // Resetear formulario
    setNombreTarjeta("");
    setNumeroTarjeta("");
    setMesExp("");
    setAnoExp("");
    setCvv("");
    setMensajeError("");
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

        <form onSubmit={handleSubmit}>
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
            <label htmlFor="numeroTarjeta">Número de tarjeta:</label>
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
              <label htmlFor="mesExp">Mes de expiración:</label>
              <input
                type="text"
                id="mesExp"
                maxLength={2}
                placeholder="MM"
                className="form-control"
                value={mesExp}
                onChange={(e) => setMesExp(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="anoExp">Año de expiración:</label>
              <input
                type="text"
                id="anoExp"
                maxLength={4}
                placeholder="AAAA"
                className="form-control"
                value={anoExp}
                onChange={(e) => setAnoExp(e.target.value)}
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

          <div className="form-group text-center">
            <button className="comprar_btn" type="submit">Pagar</button>
          </div>

          {mensajeError && <div style={{ color: "red", marginTop: "10px" }}>{mensajeError}</div>}
        </form>
      </div>
    </main>
  );
}

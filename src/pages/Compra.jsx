import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Importamos hooks necesarios
import ReCAPTCHA from "../components/api/ReCaptcha";

// Función de validación de tarjeta (Algoritmo de Luhn)
export function validarNumeroTarjeta(numero) {
  if (typeof numero !== "string") return false;
  if (!/^\d{16}$/.test(numero)) return false;

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
}

export default function Compra() {
  // Hooks para recibir datos
  const location = useLocation();
  const navigate = useNavigate();
  const servicio = location.state; // Aquí vienen los datos desde Servicios.jsx

  // Estados del formulario
  const [nombreTarjeta, setNombreTarjeta] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [mesExpiracion, setMesExpiracion] = useState("");
  const [anioExpiracion, setAnioExpiracion] = useState("");
  const [cvv, setCvv] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  // Validación de seguridad: Si no hay servicio seleccionado, volver atrás
  useEffect(() => {
    if (!servicio) {
      navigate("/servicios");
    }
  }, [servicio, navigate]);

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

    alert(`¡Compra Exitosa! Has adquirido: ${servicio.nombre}`);
    
    // Limpiar formulario
    setNombreTarjeta("");
    setNumeroTarjeta("");
    setMesExpiracion("");
    setAnioExpiracion("");
    setCvv("");
    setMensajeError("");
    setCaptchaToken(null);
    navigate("/"); // Volver al inicio
  };

  // Si no hay servicio cargado (mientras redirige), no mostrar nada
  if (!servicio) return null;

  return (
    <main className="container" style={{ padding: "60px 0" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="titlepage">
                <h2>Finalizar Compra</h2>
            </div>

            <div
                className="card"
                style={{
                padding: "30px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
                borderRadius: "20px",
                background: "#fff",
                border: "none"
                }}
            >
                {/* --- RESUMEN DEL PEDIDO --- */}
                <div style={{
                    backgroundColor: "#f7fafc", 
                    padding: "20px", 
                    borderRadius: "15px", 
                    marginBottom: "30px",
                    borderLeft: "5px solid #0FB3D1"
                }}>
                    <h3 style={{color: "#1f235e", fontWeight: "700", fontSize: "20px", marginBottom: "15px"}}>
                        Resumen del Pedido
                    </h3>
                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "5px"}}>
                        <span>Servicio:</span>
                        <span style={{fontWeight: "600"}}>{servicio.nombre}</span>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "5px", color: "#666"}}>
                        <span>Precio Neto:</span>
                        <span>${servicio.neto.toLocaleString()}</span>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", color: "#666"}}>
                        <span>IVA (19%):</span>
                        <span>${servicio.iva.toLocaleString()}</span>
                    </div>
                    <hr style={{margin: "10px 0"}}/>
                    <div style={{display: "flex", justifyContent: "space-between", fontSize: "22px", fontWeight: "bold", color: "#1f235e"}}>
                        <span>Total a Pagar:</span>
                        <span>${servicio.total.toLocaleString()}</span>
                    </div>
                </div>

                {/* --- FORMULARIO DE PAGO --- */}
                <h4 style={{color: "#0FB3D1", fontWeight: "600", marginBottom: "20px"}}>Datos de Pago</h4>
                
                <form onSubmit={manejarEnvio}>
                <div className="form-group mb-3">
                    <label>Nombre en la tarjeta</label>
                    <input
                    type="text"
                    className="form-control"
                    value={nombreTarjeta}
                    onChange={(e) => setNombreTarjeta(e.target.value)}
                    required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Numero de tarjeta</label>
                    <input
                    type="text"
                    maxLength={16}
                    className="form-control"
                    value={numeroTarjeta}
                    onChange={(e) => setNumeroTarjeta(e.target.value)}
                    required
                    />
                </div>
                <div className="row">
                    <div className="col-md-6 form-group mb-3">
                    <label>Mes (MM)</label>
                    <input
                        type="text"
                        maxLength={2}
                        placeholder="MM"
                        className="form-control"
                        value={mesExpiracion}
                        onChange={(e) => setMesExpiracion(e.target.value)}
                        required
                    />
                    </div>
                    <div className="col-md-6 form-group mb-3">
                    <label>Año (AAAA)</label>
                    <input
                        type="text"
                        maxLength={4}
                        placeholder="AAAA"
                        className="form-control"
                        value={anioExpiracion}
                        onChange={(e) => setAnioExpiracion(e.target.value)}
                        required
                    />
                    </div>
                </div>
                <div className="form-group mb-4">
                    <label>CVV</label>
                    <input
                    type="text"
                    maxLength={3}
                    className="form-control"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                    />
                </div>

                <div className="col-md-12 mb-4 justify-content-center d-flex">
                    <ReCAPTCHA onChange={(token) => setCaptchaToken(token)} />
                </div>

                <div className="form-group text-center">
                    <button className="comprar_btn" type="submit" style={{maxWidth: '100%'}}>
                        Pagar ${servicio.total.toLocaleString()}
                    </button>
                </div>

                {mensajeError && <div style={{ color: "red", marginTop: "15px", textAlign: "center", fontWeight: "bold" }}>{mensajeError}</div>}
                </form>
            </div>
        </div>
      </div>
    </main>
  );
}
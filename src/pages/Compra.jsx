import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReCAPTCHA from "../components/api/ReCaptcha";

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
  const location = useLocation();
  const navigate = useNavigate();
  const servicio = location.state;

  const [nombreTarjeta, setNombreTarjeta] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [tipoTarjeta, setTipoTarjeta] = useState(""); 
  const [mesExpiracion, setMesExpiracion] = useState("");
  const [anioExpiracion, setAnioExpiracion] = useState("");
  const [cvv, setCvv] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  useEffect(() => {
    if (!servicio) {
      navigate("/servicios");
    }
  }, [servicio, navigate]);

  const detectarFranquicia = (numero) => {
    if (numero.startsWith("4")) return "visa";
    if (/^5[1-5]/.test(numero)) return "mastercard";
    if (/^3[47]/.test(numero)) return "amex";
    return "";
  };

  const manejarCambioNumero = (e) => {
    const valor = e.target.value;
    if (/^\d*$/.test(valor)) {
        setNumeroTarjeta(valor);
        setTipoTarjeta(detectarFranquicia(valor));
    }
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


    alert(`Pago aceptado. Redirigiendo a firma de documentos...`);
    navigate("/firma", { state: { servicio: servicio } });
  };

  if (!servicio) return null;

  return (
    <main className="container" style={{ padding: "60px 0" }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="titlepage">
                <h2>Finalizar Compra</h2>
            </div>

            <div className="card" style={{ padding: "30px", boxShadow: "0 5px 20px rgba(0,0,0,0.05)", borderRadius: "20px", background: "#fff", border: "none" }}>
                
                <div style={{ backgroundColor: "#f7fafc", padding: "20px", borderRadius: "15px", marginBottom: "30px", borderLeft: "5px solid #0FB3D1" }}>
                    <h3 style={{color: "#1f235e", fontWeight: "700", fontSize: "20px", marginBottom: "15px"}}>
                        Resumen del Pedido
                    </h3>
                    <div style={{display: "flex", justifyContent: "space-between", marginBottom: "5px"}}>
                        <span>Servicio:</span>
                        <span style={{fontWeight: "600"}}>{servicio.nombre}</span>
                    </div>
                    {servicio.neto && (
                      <>
                        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "5px", color: "#666"}}>
                            <span>Precio Neto:</span>
                            <span>${servicio.neto.toLocaleString()}</span>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "10px", color: "#666"}}>
                            <span>IVA (19%):</span>
                            <span>${servicio.iva.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                    <hr style={{margin: "10px 0"}}/>
                    <div style={{display: "flex", justifyContent: "space-between", fontSize: "22px", fontWeight: "bold", color: "#1f235e"}}>
                        <span>Total a Pagar:</span>
                        <span>${(servicio.total || servicio.price || 0).toLocaleString()}</span>
                    </div>
                </div>

                <h4 style={{color: "#0FB3D1", fontWeight: "600", marginBottom: "20px"}}>Datos de Pago</h4>
                
                <form onSubmit={manejarEnvio}>
                <div className="form-group mb-3">
                    <label>Nombre en la tarjeta</label>
                    <input type="text" className="form-control" value={nombreTarjeta} onChange={(e) => setNombreTarjeta(e.target.value)} required />
                </div>

                <div className="form-group mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <label>Numero de tarjeta</label>
                        <div style={{fontSize: '24px'}}>
                            <i className={`fa-brands fa-cc-visa ${tipoTarjeta === 'visa' ? '' : 'text-muted'}`} style={{marginRight: '10px', color: tipoTarjeta === 'visa' ? '#1A1F71' : '#ccc', transition: '0.3s'}}></i>
                            <i className={`fa-brands fa-cc-mastercard ${tipoTarjeta === 'mastercard' ? '' : 'text-muted'}`} style={{marginRight: '10px', color: tipoTarjeta === 'mastercard' ? '#EB001B' : '#ccc', transition: '0.3s'}}></i>
                            <i className={`fa-brands fa-cc-amex ${tipoTarjeta === 'amex' ? '' : 'text-muted'}`} style={{color: tipoTarjeta === 'amex' ? '#2E77BC' : '#ccc', transition: '0.3s'}}></i>
                        </div>
                    </div>
                    <input type="text" maxLength={16} className="form-control" placeholder="0000 0000 0000 0000" value={numeroTarjeta} onChange={manejarCambioNumero} required />
                </div>

                <div className="row">
                    <div className="col-md-6 form-group mb-3">
                    <label>Mes (MM)</label>
                    <input type="text" maxLength={2} placeholder="MM" className="form-control" value={mesExpiracion} onChange={(e) => setMesExpiracion(e.target.value)} required />
                    </div>
                    <div className="col-md-6 form-group mb-3">
                    <label>Año (AAAA)</label>
                    <input type="text" maxLength={4} placeholder="AAAA" className="form-control" value={anioExpiracion} onChange={(e) => setAnioExpiracion(e.target.value)} required />
                    </div>
                </div>
                <div className="form-group mb-4">
                    <label>CVV</label>
                    <input type="text" maxLength={3} className="form-control" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                </div>

                <div className="col-md-12 mb-4 justify-content-center d-flex">
                    <ReCAPTCHA onChange={(token) => setCaptchaToken(token)} />
                </div>

                <div className="form-group text-center">
                    <button className="comprar_btn" type="submit" style={{maxWidth: '100%'}}>
                        Pagar
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
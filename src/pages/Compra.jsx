import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReCAPTCHA from "../components/api/ReCaptcha";
import NotificationModal from "../components/ui/NotificacionModal";
import { getSession } from "../services/auth";
import { handleError, handleHttpError } from "../services/errorHandler";

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
  const servicio = location.state; // Datos que vienen de la pagina anterior

  const [nombreTarjeta, setNombreTarjeta] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [tipoTarjeta, setTipoTarjeta] = useState(""); 
  const [mesExpiracion, setMesExpiracion] = useState("");
  const [anioExpiracion, setAnioExpiracion] = useState("");
  const [cvv, setCvv] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [modal, setModal] = useState({ show: false, title: '', message: '', status: 'info' });
  const [cargando, setCargando] = useState(false);
  
  const handleCloseModal = () => setModal({ show: false, title: '', message: '', status: 'info' });

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

  const mostrarError = (msg) => {
    setModal({ show: true, title: "Error de Pago", message: msg, status: "error" });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    handleCloseModal();

    if (!captchaToken) {
      mostrarError("Por favor completa el captcha antes de pagar.");
      return;
    }

    if (!/^\d{16}$/.test(numeroTarjeta) || !validarNumeroTarjeta(numeroTarjeta)) {
      mostrarError("Número de tarjeta inválido.");
      return;
    }

    const mes = parseInt(mesExpiracion, 10);
    if (!/^\d{2}$/.test(mesExpiracion) || mes < 1 || mes > 12) {
      mostrarError("Mes de expiración inválido (formato MM).");
      return;
    }

    const hoy = new Date();
    const anioActual = hoy.getFullYear();
    const mesActual = hoy.getMonth() + 1; // getMonth() devuelve 0-11
    const anio = parseInt(anioExpiracion, 10);
    
    if (!/^\d{4}$/.test(anioExpiracion) || anio < anioActual) {
      mostrarError("Año de expiración inválido o expirado.");
      return;
    }
    
    // Si el año es el actual, validar que el mes no haya expirado
    if (anio === anioActual && mes < mesActual) {
      mostrarError("La tarjeta ha expirado este mes.");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      mostrarError("CVV inválido (debe tener 3 dígitos).");
      return;
    }

    // --- INTEGRACION CON BACKEND (NUEVO) ---
    const session = getSession();
    
    // Si no hay sesión, mandamos a login
    if (!session || !session.token) {
        mostrarError("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
        setTimeout(() => navigate("/login"), 2000);
        return;
    }

    setCargando(true);

    // Preparamos los datos para el Backend (CompraDTO)
    const compraData = {
        usuarioId: session.id,
        servicioId: servicio.id || servicio.servicioId, // Ajuste segun como venga el objeto
        fechaCompra: new Date().toLocaleDateString('es-CL').replace(/\//g, '-'), // Formato DD-MM-YYYY
        monto: servicio.total || servicio.price
    };

    try {
        const response = await fetch("http://localhost:8080/compras", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.token}` // ENVIAMOS EL TOKEN
            },
            body: JSON.stringify(compraData)
        });

        if (response.ok) {
            setModal({
                show: true,
                title: "Pago Aceptado",
                message: "¡La transacción ha sido procesada y guardada! Redirigiendo al proceso de firma...",
                status: "success"
            });
        
            setTimeout(() => {
                navigate("/firma", { state: { servicio: servicio } });
            }, 1500);
        } else {
            const errorInfo = await handleHttpError(response);
            mostrarError(errorInfo.message);
        }

    } catch (error) {
        const errorInfo = handleError(error);
        mostrarError(errorInfo.message);
    } finally {
        setCargando(false);
    }
  };

  if (!servicio) return null;

  return (
    <main className="container page-compra-container">
      <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="titlepage">
                <h2>Finalizar Compra</h2>
            </div>

            <div className="card compra-card">
                
                <div className="compra-summary">
                    <h3 className="compra-summary-title">
                        Resumen del Pedido
                    </h3>
                    <div className="compra-summary-row">
                        <span>Servicio:</span>
                        <span className="compra-summary-label">{servicio.nombre}</span>
                    </div>
                    {servicio.neto && (
                      <>
                        <div className="compra-summary-row-gray">
                            <span>Precio Neto:</span>
                            <span>${servicio.neto.toLocaleString()}</span>
                        </div>
                        <div className="compra-summary-row-gray">
                            <span>IVA (19%):</span>
                            <span>${servicio.iva.toLocaleString()}</span>
                        </div>
                      </>
                    )}
                    <hr className="compra-summary-divider"/>
                    <div className="compra-summary-total">
                        <span>Total a Pagar:</span>
                        <span>${(servicio.total || servicio.price || 0).toLocaleString()}</span>
                    </div>
                </div>

                <h4 className="compra-form-title">Datos de Pago</h4>
                
                <form onSubmit={manejarEnvio}>
                    <div className="form-group mb-3">
                        <label>Nombre en la tarjeta</label>
                        <input type="text" className="form-control" value={nombreTarjeta} onChange={(e) => setNombreTarjeta(e.target.value)} required />
                    </div>

                    <div className="form-group mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <label>Numero de tarjeta</label>
                            <div className="compra-card-icons">
                                <i className={`fa-brands fa-cc-visa compra-card-icon ${tipoTarjeta === 'visa' ? 'compra-card-icon-visa' : 'compra-card-icon-muted'}`}></i>
                                <i className={`fa-brands fa-cc-mastercard compra-card-icon ${tipoTarjeta === 'mastercard' ? 'compra-card-icon-mastercard' : 'compra-card-icon-muted'}`}></i>
                                <i className={`fa-brands fa-cc-amex compra-card-icon ${tipoTarjeta === 'amex' ? 'compra-card-icon-amex' : 'compra-card-icon-muted'}`}></i>
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
                        <button className="comprar_btn compra-submit-btn" type="submit" disabled={cargando}>
                            {cargando ? "Procesando..." : "Pagar"}
                        </button>
                    </div>

                </form>
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
    </main>
  );
}
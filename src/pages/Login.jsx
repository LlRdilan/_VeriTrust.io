import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "../components/api/ReCaptcha";
import NotificationModal from "../components/ui/NotificacionModal";
import { validarRut } from "../utils/validaciones";
import { setSession } from "../services/auth";
import { handleError, handleHttpError } from "../services/errorHandler";

export default function Login() {
  const [rut, setRut] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [captchaValido, setCaptchaValido] = useState(false);
  const [modal, setModal] = useState({ show: false, title: '', message: '', status: 'info' });

  const navigate = useNavigate();
  const handleCloseModal = () => setModal({ show: false, title: '', message: '', status: 'info' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!captchaValido) {
      setModal({ show: true, title: "Error de Seguridad", message: "Debes completar el reCAPTCHA", status: "warning" });
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
        const data = await response.json();
        
        // La respuesta del backend ahora trae "token" y "usuario"
        const usuario = data.usuario;
        const token = data.token;

        const sessionData = {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.email,
          rut: usuario.rut,
          rol: usuario.rol || "user",
          token: token // Guardamos el token en la sesión local
        };

        setSession(sessionData);

        if (sessionData.rol === "admin") {
            navigate("/admin");
        } else {
            navigate("/servicios");
        }

      } else {
        // Manejo específico para errores de login
        let errorTitle = "Error al Iniciar Sesión";
        let errorMessage = "No se pudo iniciar sesión.";
        let errorStatus = "error";

        // Intentar obtener el mensaje del servidor
        try {
          const errorData = await response.text();
          let serverMessage = errorData;
          
          try {
            const parsed = JSON.parse(errorData);
            serverMessage = parsed.message || parsed.error || errorData;
          } catch {
            // Si no es JSON, usar el texto directamente
          }

          // Convertir mensaje a minúsculas para buscar palabras clave
          const messageLower = serverMessage.toLowerCase();

          // Mensajes específicos según el código de estado
          if (response.status === 401) {
            // Intentar detectar si el usuario no existe o si la contraseña es incorrecta
            if (messageLower.includes("no encontrado") || 
                messageLower.includes("no existe") || 
                messageLower.includes("usuario no encontrado") ||
                messageLower.includes("no se encontró")) {
              errorTitle = "Usuario No Encontrado";
              errorMessage = "No existe una cuenta registrada con este RUT. ¿Deseas registrarte?";
              errorStatus = "warning";
            } else if (messageLower.includes("contraseña") || 
                       messageLower.includes("password") ||
                       messageLower.includes("incorrecta")) {
              errorTitle = "Contraseña Incorrecta";
              errorMessage = "La contraseña ingresada es incorrecta. Verifica tu contraseña e intenta nuevamente.";
              errorStatus = "warning";
            } else {
              // Por defecto, asumir que el usuario no existe (más seguro)
              errorTitle = "Usuario No Encontrado";
              errorMessage = "No existe una cuenta registrada con este RUT. Si ya tienes cuenta, verifica que hayas ingresado correctamente tu RUT y contraseña. ¿Deseas registrarte?";
              errorStatus = "warning";
            }
          } else if (response.status === 404) {
            errorTitle = "Usuario No Encontrado";
            errorMessage = "No existe una cuenta con este RUT. ¿Deseas registrarte?";
            errorStatus = "warning";
          } else if (response.status === 400) {
            errorTitle = "Error de Validación";
            errorMessage = serverMessage || "Los datos proporcionados no son válidos.";
            errorStatus = "warning";
          } else {
            errorMessage = serverMessage || `Error del servidor (${response.status})`;
          }
        } catch {
          // Si no se puede leer el error, usar mensajes por defecto
          if (response.status === 401) {
            // Por defecto, asumir que el usuario no existe
            errorTitle = "Usuario No Encontrado";
            errorMessage = "No existe una cuenta registrada con este RUT. Si ya tienes cuenta, verifica que hayas ingresado correctamente tu RUT y contraseña. ¿Deseas registrarte?";
            errorStatus = "warning";
          } else if (response.status === 404) {
            errorTitle = "Usuario No Encontrado";
            errorMessage = "No existe una cuenta con este RUT. ¿Deseas registrarte?";
            errorStatus = "warning";
          }
        }

        setModal({ show: true, title: errorTitle, message: errorMessage, status: errorStatus });
        setError(errorMessage);
      }
    } catch (err) {
      const errorInfo = handleError(err);
      setModal({ show: true, title: errorInfo.title, message: errorInfo.message, status: errorInfo.status });
      setError(errorInfo.message);
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

      <NotificationModal 
        show={modal.show}
        handleClose={handleCloseModal}
        title={modal.title}
        message={modal.message}
        status={modal.status}
      />
    </div>
  );
}
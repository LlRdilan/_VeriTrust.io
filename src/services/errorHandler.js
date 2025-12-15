/**
 * Servicio centralizado de manejo de errores
 */

/**
 * Maneja errores de manera consistente
 * @param {Error|Object} error - Error a manejar
 * @param {Object} options - Opciones adicionales
 * @returns {Object} - Objeto con información del error para mostrar al usuario
 */
export const handleError = (error, options = {}) => {
  const { 
    defaultMessage = "Ha ocurrido un error inesperado",
    showDetails = false 
  } = options;

  // Error de red (sin conexión, timeout, etc.)
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return {
      title: "Error de Conexión",
      message: "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
      status: "error",
      type: "network"
    };
  }

  // Error de timeout
  if (error.name === "TimeoutError" || error.message?.includes("timeout")) {
    return {
      title: "Tiempo de Espera Agotado",
      message: "La solicitud tardó demasiado. Por favor, intenta nuevamente.",
      status: "error",
      type: "timeout"
    };
  }

  // Error del servidor (500, 502, 503, etc.)
  if (error.status >= 500) {
    return {
      title: "Error del Servidor",
      message: "El servidor está experimentando problemas. Por favor, intenta más tarde.",
      status: "error",
      type: "server"
    };
  }

  // Error de autenticación (401)
  if (error.status === 401) {
    return {
      title: "Sesión Expirada",
      message: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
      status: "warning",
      type: "auth",
      redirectTo: "/login"
    };
  }

  // Error de autorización (403)
  if (error.status === 403) {
    return {
      title: "Acceso Denegado",
      message: "No tienes permisos para realizar esta acción.",
      status: "error",
      type: "forbidden"
    };
  }

  // Error de validación (400)
  if (error.status === 400) {
    return {
      title: "Error de Validación",
      message: error.message || "Los datos proporcionados no son válidos.",
      status: "warning",
      type: "validation"
    };
  }

  // Error genérico
  return {
    title: "Error",
    message: showDetails && error.message ? error.message : defaultMessage,
    status: "error",
    type: "generic"
  };
};

/**
 * Maneja errores de respuesta HTTP
 * @param {Response} response - Respuesta HTTP
 * @returns {Promise<Object>} - Objeto con información del error
 */
export const handleHttpError = async (response) => {
  let errorMessage = `Error del servidor (${response.status})`;
  
  try {
    const errorData = await response.text();
    if (errorData) {
      try {
        const parsed = JSON.parse(errorData);
        errorMessage = parsed.message || parsed.error || errorData;
      } catch {
        errorMessage = errorData;
      }
    }
  } catch {
    // Si no se puede leer el error, usar el mensaje por defecto
  }

  return handleError({
    status: response.status,
    message: errorMessage
  });
};

/**
 * Registra el error en la consola (solo en desarrollo)
 * @param {Error|Object} error - Error a registrar
 */
export const logError = (error) => {
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", error);
  }
};

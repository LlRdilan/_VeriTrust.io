/**
 * Servicio de API con interceptor para manejo centralizado de errores
 */

import { getToken, removeSession } from "./auth";
import { handleError, handleHttpError, logError } from "./errorHandler";

const API_BASE_URL = "http://localhost:8080";
const REQUEST_TIMEOUT = 30000; // 30 segundos

/**
 * Crea un timeout para la petición
 * @param {number} ms - Milisegundos de timeout
 * @returns {Promise} - Promise que se rechaza después del timeout
 */
const createTimeout = (ms) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Request timeout"));
    }, ms);
  });
};

/**
 * Realiza una petición fetch con manejo de errores centralizado
 * @param {string} endpoint - Endpoint de la API
 * @param {Object} options - Opciones de fetch
 * @returns {Promise<Response>} - Respuesta de la API
 */
export const apiRequest = async (endpoint, options = {}) => {
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const {
    headers = {},
    requireAuth = true,
    timeout = REQUEST_TIMEOUT,
    ...fetchOptions
  } = options;

  // Agregar token si es necesario
  if (requireAuth) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  // Headers por defecto
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...headers
  };

  try {
    // Realizar petición con timeout
    const fetchPromise = fetch(url, {
      ...fetchOptions,
      headers: defaultHeaders
    });

    const response = await Promise.race([
      fetchPromise,
      createTimeout(timeout)
    ]);

    // Manejar errores HTTP
    if (!response.ok) {
      const errorInfo = await handleHttpError(response);
      
      // Si es error 401, limpiar sesión y redirigir
      if (response.status === 401) {
        removeSession();
        // El componente que llama debe manejar la redirección
        throw { ...errorInfo, status: 401 };
      }

      throw errorInfo;
    }

    return response;
  } catch (error) {
    // Si ya es un objeto de error formateado, relanzarlo
    if (error.title && error.message) {
      throw error;
    }

    // Manejar otros tipos de errores
    const errorInfo = handleError(error, {
      defaultMessage: "Error al conectar con el servidor"
    });
    
    logError(error);
    throw errorInfo;
  }
};

/**
 * GET request
 */
export const apiGet = (endpoint, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    method: "GET"
  });
};

/**
 * POST request
 */
export const apiPost = (endpoint, data, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    method: "POST",
    body: JSON.stringify(data)
  });
};

/**
 * PUT request
 */
export const apiPut = (endpoint, data, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    method: "PUT",
    body: JSON.stringify(data)
  });
};

/**
 * DELETE request
 */
export const apiDelete = (endpoint, options = {}) => {
  return apiRequest(endpoint, {
    ...options,
    method: "DELETE"
  });
};

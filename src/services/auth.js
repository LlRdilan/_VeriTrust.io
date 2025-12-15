/**
 * Servicio de autenticación para manejo de sesión
 */

const SESSION_KEY = "user_session";

/**
 * Obtiene la sesión del usuario desde localStorage
 * @returns {Object|null} - Datos de la sesión o null si no existe
 */
export const getSession = () => {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error("Error al leer la sesión:", error);
    return null;
  }
};

/**
 * Guarda la sesión del usuario en localStorage
 * @param {Object} sessionData - Datos de la sesión a guardar
 */
export const setSession = (sessionData) => {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  } catch (error) {
    console.error("Error al guardar la sesión:", error);
    throw error;
  }
};

/**
 * Elimina la sesión del usuario
 */
export const removeSession = () => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error("Error al eliminar la sesión:", error);
  }
};

/**
 * Obtiene el token de autenticación
 * @returns {string|null} - Token o null si no existe
 */
export const getToken = () => {
  const session = getSession();
  return session ? session.token : null;
};

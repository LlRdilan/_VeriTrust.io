/**
 * Utilidades de validación compartidas
 */

/**
 * Valida un RUT chileno
 * @param {string} rutCompleto - RUT con formato (ej: "12345678-9" o "12.345.678-9")
 * @returns {boolean} - true si el RUT es válido
 */
export const validarRut = (rutCompleto) => {
  if (!rutCompleto) return false;
  let rutLimpio = rutCompleto.replace(/\./g, "").replace("-", "");
  if (rutLimpio.length < 2) return false;
  
  let cuerpo = rutLimpio.slice(0, -1);
  let dv = rutLimpio.slice(-1).toUpperCase();

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

/**
 * Valida un email usando regex
 * @param {string} email - Email a validar
 * @returns {boolean} - true si el email es válido
 */
export const validarEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Calcula la edad a partir de una fecha de nacimiento
 * @param {string|Date} fechaNac - Fecha de nacimiento
 * @returns {number} - Edad calculada
 */
export const calcularEdad = (fechaNac) => {
  const hoy = new Date();
  const fechaNacimiento = new Date(fechaNac);
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mesDiff = hoy.getMonth() - fechaNacimiento.getMonth();
  if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }
  return edad;
};

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

/**
 * Limpia espacios y caracteres no numéricos del número de tarjeta
 * @param {string} numero - Número de tarjeta con o sin formato
 * @returns {string} - Número de tarjeta sin espacios
 */
export const limpiarNumeroTarjeta = (numero) => {
  return numero.replace(/\s/g, '');
};

/**
 * Formatea el número de tarjeta agregando espacios cada 4 dígitos
 * @param {string} numero - Número de tarjeta sin formato
 * @returns {string} - Número de tarjeta formateado (ej: "0000 0000 0000 0000")
 */
export const formatearNumeroTarjeta = (numero) => {
  const numeroLimpio = limpiarNumeroTarjeta(numero);
  return numeroLimpio.replace(/(.{4})/g, '$1 ').trim();
};

/**
 * Detecta la franquicia de la tarjeta basándose en el número
 * @param {string} numero - Número de tarjeta (puede tener espacios)
 * @returns {string} - "visa", "mastercard", "amex" o ""
 */
export const detectarFranquicia = (numero) => {
  const numeroLimpio = limpiarNumeroTarjeta(numero);
  if (numeroLimpio.startsWith("4")) return "visa";
  if (/^5[1-5]/.test(numeroLimpio)) return "mastercard";
  if (/^3[47]/.test(numeroLimpio)) return "amex";
  return "";
};

/**
 * Valida un número de tarjeta de crédito usando el algoritmo de Luhn
 * @param {string} numero - Número de tarjeta a validar (sin espacios)
 * @returns {boolean} - true si el número de tarjeta es válido
 */
export const validarNumeroTarjeta = (numero) => {
  if (typeof numero !== "string") return false;
  const numeroLimpio = limpiarNumeroTarjeta(numero);
  if (!/^\d{16}$/.test(numeroLimpio)) return false;
  let suma = 0;
  let doble = false;
  for (let i = numeroLimpio.length - 1; i >= 0; i--) {
    let digito = parseInt(numeroLimpio.charAt(i), 10);
    if (doble) {
      digito *= 2;
      if (digito > 9) digito -= 9;
    }
    suma += digito;
    doble = !doble;
  }
  return suma % 10 === 0;
};

// ========== VALIDACIONES DE FORMULARIO DE REGISTRO ==========

/**
 * Valida que un nombre tenga al menos una longitud mínima
 * @param {string} nombre - Nombre a validar
 * @param {number} longitudMinima - Longitud mínima requerida (default: 3)
 * @returns {boolean} - true si el nombre es válido
 */
export const validarNombre = (nombre, longitudMinima = 3) => {
  if (!nombre || typeof nombre !== "string") return false;
  return nombre.trim().length >= longitudMinima;
};

/**
 * Valida que una contraseña tenga al menos una longitud mínima
 * @param {string} contraseña - Contraseña a validar
 * @param {number} longitudMinima - Longitud mínima requerida (default: 6)
 * @returns {boolean} - true si la contraseña es válida
 */
export const validarContraseña = (contraseña, longitudMinima = 6) => {
  if (!contraseña || typeof contraseña !== "string") return false;
  return contraseña.length >= longitudMinima;
};

/**
 * Valida que dos emails coincidan
 * @param {string} email - Email original
 * @param {string} confirmarEmail - Email de confirmación
 * @returns {boolean} - true si los emails coinciden
 */
export const validarCoincidenciaEmail = (email, confirmarEmail) => {
  if (!email || !confirmarEmail) return false;
  return email === confirmarEmail;
};

/**
 * Valida que dos contraseñas coincidan
 * @param {string} contraseña - Contraseña original
 * @param {string} confirmarContraseña - Contraseña de confirmación
 * @returns {boolean} - true si las contraseñas coinciden
 */
export const validarCoincidenciaContraseña = (contraseña, confirmarContraseña) => {
  if (!contraseña || !confirmarContraseña) return false;
  return contraseña === confirmarContraseña;
};

/**
 * Valida que una persona sea mayor de edad (18 años)
 * @param {string|Date} fechaNac - Fecha de nacimiento
 * @param {number} edadMinima - Edad mínima requerida (default: 18)
 * @returns {boolean} - true si la persona es mayor de edad
 */
export const validarEdadMinima = (fechaNac, edadMinima = 18) => {
  if (!fechaNac) return false;
  const edad = calcularEdad(fechaNac);
  return edad >= edadMinima;
};

// ========== VALIDACIONES DE TARJETA DE CRÉDITO ==========

/**
 * Valida el mes de expiración de una tarjeta (formato MM, 1-12)
 * @param {string} mes - Mes de expiración (formato MM)
 * @returns {boolean} - true si el mes es válido
 */
export const validarMesExpiracion = (mes) => {
  if (!mes || typeof mes !== "string") return false;
  if (!/^\d{2}$/.test(mes)) return false;
  const mesNum = parseInt(mes, 10);
  return mesNum >= 1 && mesNum <= 12;
};

/**
 * Valida el año de expiración de una tarjeta (formato AAAA, no expirado)
 * @param {string} anio - Año de expiración (formato AAAA)
 * @returns {boolean} - true si el año es válido y no está expirado
 */
export const validarAnioExpiracion = (anio) => {
  if (!anio || typeof anio !== "string") return false;
  if (!/^\d{4}$/.test(anio)) return false;
  const anioNum = parseInt(anio, 10);
  const anioActual = new Date().getFullYear();
  return anioNum >= anioActual;
};

/**
 * Valida la fecha completa de expiración de una tarjeta (mes y año)
 * @param {string} mes - Mes de expiración (formato MM)
 * @param {string} anio - Año de expiración (formato AAAA)
 * @returns {object} - { valido: boolean, mensaje: string }
 */
export const validarFechaExpiracion = (mes, anio) => {
  if (!validarMesExpiracion(mes)) {
    return { valido: false, mensaje: "Mes de expiración inválido (formato MM)." };
  }

  if (!validarAnioExpiracion(anio)) {
    return { valido: false, mensaje: "Año de expiración inválido o expirado." };
  }

  const hoy = new Date();
  const anioActual = hoy.getFullYear();
  const mesActual = hoy.getMonth() + 1;
  const mesNum = parseInt(mes, 10);
  const anioNum = parseInt(anio, 10);

  // Si el año es el actual, validar que el mes no haya expirado
  if (anioNum === anioActual && mesNum < mesActual) {
    return { valido: false, mensaje: "La tarjeta ha expirado este mes." };
  }

  return { valido: true, mensaje: "" };
};

/**
 * Valida el CVV de una tarjeta (3 dígitos)
 * @param {string} cvv - CVV a validar
 * @returns {boolean} - true si el CVV es válido
 */
export const validarCVV = (cvv) => {
  if (!cvv || typeof cvv !== "string") return false;
  return /^\d{3}$/.test(cvv);
};

// ========== VALIDACIONES DE SERVICIO ==========

/**
 * Valida los datos de un servicio
 * @param {object} servicio - Objeto servicio a validar
 * @returns {object} - { valido: boolean, mensaje: string }
 */
export const validarServicio = (servicio) => {
  if (!servicio || typeof servicio !== "object") {
    return { valido: false, mensaje: "Servicio inválido" };
  }

  const nombre = (servicio.nombre ?? "").toString().trim();
  const descripcion = (servicio.descripcion ?? "").toString().trim();
  let precio = servicio.precio;
  
  if (typeof precio === "string") precio = parseFloat(precio);

  if (!nombre || !descripcion) {
    return { valido: false, mensaje: "El nombre y la descripción corta son obligatorios." };
  }

  if (typeof precio !== "number" || !Number.isFinite(precio) || precio <= 0 || precio % 1 !== 0) {
    return { valido: false, mensaje: "El precio debe ser un número entero positivo." };
  }

  return { valido: true, mensaje: "" };
};

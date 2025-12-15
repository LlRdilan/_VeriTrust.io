/**
 * Utilidades de cálculos compartidas
 */

/**
 * Porcentaje de IVA en Chile
 */
export const IVA_PORCENTAJE = 0.19;

/**
 * Calcula el IVA de un precio
 * @param {number} precio - Precio base
 * @returns {number} - IVA calculado (redondeado)
 */
export const calcularIVA = (precio) => {
  return Math.round(precio * IVA_PORCENTAJE);
};

/**
 * Calcula el total incluyendo IVA
 * @param {number} precio - Precio base
 * @returns {number} - Total con IVA
 */
export const calcularTotalConIVA = (precio) => {
  return precio + calcularIVA(precio);
};

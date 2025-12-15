
### 2. **Falta de Manejo de Errores Consistente**
**Problema:** El manejo de errores es inconsistente entre componentes:
- Algunos usan `console.error` (Admin.jsx, Servicios.jsx)
- Otros solo muestran modales genéricos
- No hay manejo de errores de red (timeout, conexión perdida)

**Solución:** Crear un servicio centralizado de manejo de errores.

### 3. **Validación de Email Débil**
**Problema:** En `Registro.jsx` línea 73:
```javascript
if (!form.email.includes("@")) { nuevosErrores.email = "Correo inválido"; valido = false; }
```
Esta validación es muy básica y permite emails inválidos como `@@@@` o `a@b`.

**Solución:** Usar regex o librería de validación:
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(form.email)) { ... }
```

### 4. **Cálculo de Edad Incorrecto**
**Problema:** En `Registro.jsx` línea 68:
```javascript
let edad = hoy.getFullYear() - FechaNac.getFullYear();
```
No considera el mes y día, por lo que alguien que cumple años mañana aparecería como mayor de edad hoy.

**Solución:**
```javascript
const hoy = new Date();
const fechaNac = new Date(form.fechaNac);
let edad = hoy.getFullYear() - fechaNac.getFullYear();
const mesDiff = hoy.getMonth() - fechaNac.getMonth();
if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
}
```

### 5. **Validación de Fecha de Expiración de Tarjeta Incompleta**
**Problema:** En `Compra.jsx` línea 86:
```javascript
if (!/^\d{4}$/.test(anioExpiracion) || anio < anioActual) {
```
No valida si la tarjeta expiró este mes si el año es el actual.

**Solución:** Validar también el mes cuando el año es el actual.

### 6. **Uso de `alert()` en Producción**
**Problema:** En `Login.jsx` línea 44:
```javascript
alert("Debes completar el reCAPTCHA");
```
Los `alert()` nativos son malos para UX.

**Solución:** Usar el componente `NotificationModal` que ya existe.

### 8. **Duplicación de Función `validarRut`**
**Problema:** La función `validarRut` está duplicada en:
- `src/pages/Login.jsx` (línea 5)
- `src/pages/Registro.jsx` (línea 6)

**Solución:** Crear un archivo de utilidades compartidas:
```javascript
// src/utils/validaciones.js
export const validarRut = (rutCompleto) => { ... }
```

### 9. **Inconsistencia en Manejo de Sesión**
**Problema:** Diferentes formas de acceder a `localStorage`:
- `localStorage.getItem("user_session")` sin try-catch (Admin.jsx línea 47)
- `JSON.parse(localStorage.getItem("user_session"))` con riesgo de error (Compra.jsx línea 97)

**Solución:** Crear un servicio de autenticación:
```javascript
// src/services/auth.js
export const getSession = () => {
  try {
    const session = localStorage.getItem("user_session");
    return session ? JSON.parse(session) : null;
  } catch {
    return null;
  }
}
```

### 10. **Falta de Protección de Rutas**
**Problema:** No hay un componente `ProtectedRoute` para proteger rutas que requieren autenticación.

**Solución:** Crear un componente que verifique la sesión antes de renderizar.

### 11. **Cálculo de IVA Duplicado**
**Problema:** El cálculo del IVA (19%) está duplicado en múltiples archivos:
- `Servicios.jsx` línea 79
- `ServicioDetalle.jsx` línea 52, 75
- `Admin.jsx` línea 278

**Solución:** Crear constante y función:
```javascript
// src/utils/calculos.js
export const IVA_PORCENTAJE = 0.19;
export const calcularIVA = (precio) => Math.round(precio * IVA_PORCENTAJE);
```

### 12. **Falta de Loading States**
**Problema:** Algunas operaciones asíncronas no muestran estados de carga:
- `Admin.jsx` - `cargarServicios()` no tiene loading
- `Compra.jsx` - El submit no muestra loading

**Solución:** Agregar estados de carga consistentes.

### 13. **Uso de `dangerouslySetInnerHTML` sin Sanitización**
**Problema:** En `ServicioDetalle.jsx` línea 129:
```javascript
<div dangerouslySetInnerHTML={{ __html: servicio.descripcionCompleta }} />
```
Riesgo de XSS si el contenido no está sanitizado.

**Solución:** Usar una librería de sanitización como `DOMPurify`.


### 18. **Manejo de Errores de API Centralizado**
**Sugerencia:** Crear un interceptor o servicio que maneje:
- Errores 401 (redirigir a login)
- Errores 403 (mostrar mensaje)
- Errores 500 (mensaje genérico)
- Timeouts


### 24. **Falta de Confirmación en Acciones Destructivas**
**Problema:** Aunque hay confirmación para eliminar servicios, no hay para cerrar sesión.

**Solución:** Agregar confirmación opcional.

### 25. **README Desactualizado**
**Problema:** El README menciona `npm start` pero el proyecto usa Vite (`npm run dev`).

**Solución:** Actualizar README con comandos correctos.


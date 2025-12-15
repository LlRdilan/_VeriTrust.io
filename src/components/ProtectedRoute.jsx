import { Navigate } from "react-router-dom";
import { getSession } from "../services/auth";

/**
 * Componente para proteger rutas que requieren autenticación
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componente hijo a renderizar
 * @param {boolean} props.requireAdmin - Si true, requiere rol de administrador
 */
export default function ProtectedRoute({ children, requireAdmin = false }) {
  const session = getSession();

  // Si no hay sesión, redirigir a login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Si requiere admin y no es admin, redirigir
  if (requireAdmin && session.rol !== "admin") {
    return <Navigate to="/servicios" replace />;
  }

  return children;
}

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Admin from "../../pages/Admin";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../services/auth", () => ({
  getSession: () => ({
    id: 1,
    nombre: "Admin Test",
    rol: "admin",
    token: "mock-token",
  }),
  removeSession: vi.fn(),
}));

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: async () => [],
  })
);

describe("Admin - Tests de Página Real", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe renderizar el panel de administración con título", () => {
    render(
      <BrowserRouter>
        <Admin />
      </BrowserRouter>
    );

    expect(screen.getByText("Panel de Administración")).toBeInTheDocument();
  });

  it("debe mostrar el formulario para crear nuevo servicio", () => {
    render(
      <BrowserRouter>
        <Admin />
      </BrowserRouter>
    );

    expect(screen.getByText("Crear Nuevo Servicio")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ej: Firma Avanzada")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("15000")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ej: Certificado Digital")).toBeInTheDocument();
  });

  it("debe mostrar la tabla de servicios actuales", () => {
    render(
      <BrowserRouter>
        <Admin />
      </BrowserRouter>
    );

    expect(screen.getByText("Servicios Actuales (Base de Datos)")).toBeInTheDocument();
    const nombres = screen.getAllByText("Nombre");
    expect(nombres.length).toBeGreaterThan(0);
    expect(screen.getByText("Descripción")).toBeInTheDocument();
    expect(screen.getByText("Precio Neto")).toBeInTheDocument();
  });

  it("debe mostrar el botón de cerrar sesión", () => {
    render(
      <BrowserRouter>
        <Admin />
      </BrowserRouter>
    );

    const cerrarSesionButton = screen.getByText("Cerrar Sesión");
    expect(cerrarSesionButton).toBeInTheDocument();
  });
});

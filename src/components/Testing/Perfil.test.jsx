import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Perfil from "../../pages/Perfil";

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
    nombre: "Usuario Test",
    email: "test@test.com",
    rut: "12345678-5",
    rol: "user",
    token: "mock-token",
  }),
}));

global.fetch = vi.fn((url) => {
  if (url.includes("/usuarios/1")) {
    return Promise.resolve({
      ok: true,
      json: async () => ({
        id: 1,
        nombre: "Usuario Test",
        email: "test@test.com",
        rut: "12345678-5",
      }),
    });
  }
  if (url.includes("/compras")) {
    return Promise.resolve({
      ok: true,
      json: async () => [],
    });
  }
  return Promise.resolve({
    ok: true,
    json: async () => [],
  });
});

describe("Perfil - Tests de Página Real", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe renderizar el título Mi Perfil", async () => {
    render(
      <BrowserRouter>
        <Perfil />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Mi Perfil")).toBeInTheDocument();
    });
  });

  it("debe mostrar la información personal del usuario", async () => {
    render(
      <BrowserRouter>
        <Perfil />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Usuario Test")).toBeInTheDocument();
      expect(screen.getByText(/RUT:/i)).toBeInTheDocument();
    });
  });

  it("debe mostrar la sección de compras", async () => {
    render(
      <BrowserRouter>
        <Perfil />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Mis Compras y Boletas/i)).toBeInTheDocument();
    });
  });

  it("debe mostrar la sección de documentos firmados", async () => {
    render(
      <BrowserRouter>
        <Perfil />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Mis Documentos Firmados/i)).toBeInTheDocument();
    });
  });
});


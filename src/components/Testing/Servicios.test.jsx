import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Servicios from "../../pages/Servicios";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../services/auth", () => ({
  getSession: () => null,
}));

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: async () => [
      {
        id: 1,
        nombre: "Firma Digital",
        descripcion: "Certificado SII",
        precio: 15000,
        detalles: ["Detalle 1", "Detalle 2"],
      },
    ],
  })
);

describe("Servicios - Tests de Página Real", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe renderizar el título de servicios", () => {
    render(
      <BrowserRouter>
        <Servicios />
      </BrowserRouter>
    );

    expect(screen.getByText(/Podemos ayudar a que tu negocio crezca/i)).toBeInTheDocument();
  });

  it("debe cargar y mostrar los servicios desde la API", async () => {
    render(
      <BrowserRouter>
        <Servicios />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Firma Digital")).toBeInTheDocument();
      expect(screen.getByText("Certificado SII")).toBeInTheDocument();
    });
  });

  it("debe mostrar el botón Ver Detalles para cada servicio", async () => {
    render(
      <BrowserRouter>
        <Servicios />
      </BrowserRouter>
    );

    await waitFor(() => {
      const verDetallesButtons = screen.getAllByText("Ver Detalles");
      expect(verDetallesButtons.length).toBeGreaterThan(0);
    });
  });

  it("debe mostrar mensaje cuando no hay servicios", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => [],
      })
    );

    render(
      <BrowserRouter>
        <Servicios />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/No hay servicios cargados/i)).toBeInTheDocument();
    });
  });
});


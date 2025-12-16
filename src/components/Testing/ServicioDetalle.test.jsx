import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import ServicioDetalle from "../../pages/ServicioDetalle";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "1" }),
  };
});

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: async () => ({
      id: 1,
      nombre: "Firma Digital",
      descripcion: "Certificado SII",
      precio: 15000,
      detalles: ["Detalle 1", "Detalle 2"],
    }),
  })
);

describe("ServicioDetalle - Tests de Página Real", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe mostrar el enlace para volver a servicios", async () => {
    render(
      <MemoryRouter>
        <ServicioDetalle />
      </MemoryRouter>
    );

    await waitFor(() => {
      const volverLink = screen.getByText(/Volver a Servicios/i);
      expect(volverLink).toBeInTheDocument();
    });
  });

  it("debe cargar y mostrar los detalles del servicio", async () => {
    render(
      <MemoryRouter>
        <ServicioDetalle />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Firma Digital")).toBeInTheDocument();
    });
  });

  it("debe mostrar el precio total del servicio", async () => {
    render(
      <MemoryRouter>
        <ServicioDetalle />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/\$17.850/)).toBeInTheDocument();
    });
  });

  it("debe mostrar el botón de comprar", async () => {
    render(
      <MemoryRouter>
        <ServicioDetalle />
      </MemoryRouter>
    );

    await waitFor(() => {
      const comprarButton = screen.getByText("COMPRAR AHORA");
      expect(comprarButton).toBeInTheDocument();
    });
  });
});


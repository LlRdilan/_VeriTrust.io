import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import Compra from "../../pages/Compra";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      state: {
        nombre: "Firma Digital",
        neto: 15000,
        iva: 2850,
        total: 17850,
        id: 1,
      },
    }),
  };
});

vi.mock("../../components/api/ReCaptcha", () => ({
  default: ({ onChange }) => (
    <div data-testid="recaptcha" onClick={() => onChange("token-valido")}>
      reCAPTCHA
    </div>
  ),
}));

vi.mock("../../services/auth", () => ({
  getSession: () => ({
    id: 1,
    token: "mock-token",
    nombre: "Usuario Test",
  }),
}));

global.fetch = vi.fn();

describe("Compra - Tests de Página Real", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe renderizar el resumen del pedido con los datos del servicio", () => {
    render(
      <MemoryRouter>
        <Compra />
      </MemoryRouter>
    );

    expect(screen.getByText("Finalizar Compra")).toBeInTheDocument();
    expect(screen.getByText("Resumen del Pedido")).toBeInTheDocument();
    expect(screen.getByText("Firma Digital")).toBeInTheDocument();
    expect(screen.getByText(/\$17.850/)).toBeInTheDocument();
  });

  it("debe mostrar todos los campos del formulario de pago", () => {
    render(
      <MemoryRouter>
        <Compra />
      </MemoryRouter>
    );

    expect(screen.getByText("Datos de Pago")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("0000 0000 0000 0000")).toBeInTheDocument();
    expect(screen.getByText(/Mes \(MM\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Año \(AAAA\)/i)).toBeInTheDocument();
    expect(screen.getByText(/CVV/i)).toBeInTheDocument();
  });

  it("debe mostrar el botón de pago", () => {
    render(
      <MemoryRouter>
        <Compra />
      </MemoryRouter>
    );

    const pagarButton = screen.getByText("Pagar");
    expect(pagarButton).toBeInTheDocument();
    expect(pagarButton).toBeInTheDocument();
  });

  it("debe mostrar el campo de número de tarjeta", () => {
    render(
      <MemoryRouter>
        <Compra />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("0000 0000 0000 0000")).toBeInTheDocument();
  });
});

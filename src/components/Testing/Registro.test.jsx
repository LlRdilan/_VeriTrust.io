import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Registro from "../../pages/Registro";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../components/api/ReCaptcha", () => ({
  default: ({ onChange }) => (
    <div data-testid="recaptcha" onClick={() => onChange("token-valido")}>
      reCAPTCHA
    </div>
  ),
}));

global.fetch = vi.fn();

describe("Registro - Tests de Página Real", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe renderizar todos los campos del formulario de registro", () => {
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );

    expect(screen.getByText("Crea tu cuenta")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/12.345.678-9/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nombre completo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("correo@ejemplo.com")).toBeInTheDocument();
    expect(screen.getByText("Registrarme")).toBeInTheDocument();
  });

  it("debe mostrar campos de región y comuna", () => {
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );

    const regionSelect = screen.getByText("Selecciona una región");
    const comunaSelect = screen.getByText("Selecciona una comuna");
    expect(regionSelect).toBeInTheDocument();
    expect(comunaSelect).toBeInTheDocument();
  });

  it("debe mostrar checkbox de términos y condiciones", () => {
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );

    const terminosCheckbox = screen.getByLabelText(/Acepto los/i);
    expect(terminosCheckbox).toBeInTheDocument();
    expect(terminosCheckbox).not.toBeChecked();
  });

  it("debe validar que los campos requeridos estén presentes", () => {
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    );

    const rutInput = screen.getByPlaceholderText(/12.345.678-9/i);
    const nombreInput = screen.getByPlaceholderText("Nombre completo");
    const emailInput = screen.getByPlaceholderText("correo@ejemplo.com");

    expect(rutInput).toBeRequired();
    expect(nombreInput).toBeRequired();
    expect(emailInput).toBeRequired();
  });
});

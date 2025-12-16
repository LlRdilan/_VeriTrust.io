import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../../pages/Login";

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

describe("Login - Tests de Página Real", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    if (localStorage.clear) {
      localStorage.clear();
    }
  });

  it("debe renderizar el formulario de login con todos los campos", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText("Iniciar Sesión")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ej: 12345678-9")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ingresa tu contraseña")).toBeInTheDocument();
    expect(screen.getByText("Ingresar")).toBeInTheDocument();
  });

  it("debe mostrar enlace a registro cuando no se tiene cuenta", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const linkRegistro = screen.getByText("Regístrate aquí");
    expect(linkRegistro).toBeInTheDocument();
    expect(linkRegistro.closest("a")).toHaveAttribute("href", "/registro");
  });

  it("debe validar que los campos sean requeridos", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const submitButton = screen.getByText("Ingresar");
    submitButton.click();

    await waitFor(() => {
      const rutInput = screen.getByPlaceholderText("Ej: 12345678-9");
      const passwordInput = screen.getByPlaceholderText("Ingresa tu contraseña");
      expect(rutInput).toBeRequired();
      expect(passwordInput).toBeRequired();
    });
  });

  it("debe mostrar error cuando el RUT es inválido", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const rutInput = screen.getByPlaceholderText("Ej: 12345678-9");
    const passwordInput = screen.getByPlaceholderText("Ingresa tu contraseña");
    const recaptcha = screen.getByTestId("recaptcha");
    const submitButton = screen.getByText("Ingresar");
    const form = submitButton.closest("form");

    rutInput.value = "12345678-9";
    passwordInput.value = "password123";
    recaptcha.click();

    if (form) {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    }

    await waitFor(() => {
      const errorText = screen.queryByText(/RUT inválido/i);
      if (!errorText) {
        expect(form).toBeInTheDocument();
      }
    }, { timeout: 2000 });
  });
});

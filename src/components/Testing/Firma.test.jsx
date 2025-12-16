import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import Firma from "../../pages/Firma";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      state: {
        servicio: {
          nombre: "Firma Digital",
          neto: 15000,
          iva: 2850,
          total: 17850,
        },
      },
    }),
  };
});

vi.mock("../../services/auth", () => ({
  getToken: () => "mock-token",
}));

beforeEach(() => {
  const localStorageMock = {
    getItem: vi.fn((key) => {
      if (key === "user_session") {
        return JSON.stringify({
          id: 1,
          nombre: "Usuario Test",
          rut: "12345678-5",
          token: "mock-token",
        });
      }
      return null;
    }),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  global.localStorage = localStorageMock;
});

describe("Firma - Tests de Página Real", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const localStorageMock = {
      getItem: vi.fn((key) => {
        if (key === "user_session") {
          return JSON.stringify({
            id: 1,
            nombre: "Usuario Test",
            rut: "12345678-5",
            token: "mock-token",
          });
        }
        return null;
      }),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
    global.localStorage = localStorageMock;
  });

  it("debe renderizar el título de firma de documentos", () => {
    render(
      <MemoryRouter>
        <Firma />
      </MemoryRouter>
    );

    expect(screen.getByText("Firma de Documentos")).toBeInTheDocument();
  });

  it("debe mostrar el servicio activo", () => {
    render(
      <MemoryRouter>
        <Firma />
      </MemoryRouter>
    );

    expect(screen.getByText(/Servicio activo:/i)).toBeInTheDocument();
    expect(screen.getByText("Firma Digital")).toBeInTheDocument();
  });

  it("debe mostrar el input para subir archivo", () => {
    render(
      <MemoryRouter>
        <Firma />
      </MemoryRouter>
    );

    const fileInput = screen.getByText(/Sube tu documento/i);
    expect(fileInput).toBeInTheDocument();
  });

  it("debe mostrar información sobre formatos soportados", () => {
    render(
      <MemoryRouter>
        <Firma />
      </MemoryRouter>
    );

    expect(screen.getByText(/Formatos soportados/i)).toBeInTheDocument();
  });
});


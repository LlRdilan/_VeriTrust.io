import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Clientes from "../../pages/Clientes";

describe("Clientes - Tests de Página Real", () => {
  it("debe renderizar la sección de números/estadísticas", () => {
    render(
      <BrowserRouter>
        <Clientes />
      </BrowserRouter>
    );

    expect(screen.getByText("Nuestros Números")).toBeInTheDocument();
    expect(screen.getByText(/Clientes Activos/i)).toBeInTheDocument();
  });

  it("debe mostrar las estadísticas principales", () => {
    render(
      <BrowserRouter>
        <Clientes />
      </BrowserRouter>
    );

    expect(screen.getByText("500+")).toBeInTheDocument();
    expect(screen.getByText("200+")).toBeInTheDocument();
    expect(screen.getByText("1M+")).toBeInTheDocument();
    expect(screen.getByText("98%")).toBeInTheDocument();
  });

  it("debe mostrar la sección de empresas que confían", () => {
    render(
      <BrowserRouter>
        <Clientes />
      </BrowserRouter>
    );

    expect(screen.getByText(/Empresas que Confían en Nosotros/i)).toBeInTheDocument();
  });

  it("debe mostrar la sección de testimonios", () => {
    render(
      <BrowserRouter>
        <Clientes />
      </BrowserRouter>
    );

    expect(screen.getByText(/¿Qué piensan nuestros clientes\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Jean Beausejour/i)).toBeInTheDocument();
  });
});


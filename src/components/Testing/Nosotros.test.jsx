import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Nosotros from "../../pages/Nosotros";

describe("Nosotros - Tests de Página Real", () => {
  it("debe renderizar el título Sobre Nosotros", () => {
    render(
      <BrowserRouter>
        <Nosotros />
      </BrowserRouter>
    );

    expect(screen.getByText("Sobre Nosotros")).toBeInTheDocument();
  });

  it("debe mostrar el subtítulo sobre soluciones digitales", () => {
    render(
      <BrowserRouter>
        <Nosotros />
      </BrowserRouter>
    );

    expect(screen.getByText(/Soluciones integrales para tu seguridad digital/i)).toBeInTheDocument();
  });

  it("debe mostrar información sobre VeriTrust", () => {
    render(
      <BrowserRouter>
        <Nosotros />
      </BrowserRouter>
    );

    expect(screen.getByText(/En VeriTrust, nos dedicamos/i)).toBeInTheDocument();
  });

  it("debe mostrar el enlace a servicios", () => {
    render(
      <BrowserRouter>
        <Nosotros />
      </BrowserRouter>
    );

    const serviciosLink = screen.getByText("Ver Servicios");
    expect(serviciosLink).toBeInTheDocument();
    expect(serviciosLink.closest("a")).toHaveAttribute("href", "/servicios");
  });
});


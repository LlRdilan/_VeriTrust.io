import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Inicio from "../../pages/Inicio";

describe("Inicio - Tests de Página Real", () => {
  it("debe renderizar el título principal de la página", () => {
    render(
      <BrowserRouter>
        <Inicio />
      </BrowserRouter>
    );

    expect(screen.getByText(/Tu Identidad Digital/i)).toBeInTheDocument();
    expect(screen.getByText(/más segura y confiable que nunca/i)).toBeInTheDocument();
  });

  it("debe mostrar la sección de premios y nominaciones", () => {
    render(
      <BrowserRouter>
        <Inicio />
      </BrowserRouter>
    );

    expect(screen.getByText(/Premios y nominaciones que nos motivan/i)).toBeInTheDocument();
    const nominaciones = screen.getAllByText(/NOMINACIONES/i);
    expect(nominaciones.length).toBeGreaterThan(0);
    const agencias = screen.getAllByText(/AGENCIAS/i);
    expect(agencias.length).toBeGreaterThan(0);
  });

  it("debe mostrar la sección de confianza con logos", () => {
    render(
      <BrowserRouter>
        <Inicio />
      </BrowserRouter>
    );

    expect(screen.getByText(/Porque la confianza también se certifica/i)).toBeInTheDocument();
  });

  it("debe mostrar el número de trabajadores", () => {
    render(
      <BrowserRouter>
        <Inicio />
      </BrowserRouter>
    );

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText(/TRABAJADORES/i)).toBeInTheDocument();
  });
});


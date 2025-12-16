import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFound from "../../pages/NotFound";

describe("NotFound - Tests de Página Real", () => {
  it("debe renderizar el código de error 404", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("debe mostrar el mensaje de página no encontrada", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText("Página no encontrada")).toBeInTheDocument();
  });

  it("debe mostrar el texto explicativo", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText(/Lo sentimos, la página que buscas no existe/i)).toBeInTheDocument();
  });

  it("debe mostrar el botón para volver al inicio", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const volverButton = screen.getByText("Volver al Inicio");
    expect(volverButton).toBeInTheDocument();
    expect(volverButton.closest("a")).toHaveAttribute("href", "/");
  });
});


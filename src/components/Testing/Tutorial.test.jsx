import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Tutorial from "../../pages/Tutorial";

describe("Tutorial - Tests de Página Real", () => {
  it("debe renderizar el título de tutoriales", () => {
    render(
      <BrowserRouter>
        <Tutorial />
      </BrowserRouter>
    );

    expect(screen.getByText(/tutoriales y consejos que debes ver/i)).toBeInTheDocument();
  });

  it("debe mostrar las tarjetas de tutoriales", () => {
    render(
      <BrowserRouter>
        <Tutorial />
      </BrowserRouter>
    );

    expect(screen.getAllByText(/Qué es la identidad digital/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Qué es la firma electrónica/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Cómo usar una firma digital/i).length).toBeGreaterThan(0);
  });

  it("debe mostrar el enlace a preguntas frecuentes", () => {
    render(
      <BrowserRouter>
        <Tutorial />
      </BrowserRouter>
    );

    const faqLink = screen.getByText("Preguntas Frecuentes");
    expect(faqLink).toBeInTheDocument();
    expect(faqLink.closest("a")).toHaveAttribute("href");
  });

  it("debe mostrar el mensaje sobre pasar el cursor", () => {
    render(
      <BrowserRouter>
        <Tutorial />
      </BrowserRouter>
    );

    expect(screen.getByText(/Pasa el cursor sobre las tarjetas/i)).toBeInTheDocument();
  });
});


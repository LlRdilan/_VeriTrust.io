import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Importante from "../../pages/Importante";

describe("Importante - Tests de Página Real", () => {
  it("debe renderizar la imagen importante", () => {
    render(
      <BrowserRouter>
        <Importante />
      </BrowserRouter>
    );

    const image = screen.getByAltText("NO BORRAR");
    expect(image).toBeInTheDocument();
  });

  it("debe mostrar la imagen con la clase img-fluid", () => {
    render(
      <BrowserRouter>
        <Importante />
      </BrowserRouter>
    );

    const image = screen.getByAltText("NO BORRAR");
    expect(image).toHaveClass("img-fluid");
  });

  it("debe estar dentro de un contenedor", () => {
    const { container } = render(
      <BrowserRouter>
        <Importante />
      </BrowserRouter>
    );

    expect(container.querySelector(".container")).toBeInTheDocument();
  });

  it("debe tener la estructura correcta de la página", () => {
    const { container } = render(
      <BrowserRouter>
        <Importante />
      </BrowserRouter>
    );

    expect(container.querySelector("img")).toBeInTheDocument();
  });
});


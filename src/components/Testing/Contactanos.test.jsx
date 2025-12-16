import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Contactanos from "../../pages/Contactanos";

describe("Contactanos - Tests de Página Real", () => {
  it("debe renderizar el título de contacto", () => {
    render(
      <BrowserRouter>
        <Contactanos />
      </BrowserRouter>
    );

    expect(screen.getByText(/Contáctanos/i)).toBeInTheDocument();
    expect(screen.getByText(/Solicitar una llamada/i)).toBeInTheDocument();
  });

  it("debe mostrar todos los campos del formulario de contacto", () => {
    render(
      <BrowserRouter>
        <Contactanos />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Número Telefónico/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Descripción/i)).toBeInTheDocument();
  });

  it("debe mostrar el botón de enviar", () => {
    render(
      <BrowserRouter>
        <Contactanos />
      </BrowserRouter>
    );

    const enviarButton = screen.getByText("Enviar");
    expect(enviarButton).toBeInTheDocument();
  });

  it("debe mostrar mensaje de éxito al enviar el formulario", async () => {
    render(
      <BrowserRouter>
        <Contactanos />
      </BrowserRouter>
    );

    const form = screen.getByText("Enviar").closest("form");
    if (form) {
      const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
    }

    await waitFor(() => {
      expect(screen.getByText(/Mensaje enviado con éxito/i)).toBeInTheDocument();
    }, { timeout: 6000 });
  });
});


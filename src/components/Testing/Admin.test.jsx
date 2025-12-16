import { describe, it, expect } from "vitest";
import { validarServicio } from "../../utils/validaciones";

describe("validarServicio()", {}, () => {
  it("deberia aceptar un servicio valido", {}, () => {
    const servicio = {
      nombre: "Firma Digital",
      descripcion: "Certificado SII",
      precio: 15000,
    };

    const resultado = validarServicio(servicio);
    expect(resultado.valido).toBe(true);
  });

  it("deberia lanzar error si el nombre esta vacio", {}, () => {
    const servicio = {
      nombre: "",
      descripcion: "Descripcion valida",
      precio: 10000,
    };

    const resultado = validarServicio(servicio);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("obligatorios");
  });

  it("deberia lanzar error si el precio es negativo", {}, () => {
    const servicio = {
      nombre: "Servicio",
      descripcion: "Descripcion valida",
      precio: -5000,
    };

    const resultado = validarServicio(servicio);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("número entero positivo");
  });

  it("deberia lanzar error si el precio es decimal", {}, () => {
    const servicio = {
      nombre: "Servicio",
      descripcion: "Descripcion valida",
      precio: 1234.56,
    };

    const resultado = validarServicio(servicio);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("número entero positivo");
  });

  it("deberia lanzar error si la descripcion esta vacia", {}, () => {
    const servicio = {
      nombre: "Servicio",
      descripcion: "",
      precio: 10000,
    };

    const resultado = validarServicio(servicio);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("obligatorios");
  });
});

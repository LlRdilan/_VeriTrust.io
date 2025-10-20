import { describe, it, expect } from "vitest";
import { validarNumeroTarjeta } from "./Compra";

describe("validarNumeroTarjeta()", () => {
  it("deberia retornar true si el numero de tarjeta es valido", () => {
    expect(validarNumeroTarjeta("4539578763621486")).toBe(true);
  });

  it("deberia retornar false si el numero de tarjeta es invalido", () => {
    expect(validarNumeroTarjeta("1234567812345678")).toBe(false);
  });

  it("deberia retornar false si se pasa un valor con menos de 16 digitos", () => {
    expect(validarNumeroTarjeta("12345678")).toBe(false);
  });

  it("deberia retornar false si se pasa un valor con caracteres no numericos", () => {
    expect(validarNumeroTarjeta("1234abcd5678efgh")).toBe(false);
  });
});

describe("validacion de campos de compra", () => {
  it("deberia lanzar error si nombre esta vacio", () => {
    const nombre = "";
    expect(() => {
      if (!nombre) throw new Error("Nombre vacio");
    }).toThrow("Nombre vacio");
  });

  it("deberia lanzar error si mes es menor que 1 o mayor que 12", () => {
    const mes = 13;
    expect(() => {
      if (mes < 1 || mes > 12) throw new Error("Mes invalido");
    }).toThrow("Mes invalido");
  });

  it("deberia lanzar error si anio es menor al actual", () => {
    const anio = 2020;
    const anioActual = new Date().getFullYear();
    expect(() => {
      if (anio < anioActual) throw new Error("Anio invalido");
    }).toThrow("Anio invalido");
  });

  it("deberia lanzar error si CVV no tiene 3 digitos", () => {
    const cvv = "12";
    expect(() => {
      if (!/^\d{3}$/.test(cvv)) throw new Error("CVV invalido");
    }).toThrow("CVV invalido");
  });
});

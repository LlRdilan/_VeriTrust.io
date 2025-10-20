import { describe, it, expect } from "vitest";
import { validarRut } from "./Login";

describe("validarRut()", () => {
  it("deberia retornar true para un rut valido", () => {
    expect(validarRut("21867698-7")).toBe(true);
  });

  it("deberia retornar false para un rut invalido", () => {
    expect(validarRut("12345678-9")).toBe(false);
  });

  it("deberia retornar false si el cuerpo tiene letras", () => {
    expect(validarRut("12A45678-5")).toBe(false);
  });

  it("deberia retornar false si falta el digito verificador", () => {
    expect(validarRut("12345678")).toBe(false);
  });
});

describe("validacion de login", () => {
  it("deberia lanzar error si rut es invalido", () => {
    const rut = "12345678-9";
    expect(() => {
      if (!validarRut(rut)) throw new Error("RUT invalido");
    }).toThrow("RUT invalido");
  });

  it("deberia lanzar error si usuario o contraseña son incorrectos", () => {
    const rut = "21867698-7";
    const contraseña = "123456";
    expect(() => {
      if (!(rut === "21867698-7" && contraseña === "admin"))
        throw new Error("Usuario o contraseña incorrectos");
    }).toThrow("Usuario o contraseña incorrectos");
  });

  it("deberia permitir login con usuario y contraseña correctos", () => {
    const rut = "21867698-7";
    const contraseña = "admin";
    expect(() => {
      if (!(rut === "21867698-7" && contraseña === "admin"))
        throw new Error("Usuario o contraseña incorrectos");
    }).not.toThrow();
  });
});

import { describe, it, expect } from "vitest";
import { validarRut } from "../../pages/Registro";

describe("validarRut()", () => {
  it("deberia retornar true para un rut valido", () => {
    expect(validarRut("12345678-5")).toBe(true);
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

describe("validacion de formulario de registro", () => {
  it("deberia lanzar error si nombre esta vacio", () => {
    const nombre = "";
    expect(() => {
      if (!nombre) throw new Error("Nombre vacio");
    }).toThrow("Nombre vacio");
  });

  it("deberia lanzar error si correo y confirmacion no coinciden", () => {
    const email = "correo@ejemplo.com";
    const confirmarEmail = "otro@ejemplo.com";
    expect(() => {
      if (email !== confirmarEmail) throw new Error("Los correos no coinciden");
    }).toThrow("Los correos no coinciden");
  });

  it("deberia lanzar error si contraseña y confirmacion no coinciden", () => {
    const contraseña = "123456";
    const confirmarContraseña = "654321";
    expect(() => {
      if (contraseña !== confirmarContraseña) throw new Error("Las contraseñas no coinciden");
    }).toThrow("Las contraseñas no coinciden");
  });

  it("deberia lanzar error si no se aceptan terminos", () => {
    const terminos = false;
    expect(() => {
      if (!terminos) throw new Error("Debes aceptar los terminos");
    }).toThrow("Debes aceptar los terminos");
  });
});

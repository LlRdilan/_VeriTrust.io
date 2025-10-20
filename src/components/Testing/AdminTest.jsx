describe("AdminTest()", () => {
  it("deberia aceptar un servicio valido", () => {
    const servicio = {
      name: "Firma Digital",
      desc: "Certificado SII",
      price: 15000,
      longDesc: "Primera linea\nSegunda linea\nTercera linea",
    };
    expect(AdminTest(servicio)).toBe(true);
  });

  it("deberia lanzar error si el nombre esta vacio", () => {
    const servicio = {
      name: "",
      desc: "Descripcion valida",
      price: 10000,
      longDesc: "Linea 1\nLinea 2\nLinea 3",
    };
    expect(() => AdminTest(servicio)).toThrow("Nombre y descripcion son obligatorios");
  });

  it("deberia lanzar error si el precio es negativo", () => {
    const servicio = {
      name: "Servicio",
      desc: "Descripcion valida",
      price: -5000,
      longDesc: "Linea 1\nLinea 2\nLinea 3",
    };
    expect(() => AdminTest(servicio)).toThrow("El precio debe ser un numero entero positivo");
  });

  it("deberia lanzar error si el precio es decimal", () => {
    const servicio = {
      name: "Servicio",
      desc: "Descripcion valida",
      price: 1234.56,
      longDesc: "Linea 1\nLinea 2\nLinea 3",
    };
    expect(() => AdminTest(servicio)).toThrow("El precio debe ser un numero entero positivo");
  });

  it("deberia lanzar error si la descripcion larga tiene menos de 3 lineas", () => {
    const servicio = {
      name: "Servicio",
      desc: "Descripcion valida",
      price: 10000,
      longDesc: "Solo una linea",
    };
    expect(() => AdminTest(servicio)).toThrow("La descripcion larga debe tener al menos 3 lineas");
  });
});

import { useState, useEffect } from 'react';

const testimoniosData = [
  {
    id: 1,
    texto: "La implementación de la firma electrónica en nuestra empresa ha sido un gran avance. Simplificó procesos internos y mejoró la experiencia de nuestros clientes.",
    nombre: "Jean Beausejour",
    imagen: "images/jean-beausejour_foto.jpg",
    cargo: "Director Ejecutivo"
  },
  {
    id: 2,
    texto: "La integración de la identidad digital en nuestros sistemas internos nos permitió reducir tiempos de aprobación y aumentar la seguridad en cada transacción.",
    nombre: "Jeannett Jara",
    imagen: "images/jeannet_jara_foto.jpg",
    cargo: "Asesora Financiera"
  },
  {
    id: 3,
    texto: "Con la firma electrónica y certificados digitales logramos agilizar procesos legales y administrativos, mejorando significativamente la productividad de nuestro equipo.",
    nombre: "José Antonio Kast",
    imagen: "images/jose_kast_foto.jpg",
    cargo: "Presidente"
  }
];

const estadisticasData = [
  {
    icono: "fa fa-users",
    numero: "500+",
    texto: "Clientes Activos",
    color: "#66d6ff"
  },
  {
    icono: "fa fa-building",
    numero: "200+",
    texto: "Empresas",
    color: "#1f235e"
  },
  {
    icono: "fa fa-file-signature",
    numero: "1M+",
    texto: "Documentos Firmados",
    color: "#66d6ff"
  },
  {
    icono: "fa fa-star",
    numero: "98%",
    texto: "Satisfacción",
    color: "#1f235e"
  }
];

const empresasClientes = [
  { nombre: "Banco Santander", logo: "images/banco_santander.webp" },
  { nombre: "Banco Falabella", logo: "images/banco_falabella.jpg" },
  { nombre: "Banco de Chile", logo: "images/banco_Chile.jpg" },
  { nombre: "Banco BCI", logo: "images/banco_bci.jpg" },
  { nombre: "Scotiabank", logo: "images/banco_scotiabank.png" },
  { nombre: "CencoPay", logo: "images/banco_cencopay.png" },
  { nombre: "Mercado Pago", logo: "images/banco_mercadopago.jpg" },
  { nombre: "SII", logo: "images/banco_sii.jpg" }
];

export default function Clientes() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimoniosData.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimoniosData.length) % testimoniosData.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="client" className="testimonial">
      {/* Sección de Estadísticas */}
      <div className="clientes_stats_section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2>Nuestros Números</h2>
                <p>Confianza y resultados que hablan por sí solos</p>
              </div>
            </div>
          </div>
          <div className="row">
            {estadisticasData.map((stat, index) => (
              <div key={index} className="col-md-3 col-sm-6">
                <div className="clientes_stat_box">
                  <div className="stat_icon" style={{ color: stat.color }}>
                    <i className={stat.icono}></i>
                  </div>
                  <h3 className="stat_numero">{stat.numero}</h3>
                  <p className="stat_texto">{stat.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección de Empresas Clientes */}
      <div className="clientes_empresas_section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2>Empresas que Confían en Nosotros</h2>
                <p>Instituciones líderes que han elegido nuestras soluciones digitales</p>
              </div>
            </div>
          </div>
          <div className="row">
            {empresasClientes.map((empresa, index) => (
              <div key={index} className="col-md-3 col-sm-4 col-6">
                <div className="clientes_empresa_box">
                  <img 
                    src={empresa.logo} 
                    alt={empresa.nombre}
                    className="empresa_logo"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección de Testimonios */}
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="titlepage">
              <h2>¿Qué piensan nuestros clientes?</h2>
              <p>Testimonios reales de quienes han transformado sus procesos</p>
            </div>
          </div>
        </div>
      </div>

      <div id="testimo" className="carousel slide testimonial_Carousel">
        <div className="carousel-inner">
          {testimoniosData.map((testimonio, index) => (
            <div
              key={testimonio.id}
              className={`carousel-item ${activeIndex === index ? "active" : ""}`}
            >
              <div className="container">
                <div className="carousel-caption">
                  <div className="row">
                    <div className="col-md-8 offset-md-2">
                      <div className="test_box clientes_test_box">
                        <div className="testimonial_quote_icon">
                          <i className="fa fa-quote-left"></i>
                        </div>
                        <p className="testimonial_texto">{testimonio.texto}</p>
                        <div className="testimonial_autor">
                          <div className="testimonial_imagen">
                            <img 
                              src={testimonio.imagen} 
                              alt={`Foto de ${testimonio.nombre}`} 
                            />
                          </div>
                          <div className="testimonial_info">
                            <span className="testimonial_nombre">{testimonio.nombre}</span>
                            <span className="testimonial_cargo">{testimonio.cargo}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev clientes_carousel_control"
          onClick={prevSlide}
          aria-label="Testimonio anterior"
        >
          <i className="fa fa-chevron-left" aria-hidden="true" />
          <span className="sr-only">Anterior</span>
        </button>

        <button
          className="carousel-control-next clientes_carousel_control"
          onClick={nextSlide}
          aria-label="Siguiente testimonio"
        >
          <i className="fa fa-chevron-right" aria-hidden="true" />
          <span className="sr-only">Siguiente</span>
        </button>
      </div>

      {/* Sección de Beneficios */}
      <div className="clientes_beneficios_section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage">
                <h2>Beneficios para Nuestros Clientes</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="clientes_beneficio_box">
                <div className="beneficio_icon">
                  <i className="fa fa-shield-alt"></i>
                </div>
                <h3>Seguridad Máxima</h3>
                <p>Protección avanzada con encriptación de nivel empresarial y cumplimiento normativo.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="clientes_beneficio_box">
                <div className="beneficio_icon">
                  <i className="fa fa-clock"></i>
                </div>
                <h3>Ahorro de Tiempo</h3>
                <p>Reduce hasta un 80% el tiempo en procesos de firma y validación de documentos.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="clientes_beneficio_box">
                <div className="beneficio_icon">
                  <i className="fa fa-headset"></i>
                </div>
                <h3>Soporte 24/7</h3>
                <p>Equipo de expertos disponible en todo momento para resolver tus dudas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
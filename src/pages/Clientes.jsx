import { useState, useEffect } from 'react';

const testimoniosData = [
  {
    id: 1,
    texto: "La implementación de la firma electrónica en nuestra empresa ha sido un gran avance. Simplificó procesos internos y mejoró la experiencia de nuestros clientes.",
    nombre: "Jean Beausejour",
    imagen: "images/jean-beausejour_foto.jpg"
  },
  {
    id: 2,
    texto: "La integración de la identidad digital en nuestros sistemas internos nos permitió reducir tiempos de aprobación y aumentar la seguridad en cada transacción.",
    nombre: "Jeannett Jara",
    imagen: "images/jeannet_jara_foto.jpg"
  },
  {
    id: 3,
    texto: "Con la firma electrónica y certificados digitales logramos agilizar procesos legales y administrativos, mejorando significativamente la productividad de nuestro equipo.",
    nombre: "José Antonio Kast",
    imagen: "images/jose_kast_foto.jpg"
  }
];

export default function Clientes() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimoniosData.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimoniosData.length) % testimoniosData.length);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  // Auto-advance carousel (opcional)
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="client" className="testimonial">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="titlepage">
              <h2>
                <br />
                ¿Qué piensan nuestros clientes?
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div id="testimo" className="carousel slide testimonial_Carousel">
        <ol className="carousel-indicators">
          {testimoniosData.map((_, index) => (
            <li
              key={index}
              className={activeIndex === index ? "active" : ""}
              onClick={() => goToSlide(index)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </ol>

        <div className="carousel-inner">
          {testimoniosData.map((testimonio, index) => (
            <div
              key={testimonio.id}
              className={`carousel-item ${activeIndex === index ? "active" : ""}`}
            >
              <div className="container">
                <div className="carousel-caption">
                  <div className="row">
                    <div className="col-md-6 offset-md-3">
                      <div className="test_box">
                        {/* AQUI ESTA EL CAMBIO: borderRadius agregado al párrafo */}
                        <p style={{ borderRadius: '20px', padding: '30px' }}>{testimonio.texto}</p>
                        <i>
                          <img 
                            src={testimonio.imagen} 
                            alt={`Foto de ${testimonio.nombre}`} 
                            style={{ borderRadius: '50%', width: '100px', height: '100px', objectFit: 'cover' }}
                          />
                        </i>
                        <span>{testimonio.nombre}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          onClick={prevSlide}
          aria-label="Testimonio anterior"
        >
          <i className="fa fa-chevron-left" aria-hidden="true" />
          <span className="sr-only">Anterior</span>
        </button>

        <button
          className="carousel-control-next"
          onClick={nextSlide}
          aria-label="Siguiente testimonio"
        >
          <i className="fa fa-chevron-right" aria-hidden="true" />
          <span className="sr-only">Siguiente</span>
        </button>
      </div>
      <br />
    </div>
  );
}
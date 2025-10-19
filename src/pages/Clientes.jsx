export default function Clientes() {
  return (
    <div id="client" className="testimonial">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="titlepage">
              <h2>
                <strong className="yellow">Testimonios</strong>
                <br />¿Qué piensan nuestros clientes?
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div id="testimo" className="carousel slide testimonial_Carousel " data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#testimo" data-slide-to="0" className="active"></li>
          <li data-target="#testimo" data-slide-to="1"></li>
          <li data-target="#testimo" data-slide-to="2"></li>
        </ol>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container">
              <div className="carousel-caption ">
                <div className="row">
                  <div className="col-md-6 offset-md-3">
                    <div className="test_box">
                      <p>
                        La implementación de la firma electrónica en nuestra empresa ha sido un gran avance.
                        Simplificó procesos internos y mejoró la experiencia de nuestros clientes.
                      </p>
                      <i><img src="images/jean-beausejour_foto.jpg" alt="#" /></i> <span> Jean Beausejour</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="container">
              <div className="carousel-caption">
                <div className="row">
                  <div className="col-md-6 offset-md-3">
                    <div className="test_box">
                      <p>
                        La integración de la identidad digital en nuestros sistemas internos nos permitió
                        reducir tiempos de aprobación y aumentar la seguridad en cada transacción.
                      </p>
                      <i><img src="images/jeannet_jara_foto.jpg" alt="#" /></i> <span> Jeannett Jara</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-item">
            <div className="container">
              <div className="carousel-caption">
                <div className="row">
                  <div className="col-md-6 offset-md-3">
                    <div className="test_box">
                      <p>
                        {' '}Con la firma electrónica y certificados digitales logramos agilizar procesos legales y
                        administrativos, mejorando significativamente la productividad de nuestro equipo."
                      </p>
                      <i><img src="images/jose_kast_foto.jpg" alt="#" /></i> <span> José Antonio Kast</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <a className="carousel-control-prev" href="#testimo" role="button" data-slide="prev">
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
        </a>
        <a className="carousel-control-next" href="#testimo" role="button" data-slide="next">
          <i className="fa fa-chevron-right" aria-hidden="true"></i>
        </a>
      </div>
      <br />
    </div>
  );
}

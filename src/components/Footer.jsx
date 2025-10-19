export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="container">
          <div className="row">

            <div className="col-md-12" style={{ display: 'flex', justifyContent: 'center' }}>
              <a className="logo2" href="#"><img src="images/loogo2.png" alt="#" /></a>
            </div>

            <div className="col-lg-5 col-md-6 col-sm-6">
              <h3>Contáctanos</h3>
              <ul className="location_icon">
                <li>
                  <a href="#"><i className="fa fa-map-marker" aria-hidden="true"></i></a> Antonio Varas 666,
                  Providencia
                </li>
                <li>
                  <a href="#"><i className="fa fa-envelope" aria-hidden="true"></i></a>VeriTrust@duocuc.cl
                </li>
                <li>
                  <a href="#"><i className="fa fa-volume-control-phone" aria-hidden="true"></i></a>+569 1111 1111
                </li>
              </ul>
              <ul className="social_icon">
                <li><a href="#"><i className="fa fa-facebook-f"></i></a></li>
                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                <li><a href="#"><i className="fa fa-instagram"></i></a></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-6 col-sm-6">
              <h3>Menú</h3>
              <ul className="link_icon">
                <li><a href="index.html"> Inicio</a></li>
                <li><a href="about.html">Nosotros</a></li>
                <li><a href="service.html">Servicios</a></li>
                <li><a href="tutorial.html">Tutoriales</a></li>
                <li><a href="client.html">Clientes</a></li>
                <li><a href="contact.html">Contáctanos</a></li>
              </ul>
            </div>

            <div className="col-lg-5 col-md-12 col-sm-12">
              <h3>Nuestra Ubicación</h3>
              <div
                className="map-container"
                style={{ position: 'relative', height: '250px', borderRadius: '8px', overflow: 'hidden', marginTop: '15px' }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.6776567845147!2d-70.61161732436086!3d-33.43247639999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c50c8e8cdb9f%3A0x7c3b2a3b2a3b2a3b!2sAntonio%20Varas%20666%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses!2scl!4v1693507200000!5m2!1ses!2scl"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa"
                ></iframe>
              </div>
              <div style={{ marginTop: '10px', fontSize: '12px', color: '#888' }}>
                <i className="fa fa-clock-o" aria-hidden="true"></i> Lunes a Viernes: 9:00 - 18:00
              </div>
            </div>

          </div>
        </div>

        <div className="copyright">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <p>
                  © 2019 Todos los derechos reservados.
                  <a href="https://html.design/"> Plantillas HTML Gratis</a>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

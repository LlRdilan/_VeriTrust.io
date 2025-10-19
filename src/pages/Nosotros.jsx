export default function Nosotros() {
  return (
    <div id="about" className="about">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-lg-7">
            <div className="about_box">
              <div className="titlepage">
                <h2><strong className="yellow">Sobre Nosotros</strong></h2>
              </div>
              <h3>SOLUCIONES INTEGRALES PARA EMPRESAS Y USUARIOS</h3>
              <p>
                En VeriTrust, nos dedicamos a ofrecer servicios de identidad digital de alta confiabilidad.
                Nuestra experiencia en certificación digital, firma electrónica y verificación de identidad
                permite a organizaciones y personas realizar sus gestiones en línea de manera segura, eficiente
                y conforme a los estándares legales y tecnológicos más exigentes.
              </p>
              <p>
                Desde certificados digitales hasta firmas electrónicas reconocidas por el SII,
                proporcionamos las herramientas necesarias para que tu empresa opere en el mundo digital
                con total tranquilidad y respaldo legal.
              </p>
              <span className="try">CONOCE CÓMO NUESTRAS SOLUCIONES PUEDEN FORTALECER TU EMPRESA</span>
              <a
                className="read_morea"
                href="service.html"
                style={{ textAlign: 'left', display: 'inline-block' }}
              >
                Comenzar <i className="fa fa-angle-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <div className="col-md-12 col-lg-5">
            <div className="about_img">
              <figure><img src="images/about_img2.jpg" alt="VeriTrust - Identidad Digital Segura" /></figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

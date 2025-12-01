import { Link } from 'react-router-dom';

export default function Nosotros() {
  return (
    <div id="about" className="about about_section">
      <div className="container">
        <div className="row d_flex align-items-center">
          
          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
            <div className="about_box_content">
              <div className="titlepage text-lg-left text-center">
                <h2>Sobre Nosotros</h2>
              </div>
              
              <h3 className="about_subtitle text-lg-left text-center">
                Soluciones integrales para tu seguridad digital
              </h3>

              <p className="about_text text-lg-left text-center">
                En VeriTrust, nos dedicamos a ofrecer servicios de identidad digital de alta confiabilidad. 
                Nuestra experiencia en certificación digital, firma electrónica y verificación de identidad 
                permite a organizaciones y personas realizar sus gestiones en línea de manera segura.
              </p>

              <p className="about_text text-lg-left text-center mb-4">
                Desde certificados digitales hasta firmas electrónicas reconocidas por el SII, 
                proporcionamos las herramientas necesarias para que tu empresa opere con total tranquilidad.
              </p>

              <div className="text-lg-left text-center">
                <Link className="read_more" to="/servicios">Ver Servicios</Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="about_img_container">
              <figure>
                <img 
                  className="about_img_style"
                  src="images/about_img2.jpg" 
                  alt="Equipo VeriTrust" 
                />
              </figure>
              
              <div className="floating_box d-none d-lg-block">
                  <h4>+2</h4>
                  <span>Años de experiencia</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
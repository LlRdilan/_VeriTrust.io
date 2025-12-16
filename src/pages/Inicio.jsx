import '../styles/a_animacion_carrusel.css';
import '../styles/owl.carousel.min.css';
import { Link } from 'react-router-dom';

const LOGO_IMAGES = [
    'banco_cencopay.png', 
    'banco_falabella.jpg', 
    'banco_santander.webp', 
    'banco_sii.jpg', 
    'banco_Chile.jpg', 
    'banco_bci.jpg', 
    'banco_scotiabank.png', 
    'banco_mercadopago.jpg'
];

const DUPLICATED_LOGOS = [...LOGO_IMAGES, ...LOGO_IMAGES];

function LogoCarousel({ logos }) {
    return (
        <div className="logo-marquee-container">
            <div className="logo-marquee-track">
                {DUPLICATED_LOGOS.map((logo, index) => (
                    <div key={`${logo}-${index}`} className="logo-marquee-item">
                        <img 
                            src={`images/${logo}`} 
                            alt={`Logo ${index + 1}`} 
                            className="logo-img inicio-logo-rounded"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Inicio() {
    return (
        <section className="banner_main">
            <div className="container">
                <div className="row">
                    <div className="col-md-7 col-lg-7 mx-auto">
                        <div className="text-bg text-center">
                            <h1>Tu Identidad Digital,<br /></h1>
                            <span> más segura y confiable que nunca</span>
                            <p>Con Certificado Digital, Firma Electrónica y DNI puedes gestionar tus trámites en línea de manera rápida, sencilla y con total protección.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="business">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 mx-auto">
                            <div className="titlepage">
                                <h2><strong className="yellow"></strong>Premios y nominaciones que nos motivan</h2>
                                <p>Estos reconocimientos son el reflejo de la confianza de nuestros clientes y aliados, y nos impulsan a seguir desarrollando servicios digitales de excelencia.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-sm-6">
                            <div id="ho_color" className="business_box">
                                <i><img src="images/business_icon1.png" alt="#" /></i>
                                <h3>+0</h3>
                                <p>NOMINACIONES</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div id="ho_color" className="business_box">
                                <i><img src="images/business_icon2.png" alt="#" /></i>
                                <h3>+0</h3>
                                <p>AGENCIAS</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div id="ho_color" className="business_box">
                                <i><img src="images/business_icon3.png" alt="#" /></i>
                                <h3>+0</h3>
                                <p>PREMIOS</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div id="ho_color" className="business_box">
                                <i><img src="images/business_icon4.png" alt="#" /></i>
                                <h3>3</h3>
                                <p>TRABAJADORES </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="portfolio">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mx-auto">
                            <div className="titlepage">
                                <h2 className="yellow"> Porque la confianza también se certifica.</h2>
                                <p>Cada una de estas alianzas refleja nuestro compromiso con la seguridad, la innovación y la confianza, permitiendo que miles de usuarios y organizaciones realicen sus gestiones digitales de forma simple y protegida.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="logo-carousel-section">
                    <LogoCarousel logos={LOGO_IMAGES} />
                </div>
            </div>
        </section>
    );
}
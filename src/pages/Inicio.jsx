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

// Duplicamos los logos para crear el efecto infinito suave
const DUPLICATED_LOGOS = [...LOGO_IMAGES, ...LOGO_IMAGES];

function LogoCarousel({ logos, roundedStyle }) {
    return (
        <div className="logo-marquee-container">
            <div className="logo-marquee-track">
                {DUPLICATED_LOGOS.map((logo, index) => (
                    <div key={`${logo}-${index}`} className="logo-marquee-item">
                        <img 
                            src={`images/${logo}`} 
                            alt={`Logo ${index + 1}`} 
                            style={roundedStyle} 
                            className="logo-img"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Inicio() {
    const roundedStyle = {
        borderRadius: '20px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease',
        width: '100%',
        maxWidth: '180px',
        height: 'auto',
        margin: '0 auto',
        display: 'block'
    };

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

<<<<<<< Updated upstream
                {/* CARRUSEL DE IMÁGENES */}
                <div id="myCarousel" className="carousel slide portfolio_Carousel" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="container">
                                <div className="carousel-caption">
                                    {/* CLASE d-flex justify-content-center para centrar las imágenes pequeñas */}
                                    <div className="row d-flex justify-content-center"> 
                                        <div className="col-md-3 col-sm-6">
                                            <div className="portfolio_img">
                                                <img src="images/cenco_pay_empresa.jpg" alt="#" style={roundedStyle} />
                                                <div className="middle">
                                                    <div className="text2">View More</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-6">
                                            <div className="portfolio_img">
                                                <img src="images/banco_falabella_empresa.png" alt="#" style={roundedStyle} />
                                                <div className="middle"></div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-6">
                                            <div className="portfolio_img">
                                                <img src="images/banco_santander_empresa.png" alt="#" style={roundedStyle} />
                                                <div className="middle"></div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-6">
                                            <div className="portfolio_img">
                                                <img src="images/sii_foto.png" alt="#" style={roundedStyle} />
                                                <div className="middle"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="carousel-item">
                            <div className="container">
                                <div className="carousel-caption">
                                    <div className="row d-flex justify-content-center"> 
                                        <div className="col-md-3 col-sm-6">
                                            <div className="portfolio_img">
                                                <img src="images/cenco_pay_empresa.jpg" alt="#" style={roundedStyle} />
                                                <div className="middle"></div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-6">
                                            <div className="portfolio_img">
                                                <img src="images/banco_falabella_empresa.png" alt="#" style={roundedStyle} />
                                                <div className="middle"></div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-6">
                                            <div className="portfolio_img">
                                                <img src="images/banco_santander_empresa.png" alt="#" style={roundedStyle} />
                                                <div className="middle"></div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-6">
                                            <div className="portfolio_img">
                                                <img src="images/sii_foto.png" alt="#" style={roundedStyle} />
                                                <div className="middle"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                    </a>
                    <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    </a>
=======
                {/* Carrusel de logos con animación CSS */}
                <div className="logo-carousel-section">
                    <LogoCarousel logos={LOGO_IMAGES} roundedStyle={roundedStyle} />
>>>>>>> Stashed changes
                </div>
            </div>
        </section>
    );
}
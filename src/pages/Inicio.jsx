import { useState, useEffect } from 'react';

export default function Inicio() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const images = [
        { src: "images/cenco_pay_empresa.jpg", alt: "Cenco Pay" },
        { src: "images/banco_falabella_empresa.png", alt: "Banco Falabella" },
        { src: "images/banco_santander_empresa.png", alt: "Banco Santander" },
        { src: "images/sii_foto.png", alt: "SII" }
    ];

    return (
        <section className="banner_main">
            <div className="container">
                <div className="row">
                    <div className="col-md-7 col-lg-7">
                        <div className="text-bg">
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
                        <div className="col-md-7">
                            <div className="titlepage">
                                <h2><strong className="yellow"></strong>Premios y nominaciones que nos motivan</h2>
                                <p>Estos reconocimientos son el reflejo de la confianza de nuestros clientes y aliados, y nos impulsan a seguir desarrollando servicios digitales de excelencia.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-sm-6"><div className="business_box"><i><img src="images/business_icon1.png" alt="#" /></i><h3>+0</h3><p>NOMINACIONES</p></div></div>
                        <div className="col-md-3 col-sm-6"><div className="business_box"><i><img src="images/business_icon2.png" alt="#" /></i><h3>+0</h3><p>AGENCIAS</p></div></div>
                        <div className="col-md-3 col-sm-6"><div className="business_box"><i><img src="images/business_icon3.png" alt="#" /></i><h3>+0</h3><p>PREMIOS</p></div></div>
                        <div className="col-md-3 col-sm-6"><div className="business_box"><i><img src="images/business_icon4.png" alt="#" /></i><h3>3</h3><p>TRABAJADORES </p></div></div>
                    </div>
                </div>
            </div>

            <div className="portfolio">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="titlepage">
                                <h2 className="yellow"> Porque la confianza también se certifica.</h2>
                                <p>Cada una de estas alianzas refleja nuestro compromiso con la seguridad, la innovación y la confianza, permitiendo que miles de usuarios y organizaciones realicen sus gestiones digitales de forma simple y protegida.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="myCarousel" className="carousel slide portfolio_Carousel" data-ride="carousel" style={{ position: 'relative', maxWidth: '450px', margin: '0 auto', paddingBottom: '80px' }}>
                    <ol className="carousel-indicators">
                        {images.map((_, index) => (
                            <li
                                key={index}
                                data-target="#myCarousel"
                                data-slide-to={index}
                                className={index === 0 ? 'active' : ''}
                            />
                        ))}
                    </ol>

                    <div className="carousel-inner">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                            >
                                <div className="container">
                                    <div className="carousel-caption">
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12" style={{ margin: '0 auto', float: 'none' }}>
                                                <div className="portfolio_img" style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(15, 179, 209, 0.2)', maxWidth: '400px', margin: '0 auto' }}>
                                                    <img src={image.src} alt={image.alt} style={{ width: '100%', height: 'auto', maxHeight: '250px', objectFit: 'contain' }} />
                                                    <div className="middle">
                                                        <div className="text2">{image.alt}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev" style={{ left: isMobile ? '10px' : '-70px' }}>
                        <i className="fa fa-chevron-left" aria-hidden="true"></i>
                    </a>
                    <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next" style={{ right: isMobile ? '10px' : '-70px' }}>
                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </section>
    );
}
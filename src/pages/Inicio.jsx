import { useState, useEffect } from 'react';

export default function Inicio() {
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
                    <div classNameName="col-md-5 col-lg-5">
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
            <div class="portfolio">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 ">
                            <div class="titlepage">
                                <h2 class="yellow"> Porque la confianza también se certifica.</h2>
                                <p>Cada una de estas alianzas refleja nuestro compromiso con la seguridad, la innovación y la confianza, permitiendo que miles de usuarios y organizaciones realicen sus gestiones digitales de forma simple y protegida.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="myCarousel" class="carousel slide portfolio_Carousel " data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                        <li data-target="#myCarousel" data-slide-to="1"></li>
                        <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div class="container">
                                <div class="carousel-caption ">
                                    <div class="row">
                                        <div class="col-md-3 col-sm-6">
                                            <div class="portfolio_img">
                                                <img src="images/cenco_pay_empresa.jpg" alt="#" />
                                                <div class="middle">
                                                    <div class="text2">View More</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-6">
                                            <div class="portfolio_img">
                                                <img src="images/banco_falabella_empresa.png" alt="#" />
                                                <div class="middle">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-6">
                                            <div class="portfolio_img">
                                                <img src="images/banco_santander_empresa.png" alt="#" />
                                                <div class="middle">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-6">
                                            <div class="portfolio_img">
                                                <img src="images/sii_foto.png" alt="#" />
                                                <div class="middle">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="container">
                                <div class="carousel-caption">
                                    <div class="row">
                                        <div class="col-md-3 col-sm-6">
                                            <div class="portfolio_img">
                                                <img src="images/cenco_pay_empresa.jpg" alt="#" />
                                                <div class="middle">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-6">
                                            <div class="portfolio_img">
                                                <img src="images/banco_falabella_empresa.png" alt="#" />
                                                <div class="middle">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-6">
                                            <div class="portfolio_img">
                                                <img src="images/banco_santander_empresa.png" alt="#" />
                                                <div class="middle">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-6">
                                            <div class="portfolio_img">
                                                <img src="images/sii_foto.png" alt="#" />
                                                <div class="middle">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                        <i class="fa fa-chevron-left" aria-hidden="true"></i>
                    </a>
                    <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </section>
    )
}

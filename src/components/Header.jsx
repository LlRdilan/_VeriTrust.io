import { Link } from 'react-router-dom';
export default function Header() {
    return (
        <header>
            <div className="header">
                <div className="header_to d_none">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-sm-6 d-flex align-items-center justify-content-start">
                                <div className="language-box d-flex align-items-center">
                                    <i className="fa fa-globe" aria-hidden="true"></i>
                                    <span className="lang-label ms-2 me-2">Idioma:</span>
                                    <img className="flag-icon" src="/images/espana_bandera.png" alt="ES" />
                                    <select className="lang-select">
                                        <option value="es">Español</option>
                                        <option value="en">Inglés</option>
                                        <option value="pt">Portugués</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6 col-sm-6 d-flex justify-content-end align-items-center">
                                <span className="me-2 fw-bold text-dark">Nuestras Redes :</span>
                                <ul className="d-flex mb-0 social_icon1">
                                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                    <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                                </ul>
                            </div>


                        </div>
                    </div>
                </div>
                <div className="header_midil">
                    <div className="container">
                        <div className="row d_flex">
                            <div className="col-md-4 col-sm-4 d_none">
                                <ul className="conta_icon">
                                    <li><a href="#"><i className="fa fa-phone" aria-hidden="true"></i> Contacto: +569 1111 1111</a> </li>
                                </ul>
                            </div>
                            <div className="col-md-4 col-sm-4 ">
                                <a className="logo" href="#"><img src="images/logo.png" alt="#" /></a>
                            </div>
                            <div className="col-md-4 col-sm-4 d_none">
                                <ul className="conta_icon ">
                                    <li><a href="#"><i className="fa fa-envelope" aria-hidden="true"></i> VeriTrust@duocuc.cl</a> </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header_bo">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <nav className="navigation navbar navbar-expand-md navbar-dark ">
                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarsExample04">
                                        <ul className="navbar-nav mr-auto">
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/">Inicio</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/nosotros">Nosotros</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/servicios">Servicios</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/tutorial">Tutoriales</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/clientes">Clientes</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/contactanos">Contáctanos</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="sign_btn nav-link" to="/login">Acceder</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
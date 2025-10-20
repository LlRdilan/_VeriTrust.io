import { Link } from 'react-router-dom';
export default function Header() {
    return (
        <header>
            <div className="header">
                <div className="header_to d_none">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <ul className="lan">
                                    <li><i className="fa fa-globe" aria-hidden="true"></i> Idioma : <img src="images/espana_bandera.png" alt="#" /></li>
                                </ul>
                                <form action="#">
                                    <div className="select-box">
                                        <label htmlFor="select-box1" className="label select-box1"><span className="label-desc">Español</span> </label>
                                        <select id="select-box1" className="select">
                                            <option value="Choice 1">Español</option>
                                            <option value="Choice 1">Inglés</option>
                                            <option value="Choice 2">Portugués</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-6 col-sm-6 ">
                                <ul className="social_icon1">
                                    <li> Nuestras Redes
                                    </li>
                                    <li> <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i>
                                    </a>
                                    </li>
                                    <li> <a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li> <a href="#"> <i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                    <li> <a href="#"><i className="fa fa-instagram"></i></a>
                                    </li>
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
                                            <Link className="sign_btn nav-link" to="/login">Iniciar Sesión</Link>
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

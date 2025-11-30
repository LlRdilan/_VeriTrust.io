import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation(); 
    const [user, setUser] = useState(null);

    // Escucha cambios de ruta para actualizar el header si el usuario se loguea/desloguea
    useEffect(() => {
        const storedSession = localStorage.getItem("user_session");
        if (storedSession) {
            try {
                setUser(JSON.parse(storedSession));
            } catch (e) {
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, [location]);

    const cerrarSesion = () => {
        localStorage.removeItem("user_session");
        setUser(null);
        navigate("/login");
    };

    return (
        <header>
            <div className="header">
                <div className="header_to d_none">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-sm-6 d-flex align-items-center justify-content-start">
                                <div className="language-box d-flex align-items-center">
                                    <i className="fa fa-globe" aria-hidden="true" style={{color: '#fff'}}></i>
                                    <label htmlFor="language-selector" className="lang-label ms-2 me-2 mb-0" style={{color: '#fff'}}>
                                        Idioma:
                                    </label>
                                    <img className="flag-icon" src="/images/espana_bandera.png" alt="ES" style={{width: '20px', marginRight: '5px'}} />
                                    <select id="language-selector" name="language" className="lang-select" style={{border:'none', background:'transparent', color:'#fff', fontWeight:'600'}}>
                                        <option value="es" style={{color:'#000'}}>Español</option>
                                        <option value="en" style={{color:'#000'}}>Inglés</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 d-flex justify-content-end align-items-center">
                                <span className="me-2 fw-bold" style={{color: '#fff'}}>Nuestras Redes:</span>
                                <ul className="d-flex mb-0 social_icon1">
                                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
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
                                <Link className="logo" to="/"><img src="images/logo.png" alt="#" /></Link>
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
                                <nav className="navigation navbar navbar-expand-lg navbar-dark ">
                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarsExample04">
                                        <ul className="navbar-nav mr-auto">
                                            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
                                            <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
                                            <li className="nav-item"><Link className="nav-link" to="/servicios">Servicios</Link></li>
                                            <li className="nav-item"><Link className="nav-link" to="/tutorial">Tutoriales</Link></li>
                                            <li className="nav-item"><Link className="nav-link" to="/clientes">Clientes</Link></li>
                                            <li className="nav-item"><Link className="nav-link" to="/contactanos">Contáctanos</Link></li>
                                            
                                            {/* --- LOGICA DE SESION --- */}
                                            {user ? (
                                                <li className="nav-item dropdown">
                                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color: '#fff', fontWeight: 'bold'}}>
                                                        <i className="fa fa-user-circle" style={{marginRight: '5px'}}></i> {user.nombre}
                                                    </a>
                                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                        <Link className="dropdown-item" to="/admin">Ir al Panel</Link>
                                                        <div className="dropdown-divider"></div>
                                                        <button className="dropdown-item text-danger" onClick={cerrarSesion} style={{cursor:'pointer'}}>Cerrar Sesión</button>
                                                    </div>
                                                </li>
                                            ) : (
                                                <li className="nav-item">
                                                    <Link className="sign_btn nav-link" to="/login" style={{display: 'flex', alignItems: 'center'}}>Acceder</Link>
                                                </li>
                                            )}
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
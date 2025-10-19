export default function Header(){
    return (
        <header>
        <div class="header">
            <div class="header_to d_none">
                <div class="container">
                <div class="row">
                    <div class="col-md-6 col-sm-6">
                        <ul class="lan">
                            <li><i class="fa fa-globe" aria-hidden="true"></i> Idioma : <img src="images/espana_bandera.png" alt="#" /></li>
                        </ul>
                        <form action="#">
                            <div class="select-box">
                            <label for="select-box1" class="label select-box1"><span class="label-desc">Español</span> </label>
                            <select id="select-box1" class="select">
                                <option value="Choice 1">Español</option>
                                <option value="Choice 1">Inglés</option>
                                <option value="Choice 2">Portugués</option>
                            </select>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6 col-sm-6 ">
                        <ul class="social_icon1">
                            <li> Nuestras Redes
                            </li>
                            <li> <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i>
                            </a>
                            </li>
                            <li> <a href="#"><i class="fa fa-twitter"></i></a></li>
                            <li> <a href="#"> <i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
                            <li> <a href="#"><i class="fa fa-instagram" aria-hidden="true"></i>
                            </a>
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>
            <div class="header_midil">
                <div class="container">
                <div class="row d_flex">
                    <div class="col-md-4 col-sm-4 d_none">
                        <ul class="conta_icon">
                            <li><a href="#"><i class="fa fa-phone" aria-hidden="true"></i> Contacto: +569 1111 1111</a> </li>
                        </ul>
                    </div>
                    <div class="col-md-4 col-sm-4 ">
                        <a class="logo" href="#"><img src="images/logo.png" alt="#" /></a>
                    </div>
                    <div class="col-md-4 col-sm-4 d_none">
                        <ul class="conta_icon ">
                            <li><a href="#"><i class="fa fa-envelope" aria-hidden="true"></i> VeriTrust@duocuc.cl</a> </li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>
            <div class="header_bo">
                <div class="container">
                <div class="row">
                    <div class="col-md-12 col-sm-12">
                        <nav class="navigation navbar navbar-expand-md navbar-dark ">
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarsExample04">
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item">
                                    <a class="nav-link" href="index.html"> Inicio </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="about.html"> Nosotros </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="service.html"> Servicios </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="tutorial.html">Tutoriales</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="client.html">Clientes</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="contact.html"> Contáctanos</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#"><i class="fa fa-search nav-link" aria-hidden="true"></i></a>
                                </li>
                                <li class="nav-item">
                                    <a class="sign_btn nav-link" href="login.html">Iniciar Sesión</a>
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
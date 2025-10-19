export default function Footer() {
    return (
        <footer>
            <div class="footer">
                <div class="container">
                    <div class="row">
                    <div class="col-md-12" style="display: flex; justify-content: center;">
                        <a class="logo2" href="#"><img src="images/loogo2.png" alt="#" /></a>
                    </div>
                    <div class="col-lg-5 col-md-6 col-sm-6">
                        <h3>Contáctanos</h3>
                        <ul class="location_icon">
                            <li><a href="#"><i class="fa fa-map-marker" aria-hidden="true"></i></a> Antonio Varas 666,
                                Providencia</li>
                            <li><a href="#"><i class="fa fa-envelope" aria-hidden="true"></i></a>VeriTrust@duocuc.cl</li>
                            <li><a href="#"><i class="fa fa-volume-control-phone" aria-hidden="true"></i></a>+569 1111 1111
                            </li>
                        </ul>
                        <ul class="social_icon">
                            <li> <a href="#"><i class="fa fa-facebook-f"></i></a></li>
                            <li> <a href="#"><i class="fa fa-twitter"></i></a></li>
                            <li> <a href="#"> <i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
                            <li> <a href="#"><i class="fa fa-instagram"></i></a></li>
                        </ul>
                    </div>
                    <div class="col-lg-2 col-md-6 col-sm-6">
                        <h3>Menú</h3>
                        <ul class="link_icon">
                            <li> <a href="index.html"> Inicio</a></li>
                            <li> <a href="about.html">Nosotros</a></li>
                            <li> <a href="service.html">Servicios</a></li>
                            <li> <a href="tutorial.html">Tutoriales</a></li>
                            <li> <a href="client.html">Clientes</a></li>
                            <li> <a href="contact.html">Contáctanos</a></li>
                        </ul>
                    </div>
                    <div class="col-lg-5 col-md-12 col-sm-12">
                        <h3>Nuestra Ubicación</h3>
                        <div class="map-container" style="position: relative; height: 250px; border-radius: 8px; overflow: hidden; margin-top: 15px;">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.6776567845147!2d-70.61161732436086!3d-33.43247639999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c50c8e8cdb9f%3A0x7c3b2a3b2a3b2a3b!2sAntonio%20Varas%20666%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses!2scl!4v1693507200000!5m2!1ses!2scl"
                                width="100%" 
                                height="100%" 
                                style="border:0; border-radius: 8px;" 
                                allowfullscreen="" 
                                loading="lazy" 
                                referrerpolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                        <div style="margin-top: 10px; font-size: 12px; color: #888;">
                            <i class="fa fa-clock-o" aria-hidden="true"></i> Lunes a Viernes: 9:00 - 18:00
                        </div>
                    </div>
                    </div>
                </div>
                <div class="copyright">
                    <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <p>© 2019 Todos los derechos reservados.<a href="https://html.design/"> Plantillas HTML Gratis</a>
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
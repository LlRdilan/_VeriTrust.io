export default function Login() {
    return (
        <div class="contact" style="padding-top:40px;padding-bottom:40px;">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 offset-md-2">
                        <div class="titlepage">
                            <h2><strong class="yellow">Iniciar Sesión</strong><br></br>Accede a tu cuenta</h2>
                        </div>
                        <form class="contact_form" id="loginForm">
                            <div class="row">
                                <div class="col-md-12">
                                    <label for="InputRut">RUT/RUN (Sin punto, pero con guion)</label>
                                    <input type="text" class="contact_control" id="InputRut" placeholder="Ej: 12345678-9" required></input>
                                    <small class="error" id="ErrorRut" style="color:red;"></small>
                                </div>
                                <div class="col-md-12">
                                    <label for="InputContraseña">Contraseña</label>
                                    <input type="password" class="contact_control" id="InputContraseña" placeholder="Ingresa tu contraseña" required></input>
                                    <small class="error" id="ErrorContraseña" style="color:red;"></small>
                                </div>
                                <div class="col-md-12 mt-3">
                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="Recuerdame"></input>
                                        <label class="form-check-label" for="Recuerdame">Recuérdame</label>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <button type="submit" class="send_btn">Ingresar</button>
                                </div>
                                <div class="col-md-12 mt-3 text-center">
                                    <p>¿No tienes cuenta? <a href="sign.html">Regístrate aquí</a></p>
                                    <p><a href="#">¿Olvidaste tu contraseña?</a></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
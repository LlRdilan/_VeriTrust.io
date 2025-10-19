export default function Registro() {
    return (
        <div class="contact" style="padding-top:40px;padding-bottom:40px;">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 offset-md-2">
                        <div class="titlepage">
                            <h2><strong class="yellow">Registro</strong>Crea tu cuenta para acceder a nuestros servicios</h2>
                        </div>
                        <form class="contact_form" id="registroForm">
                            <div class="row">
                                <div class="col-md-12">
                                    <label for="InputRut">RUT/RUN (Sin punto, pero con guion)</label>
                                    <input type="text" class="contact_control" id="InputRut" placeholder="Ej: 12345678-9" required></input>
                                    <small class="error" id="ErrorRut" style="color:red;"></small>
                                </div>
                                <div class="col-md-12">
                                    <label for="InputNombre">Nombre completo</label>
                                    <input type="text" class="contact_control" id="InputNombre" placeholder="Ingresa tu nombre completo" required></input>
                                    <small class="error" id="ErrorNombre" style="color:red;"></small>
                                </div>
                                <div class="col-md-12">
                                    <label for="InputFecha">Fecha de nacimiento</label>
                                    <input type="date" class="contact_control" id="InputFecha" required></input>
                                    <small class="error" id="ErrorFecha" style="color:red;"></small>
                                </div>
                                <div class="col-md-12">
                                    <label for="InputTelefono">Teléfono</label>
                                    <input type="tel" class="contact_control" id="InputTelefono" placeholder="Ej: +569 1234 5678" required></input>
                                    <small class="error" id="ErrorTelefono" style="color:red;"></small>
                                </div>
                                <div class="col-md-12">
                                    <label for="InputEmail">Correo electrónico</label>
                                    <input type="email" class="contact_control" id="InputEmail" placeholder="Ingresa tu correo electrónico" required></input>
                                    <small class="error" id="ErrorEmail" style="color:red;"></small>
                                </div>
                                <div class="col-md-12">
                                    <label for="InputConfirmarEmail">Confirma tu correo electrónico</label>
                                    <input type="email" class="contact_control" id="InputConfirmarEmail" placeholder="Repite tu correo electrónico" required></input>
                                    <small class="error" id="ErrorConfirmarEmail" style="color:red;"></small>
                                    <small id="emailHelp" class="form-text text-muted">Tu correo se mantendrá privado.</small>
                                </div>
                                <div class="col-md-12">
                                    <label for="InputContraseña">Contraseña</label>
                                    <input type="password" class="contact_control" id="InputContraseña" placeholder="Crea una contraseña" required></input>
                                    <small class="error" id="ErrorContraseña" style="color:red;"></small>
                                </div>
                                <div class="col-md-12">
                                    <label for="InputConfirmarContraseña">Confirma tu contraseña</label>
                                    <input type="password" class="contact_control" id="InputConfirmarContraseña" placeholder="Repite tu contraseña" required></input>
                                    <small class="error" id="ErrorConfirmarContraseña" style="color:red;"></small>
                                </div>
                                <div class="col-md-12 mt-3">
                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="Terminos" required></input>
                                        <label class="form-check-label" for="Terminos">Acepto los <a href="#">términos y condiciones</a></label>
                                        <small class="error" id="ErrorTerminos" style="color:red;"></small>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <button type="submit" class="send_btn">Crear cuenta</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}
import React from 'react';

export default function Registro() {
  return (
    <div className="contact" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="titlepage">
              <h2><strong className="yellow">Registro</strong>Crea tu cuenta para acceder a nuestros servicios</h2>
            </div>

            <form className="contact_form" id="registroForm">
              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="InputRut">RUT/RUN (Sin punto, pero con guion)</label>
                  <input type="text" className="contact_control" id="InputRut" placeholder="Ej: 12345678-9" required />
                  <small className="error" id="ErrorRut" style={{ color: 'red' }}></small>
                </div>

                <div className="col-md-12">
                  <label htmlFor="InputNombre">Nombre completo</label>
                  <input type="text" className="contact_control" id="InputNombre" placeholder="Ingresa tu nombre completo" required />
                  <small className="error" id="ErrorNombre" style={{ color: 'red' }}></small>
                </div>

                <div className="col-md-12">
                  <label htmlFor="InputFecha">Fecha de nacimiento</label>
                  <input type="date" className="contact_control" id="InputFecha" required />
                  <small className="error" id="ErrorFecha" style={{ color: 'red' }}></small>
                </div>

                <div className="col-md-12">
                  <label htmlFor="InputTelefono">Teléfono</label>
                  <input type="tel" className="contact_control" id="InputTelefono" placeholder="Ej: +569 1234 5678" required />
                  <small className="error" id="ErrorTelefono" style={{ color: 'red' }}></small>
                </div>

                <div className="col-md-12">
                  <label htmlFor="InputEmail">Correo electrónico</label>
                  <input type="email" className="contact_control" id="InputEmail" placeholder="Ingresa tu correo electrónico" required />
                  <small className="error" id="ErrorEmail" style={{ color: 'red' }}></small>
                </div>

                <div className="col-md-12">
                  <label htmlFor="InputConfirmarEmail">Confirma tu correo electrónico</label>
                  <input type="email" className="contact_control" id="InputConfirmarEmail" placeholder="Repite tu correo electrónico" required />
                  <small className="error" id="ErrorConfirmarEmail" style={{ color: 'red' }}></small>
                  <small id="emailHelp" className="form-text text-muted">Tu correo se mantendrá privado.</small>
                </div>

                <div className="col-md-12">
                  <label htmlFor="InputContraseña">Contraseña</label>
                  <input type="password" className="contact_control" id="InputContraseña" placeholder="Crea una contraseña" required />
                  <small className="error" id="ErrorContraseña" style={{ color: 'red' }}></small>
                </div>

                <div className="col-md-12">
                  <label htmlFor="InputConfirmarContraseña">Confirma tu contraseña</label>
                  <input type="password" className="contact_control" id="InputConfirmarContraseña" placeholder="Repite tu contraseña" required />
                  <small className="error" id="ErrorConfirmarContraseña" style={{ color: 'red' }}></small>
                </div>

                <div className="col-md-12 mt-3">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="Terminos" required />
                    <label className="form-check-label" htmlFor="Terminos">
                      Acepto los <a href="#">términos y condiciones</a>
                    </label>
                    <small className="error" id="ErrorTerminos" style={{ color: 'red' }}></small>
                  </div>
                </div>

                <div className="col-md-12">
                  <button type="submit" className="send_btn">Crear cuenta</button>
                </div>

              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

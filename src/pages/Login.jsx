export default function Login() {
  return (
    <div className="contact" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="titlepage">
              <h2>
                <strong className="yellow">Iniciar Sesión</strong>
                <br />Accede a tu cuenta
              </h2>
            </div>

            <form className="contact_form" id="loginForm">
              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="InputRut">RUT/RUN (Sin punto, pero con guion)</label>
                  <input type="text" className="contact_control" id="InputRut" placeholder="Ej: 12345678-9" required />
                  <small className="error" id="ErrorRut" style={{ color: 'red' }}></small>
                </div>

                <div className="col-md-12">
                  <label htmlFor="InputContraseña">Contraseña</label>
                  <input type="password" className="contact_control" id="InputContraseña" placeholder="Ingresa tu contraseña" required />
                  <small className="error" id="ErrorContraseña" style={{ color: 'red' }}></small>
                </div>

                <div className="col-md-12 mt-3">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="Recuerdame" />
                    <label className="form-check-label" htmlFor="Recuerdame">Recuérdame</label>
                  </div>
                </div>

                <div className="col-md-12">
                  <button type="submit" className="send_btn">Ingresar</button>
                </div>

                <div className="col-md-12 mt-3 text-center">
                  <p>¿No tienes cuenta? <a href="sign.html">Regístrate aquí</a></p>
                  <p><a href="#">¿Olvidaste tu contraseña?</a></p>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

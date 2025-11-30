import { useState } from 'react';

export default function Contactanos() {
  // Estado para controlar si el mensaje fue enviado
  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault(); // Evita que se recargue la página
    
    // Aquí iría la lógica real de envío (backend), por ahora simulamos éxito
    setMensajeEnviado(true);

    // Opcional: Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      setMensajeEnviado(false);
    }, 5000);
    
    // Opcional: Limpiar el formulario
    e.target.reset();
  };

  return (
    <div id="contact" className="contact">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="titlepage">
              <h2>
                <strong className="yellow">Contáctanos</strong>
                <br />Solicitar una llamada
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 offset-md-2">
            {/* Agregamos el evento onSubmit */}
            <form id="post_form" className="contact_form" onSubmit={manejarEnvio}>
              <div className="row">
                <div className="col-md-12">
                  <input className="contact_control" placeholder=" Nombre" type="text" name="Name" required />
                </div>
                <div className="col-md-12">
                  <input className="contact_control" placeholder=" Email" type="email" name="Email" required />
                </div>
                <div className="col-md-12">
                  <input className="contact_control" placeholder=" Número Telefónico" type="tel" name="Phone Number" required />
                </div>
                <div className="col-md-12">
                  <textarea className="textarea" placeholder=" Descripción" name="Message" required></textarea>
                </div>
                <div className="col-md-12">
                  <button className="send_btn"> Enviar </button>
                </div>
                
                {/* AQUI ESTA EL MENSAJE DE CONFIRMACIÓN */}
                {mensajeEnviado && (
                  <div className="col-md-12 mt-4">
                    <div className="alert alert-success text-center" role="alert" style={{ borderRadius: '15px', fontWeight: '600' }}>
                      ¡Mensaje enviado con éxito! <br/>
                      Nos pondremos en contacto contigo a tu correo a la brevedad.
                    </div>
                  </div>
                )}

              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
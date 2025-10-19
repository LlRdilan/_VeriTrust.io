export default function Contactanos() {
  return (
    <div id="contact" className="contact ">
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
            <form id="post_form" className="contact_form">
              <div className="row">
                <div className="col-md-12 ">
                  <input className="contact_control" placeholder="  Nombre" type="type" name="Name" required />
                </div>
                <div className="col-md-12">
                  <input className="contact_control" placeholder="  Email" type="type" name="Email" required />
                </div>
                <div className="col-md-12">
                  <input className="contact_control" placeholder="  Número Telefónico" type="type" name="Phone Number " required />
                </div>
                <div className="col-md-12">
                  <textarea className="textarea" placeholder="  Descripción" type="type" Message="Name" required></textarea>
                </div>
                <div className="col-md-12">
                  <button className="send_btn"> Enviar </button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

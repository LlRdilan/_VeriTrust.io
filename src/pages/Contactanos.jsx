export default function Contactanos(){
    return(
        <div id="contact" class="contact ">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="titlepage">
                            <h2><strong class="yellow">Contáctanos</strong><br></br>Solicitar una llamada</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8 offset-md-2">
                        <form id="post_form" class="contact_form">
                            <div class="row">
                                <div class="col-md-12 ">
                                    <input class="contact_control" placeholder="  Nombre" type="type" name="Name" required></input>
                                </div>
                                <div class="col-md-12">
                                    <input class="contact_control" placeholder="  Email" type="type" name="Email" required></input>
                                </div>
                                <div class="col-md-12">
                                    <input class="contact_control" placeholder="  Número Telefónico" type="type" name="Phone Number " required></input>
                                </div>
                                <div class="col-md-12">
                                    <textarea class="textarea" placeholder="  Descripción" type="type" Message="Name" required></textarea>
                                </div>
                                <div class="col-md-12">
                                    <button class="send_btn"> Enviar </button>
                                </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
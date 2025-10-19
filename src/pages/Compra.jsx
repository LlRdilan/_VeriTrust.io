export default function Compra() {
    return (
        <main class="container" style="padding: 60px 0;">
            <h1 class="text-center">Compra tu servicio VeriTrust</h1>
            <div class="card"
                style="padding: 30px; max-width: 600px; margin: 40px auto; box-shadow: 0 2px 8px rgba(11,31,46,0.1); border-radius: 12px; background: #fff;">
                <h2 class="text-center" style="margin-bottom: 25px; color: #0FB3D1;">Detalles de tu compra</h2>
                <form id="compraForm">
                    <div class="form-group">
                        <label for="nombreTarjeta">Nombre en la tarjeta:</label>
                        <input type="text" id="nombreTarjeta" class="form-control" required></input>
                    </div>
                    <div class="form-group">
                        <label for="numeroTarjeta">Número de tarjeta:</label>
                        <input type="text" id="numeroTarjeta" maxlength="16" class="form-control" required></input>
                    </div>
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label for="mesExp">Mes de expiración:</label>
                            <input type="text" id="mesExp" maxlength="2" placeholder="MM" class="form-control" required></input>
                        </div>
                        <div class="col-md-6 form-group">
                            <label for="anoExp">Año de expiración:</label>
                            <input type="text" id="anoExp" maxlength="4" placeholder="AAAA" class="form-control" required></input>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="cvv">CVV:</label>
                        <input type="text" id="cvv" maxlength="3" class="form-control" required></input>
                    </div>
                    <div class="form-group text-center">
                        <button class="comprar_btn" type="submit">Pagar</button>
                    </div>
                </form>
                <div id="mensajeError" style="color:red; margin-top:10px;"></div>
            </div>
        </main>
    )
}
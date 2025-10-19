export default function Compra() {
    return (
        <main className="container" style={{ padding: '60px 0' }}>
            <h1 className="text-center">Compra tu servicio VeriTrust</h1>
            <div className="card"
                style={{ padding: '30px', maxWidth: '600px', margin: '40px auto', boxShadow: '0 2px 8px rgba(11,31,46,0.1)', borderRadius: '12px', background: '#fff' }}>
                <h2 className="text-center" style={{ marginBottom: '25px', color: '#0FB3D1' }}>Detalles de tu compra</h2>
                <form id="compraForm">
                    <div className="form-group">
                        <label htmlFor="nombreTarjeta">Nombre en la tarjeta:</label>
                        <input type="text" id="nombreTarjeta" className="form-control" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="numeroTarjeta">Número de tarjeta:</label>
                        <input type="text" id="numeroTarjeta" maxLength="16" className="form-control" required />
                    </div>
                    <div className="row">
                        <div className="col-md-6 form-group">
                            <label htmlFor="mesExp">Mes de expiración:</label>
                            <input type="text" id="mesExp" maxLength="2" placeholder="MM" className="form-control" required />
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor="anoExp">Año de expiración:</label>
                            <input type="text" id="anoExp" maxLength="4" placeholder="AAAA" className="form-control" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cvv">CVV:</label>
                        <input type="text" id="cvv" maxLength="3" className="form-control" required />
                    </div>
                    <div className="form-group text-center">
                        <button className="comprar_btn" type="submit">Pagar</button>
                    </div>
                </form>
                <div id="mensajeError" style={{ color: 'red', marginTop: '10px' }}></div>
            </div>
        </main>
    )
}
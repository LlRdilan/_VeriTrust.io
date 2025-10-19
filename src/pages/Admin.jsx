export default function Admin() {
    return (
        <div id="admin" class="service">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="titlepage">
                            <h2>Administración de Servicios</h2>
                            <p>Administra los servicios disponibles en el sitio web.</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="backoffice_section">
                            <form id="serviceForm">
                                <div class="row g-3">
                                    <div class="col-md-4">
                                        <label for="serviceName" class="form-label">Nombre</label>
                                        <input type="text" id="serviceName" class="form-control" required></input>
                                    </div>
                                    <div class="col-md-5">
                                        <label for="serviceDesc" class="form-label">Descripción</label>
                                        <input type="text" id="serviceDesc" class="form-control" required></input>
                                    </div>
                                    <div class="col-md-2">
                                        <label for="servicePrice" class="form-label">Precio</label>
                                        <input type="number" id="servicePrice" class="form-control" required></input>
                                    </div>
                                    <div class="col-md-1 d-flex align-items-end">
                                        <button type="submit" class="btn_primary w-100">Guardar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="backoffice_section mt-4">
                            <h4>Servicios registrados</h4>
                            <table class="table table-striped align-middle">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Precio</th>
                                        <th style="width: 150px;">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="serviceTableBody"></tbody>
                            </table>
                        </div>
                        <div class="text-center mt-4">
                            <button id="previewBtn" class="btn_primary"><i class="fa fa-eye"></i> Ver servicios públicos</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
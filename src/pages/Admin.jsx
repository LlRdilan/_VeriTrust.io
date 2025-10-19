import React from 'react';

export default function Admin() {
    return (
        <div id="admin" className="service">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="titlepage">
                            <h2>Administración de Servicios</h2>
                            <p>Administra los servicios disponibles en el sitio web.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="backoffice_section">
                            <form id="serviceForm">
                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <label htmlFor="serviceName" className="form-label">Nombre</label>
                                        <input type="text" id="serviceName" className="form-control" required />
                                    </div>
                                    <div className="col-md-5">
                                        <label htmlFor="serviceDesc" className="form-label">Descripción</label>
                                        <input type="text" id="serviceDesc" className="form-control" required />
                                    </div>
                                    <div className="col-md-2">
                                        <label htmlFor="servicePrice" className="form-label">Precio</label>
                                        <input type="number" id="servicePrice" className="form-control" required />
                                    </div>
                                    <div className="col-md-1 d-flex align-items-end">
                                        <button type="submit" className="btn_primary w-100">Guardar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="backoffice_section mt-4">
                            <h4>Servicios registrados</h4>
                            <table className="table table-striped align-middle">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Precio</th>
                                        <th style={{ width: '150px' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="serviceTableBody"></tbody>
                            </table>
                        </div>
                        <div className="text-center mt-4">
                            <button id="previewBtn" className="btn_primary"><i className="fa fa-eye"></i> Ver servicios públicos</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
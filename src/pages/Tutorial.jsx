import React from 'react';

export default function Tutorial() {
    return (
        <div id="service" className="service">
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <div className="titlepage">
                            <h2 className="yellow"> A continuación encontraras algunos tutoriales y
                                consejos que debes ver para estar bien informado.</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <iframe width="100%" height="215" src="https://www.youtube.com/embed/rNmXiYY9iHA"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                            <div className="card-body">
                                <h5 className="card-title">Que es la identidad digital</h5>
                                <p className="card-text">Este video muestra como todo lo que hacemos en internet afecta nuestra identidad digital.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <iframe width="100%" height="215" src="https://www.youtube.com/embed/-9gYdiqrjO4?"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                            <div className="card-body">
                                <h5 className="card-title">Que es la firma electronica?</h5>
                                <p className="card-text">Este video explica qué es la firma electrónica y cómo te protege.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <iframe width="100%" height="215" src="https://www.youtube.com/embed/AqzPiT39psE"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                            <div className="card-body">
                                <h5 className="card-title">Como usar una firma digital</h5>
                                <p className="card-text">Este video muestra como utilizar una firma digital en un documento PDF</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <a className="read_more"
                            href="https://www.oracle.com/europe/security/identity-management/digital-identity/">Preguntas Frecuentes</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
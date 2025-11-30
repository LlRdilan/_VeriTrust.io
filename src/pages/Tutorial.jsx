import React from 'react';

export default function Tutorial() {
    // Estilo común para todas las tarjetas para asegurar consistencia
    const cardStyle = {
        borderRadius: '20px',
        overflow: 'hidden',
        border: 'none',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        height: '100%', // <--- ESTO ES LO CLAVE: Fuerza la altura igualada
        display: 'flex',       // Asegura que el contenido se distribuya bien
        flexDirection: 'column'
    };

    return (
        <div id="service" className="service">
            <div className="container">
                <div className="row">
                    <div className="col-md-7 mx-auto">
                        <div className="titlepage">
                            <h2 className="yellow"> 
                                A continuación encontrarás algunos tutoriales y consejos que debes ver para estar bien informado.
                            </h2>
                        </div>
                    </div>
                </div>
                
                {/* Agregamos align-items-stretch a la fila por seguridad, aunque Bootstrap suele hacerlo por defecto */}
                <div className="row d-flex align-items-stretch">
                    
                    <div className="col-md-4 mb-4"> {/* mb-4 para espacio en móvil */}
                        <div className="card" style={cardStyle}>
                            <iframe 
                                width="100%" 
                                height="215" 
                                src="https://www.youtube.com/embed/rNmXiYY9iHA"
                                title="YouTube video player" 
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Qué es la identidad digital</h5>
                                <p className="card-text">Este video muestra cómo todo lo que hacemos en internet afecta nuestra identidad digital.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card" style={cardStyle}>
                            <iframe 
                                width="100%" 
                                height="215" 
                                src="https://www.youtube.com/embed/-9gYdiqrjO4?"
                                title="YouTube video player" 
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Qué es la firma electrónica?</h5>
                                <p className="card-text">Este video explica qué es la firma electrónica y cómo te protege.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card" style={cardStyle}>
                            <iframe 
                                width="100%" 
                                height="215" 
                                src="https://www.youtube.com/embed/AqzPiT39psE"
                                title="YouTube video player" 
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Cómo usar una firma digital</h5>
                                <p className="card-text">Este video muestra cómo utilizar una firma digital en un documento PDF de manera correcta.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 text-center mt-4">
                        <a className="read_more"
                            href="https://www.oracle.com/europe/security/identity-management/digital-identity/">
                            Preguntas Frecuentes
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
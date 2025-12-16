import React, { useState } from 'react';
import '../styles/a_an_tutorial.css'; 

export default function Tutorial() {
    const [flippedCards, setFlippedCards] = useState({});

    const handleCardFlip = (id) => {
        setFlippedCards(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const tutorialData = [
        {
            id: 1,
            videoUrl: "https://www.youtube.com/embed/rNmXiYY9iHA",
            title: "Qué es la identidad digital",
            backContent: "Este video muestra por qué es importante gestionarla responsablemente."
        },
        {
            id: 2,
            videoUrl: "https://www.youtube.com/embed/-9gYdiqrjO4?",
            title: "Qué es la firma electrónica",
            backContent: "En este video se explica qué es la firma electrónica, lo importante que es y cómo te protege."
        },
        {
            id: 3,
            videoUrl: "https://www.youtube.com/embed/AqzPiT39psE",
            title: "Cómo usar una firma digital",
            backContent: "Este video muestra cómo utilizar una firma digital en un documento PDF de manera correcta."
        }
    ];

    return (
        <div id="service" className="service tutorial-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-7 mx-auto">
                        <div className="titlepage">
                            <h2 className="yellow"> 
                                A continuación encontrarás algunos tutoriales y consejos que debes ver para estar bien informado.
                            </h2>
                            <p className="subtitle">Pasa el cursor sobre las tarjetas para ver el video</p>
                        </div>
                    </div>
                </div>
                
                <div className="row d-flex align-items-stretch justify-content-center">
                    {tutorialData.map((tutorial) => (
                        <div className="col-md-4 mb-4" key={tutorial.id}>
                            <div 
                                className={`flip-card ${flippedCards[tutorial.id] ? 'flipped' : ''}`}
                                onClick={() => handleCardFlip(tutorial.id)}
                            >
                                <div className="flip-card-inner">
                                    {/* AHORA ESTE ES EL BACK - Información (se muestra primero) */}
                                    <div className="flip-card-back">
                                        <div className="card tutorial-card">
                                            <div className="card-header-back">
                                                <h5 className="card-title-back">{tutorial.title}</h5>
                                            </div>
                                            <div className="card-body-back d-flex flex-column">
                                                <div className="back-content">
                                                    <p className="detailed-text">{tutorial.backContent}</p>
                                                    <div className="key-points">
                                                        <h6>Puntos clave:</h6>
                                                        <ul>
                                                            <li>Información relevante y práctica</li>
                                                            <li>Aplicable en situaciones reales</li>
                                                            <li>Importancia de la identidad digital</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="flip-hint-back">
                                                    <span className="flip-icon">▶</span>
                                                    <small>Click para ver el video</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* AHORA ESTE ES EL FRONT - Video (se muestra después del click) */}
                                    <div className="flip-card-front">
                                        <div className="card tutorial-card-front">
                                            <div className="video-wrapper">
                                                <iframe 
                                                    width="100%" 
                                                    height="215" 
                                                    src={tutorial.videoUrl}
                                                    title="YouTube video player" 
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                            <div className="card-body d-flex flex-column">
                                                <h5 className="card-title">{tutorial.title}</h5>
                                                <div className="flip-hint">
                                                    <span className="flip-icon">↺</span>
                                                    <small>Click para volver a la información</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="row">
                    <div className="col-md-12 text-center mt-5">
                        <a className="read_more"
                            href="https://www.oracle.com/europe/security/identity-management/digital-identity/"
                            target="_blank"
                            rel="noopener noreferrer">
                            Preguntas Frecuentes
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
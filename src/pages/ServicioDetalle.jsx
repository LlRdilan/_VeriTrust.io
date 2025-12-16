import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import NotificationModal from "../components/ui/NotificacionModal";
import DOMPurify from 'dompurify';
import { calcularIVA, calcularTotalConIVA } from "../utils/calculos";
import { handleError, handleHttpError } from "../services/errorHandler"; 

export default function ServicioDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [servicio, setServicio] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [modal, setModal] = useState({ show: false, title: '', message: '', status: 'info' });
    const handleCloseModal = () => setModal({ show: false, title: '', message: '', status: 'info' });

    const API_URL = "http://localhost:8080/servicios";

    useEffect(() => {
        const fetchServicio = async () => {
            try {
                const res = await fetch(`${API_URL}/${id}`);
                
                if (!res.ok) {
                    const errorInfo = await handleHttpError(res);
                    setModal({ 
                        show: true, 
                        title: errorInfo.title, 
                        message: errorInfo.message, 
                        status: errorInfo.status 
                    });
                    setTimeout(() => navigate('/servicios'), 2000);
                    return;
                }
                
                const data = await res.json();
                setServicio(data);
            } catch (error) {
                const errorInfo = handleError(error);
                setModal({ 
                    show: true, 
                    title: errorInfo.title, 
                    message: errorInfo.message, 
                    status: errorInfo.status 
                });
                setTimeout(() => navigate('/servicios'), 2000);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchServicio();
        } else {
            navigate('/servicios');
        }
    }, [id, navigate]);

    const iniciarCompra = () => {
        if (!servicio) return;
        
        const neto = Number(servicio.precio);
        const valorIva = calcularIVA(neto);
        const total = calcularTotalConIVA(neto);

        navigate('/compra', {
            state: { 
                nombre: servicio.nombre, 
                neto: neto, 
                iva: valorIva, 
                total: total,
                id: servicio.id 
            }
        });
    };

    if (loading) {
        return <div className="service text-center servicio-detalle-loading">Cargando detalles...</div>;
    }

    if (!servicio) {
        return <div className="service text-center servicio-detalle-loading">Servicio no disponible.</div>;
    }

    const netoFinal = Number(servicio.precio);
    const ivaFinal = calcularIVA(netoFinal);
    const totalFinal = calcularTotalConIVA(netoFinal);


    return (
        <div id="service-detail" className="service servicio-detalle-container">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/servicios" className="servicio-detalle-back-link">
                            <i className="fa fa-chevron-left servicio-detalle-back-icon"></i> Volver a Servicios
                        </Link>
                    </div>
                </div>

                <div className="row">
                    
                    <div className="col-md-4">
                        <div className="backoffice_section servicio-detalle-sidebar">
                            <h2 className="servicio-detalle-price">
                                ${totalFinal.toLocaleString()}
                            </h2>
                            <span className="servicio-detalle-price-detail">Neto: ${netoFinal.toLocaleString()} + IVA (${ivaFinal.toLocaleString()})</span>
                            
                            <hr className="servicio-detalle-divider" />

                            <p className="servicio-detalle-benefits-title">Beneficios Incluidos:</p>
                            <ul>
                                {(servicio.detalles || []).map((d, index) => (
                                    <li key={index} className="servicio-detalle-benefit-item">
                                        <i className="fa fa-check-circle servicio-detalle-benefit-icon"></i> {d}
                                    </li>
                                ))}
                            </ul>

                            <button onClick={iniciarCompra} className="comprar_btn servicio-detalle-buy-btn">
                                COMPRAR AHORA
                            </button>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="backoffice_section servicio-detalle-content">
                            <h1 className="servicio-detalle-title">{servicio.nombre}</h1>
                            
                            <hr className="servicio-detalle-content-divider" />
                            
                            <h3 style={{marginBottom: '20px', fontSize: '24px'}}>Detalles Completos del Servicio</h3>
                            
                            <div className="full-description-content servicio-detalle-description">
                                {servicio.descripcionCompleta ? (
                                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(servicio.descripcionCompleta) }} />
                                ) : (
                                    <>
                                        <p><strong>{servicio.descripcion}</strong></p>
                                        <p>¡Edita este servicio desde el panel de Administrador para agregar formato y contenido enriquecido!</p>
                                        <h4 className="servicio-detalle-subtitle">Próxima Tarea: Clasificar Productos.</h4>
                                    </>
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <NotificationModal 
                show={modal.show}
                handleClose={handleCloseModal}
                title={modal.title}
                message={modal.message}
                status={modal.status}
            />
        </div>
    );
}
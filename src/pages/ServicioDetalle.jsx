import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import NotificationModal from "../components/ui/NotificacionModal"; 

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
                    throw new Error("Servicio no encontrado");
                }
                
                const data = await res.json();
                setServicio(data);
            } catch (error) {
                setModal({ 
                    show: true, 
                    title: "Error de Carga", 
                    message: "No se pudo encontrar el detalle del servicio.", 
                    status: "error" 
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
        const valorIva = Math.round(neto * 0.19);
        const total = neto + valorIva;

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
        return <div className="service text-center" style={{padding: '100px'}}>Cargando detalles...</div>;
    }

    if (!servicio) {
        return <div className="service text-center" style={{padding: '100px'}}>Servicio no disponible.</div>;
    }

    const netoFinal = Number(servicio.precio);
    const ivaFinal = Math.round(netoFinal * 0.19);
    const totalFinal = netoFinal + ivaFinal;


    return (
        <div id="service-detail" className="service" style={{padding: '60px 0'}}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/servicios" style={{marginBottom: '20px', display: 'block', fontWeight: 'bold', color: '#1f235e'}}>
                            <i className="fa fa-chevron-left" style={{marginRight: '8px'}}></i> Volver a Servicios
                        </Link>
                    </div>
                </div>

                <div className="row">
                    
                    <div className="col-md-4">
                        <div className="backoffice_section" style={{padding: '30px', position: 'sticky', top: '100px'}}>
                            <h2 style={{color: '#1f235e', fontWeight: 'bold', fontSize: '30px'}}>
                                ${totalFinal.toLocaleString()}
                            </h2>
                            <span style={{color: '#888', fontSize: '14px'}}>Neto: ${netoFinal.toLocaleString()} + IVA (${ivaFinal.toLocaleString()})</span>
                            
                            <hr style={{marginTop: '20px', marginBottom: '20px'}} />

                            <p style={{fontSize: '14px', marginBottom: '15px', fontWeight: 'bold'}}>Beneficios Incluidos:</p>
                            <ul>
                                {(servicio.detalles || []).map((d, index) => (
                                    <li key={index} style={{listStyle: 'disc', marginLeft: '20px', marginBottom: '5px', color: '#555'}}>
                                        <i className="fa fa-check-circle" style={{color: '#0FB3D1', marginRight: '8px'}}></i> {d}
                                    </li>
                                ))}
                            </ul>

                            <button onClick={iniciarCompra} className="comprar_btn" style={{width: '100%', marginTop: '30px', fontSize: '18px'}}>
                                COMPRAR AHORA
                            </button>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="backoffice_section" style={{padding: '40px', background: '#fff'}}>
                            <h1 style={{color: '#0FB3D1', marginBottom: '20px', fontSize: '40px', paddingBottom: '0'}}>{servicio.nombre}</h1>
                            
                            <hr style={{marginBottom: '30px'}} />
                            
                            <h3 style={{marginBottom: '20px'}}>Detalles Completos del Servicio</h3>
                            
                            <div 
                                className="full-description-content"
                                style={{lineHeight: '1.8', color: '#333'}}
                            >
                                {servicio.descripcionCompleta ? (
                                    <div dangerouslySetInnerHTML={{ __html: servicio.descripcionCompleta }} />
                                ) : (
                                    <>
                                        <p><strong>{servicio.descripcion}</strong></p>
                                        <p>¡Edita este servicio desde el panel de Administrador para agregar formato y contenido enriquecido!</p>
                                        <h4 style={{color: '#1f235e', marginTop: '30px'}}>Próxima Tarea: Clasificar Productos.</h4>
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
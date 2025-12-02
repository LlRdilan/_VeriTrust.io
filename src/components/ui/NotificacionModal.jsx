import React from 'react';

export default function NotificationModal({ show, handleClose, title, message, status, isConfirmation, onConfirm }) {
    
    if (!show) {
        return null;
    }

    let headerClass = "modal-header";
    let icon = "";
    let buttonClass = "btn btn-primary";

    switch (status) {
        case 'success':
            headerClass += " bg-success text-white";
            icon = "fa fa-check-circle";
            buttonClass = "btn btn-success";
            break;
        case 'error':
            headerClass += " bg-danger text-white";
            icon = "fa fa-times-circle";
            buttonClass = "btn btn-danger";
            break;
        case 'warning':
            headerClass += " bg-warning text-white";
            icon = "fa fa-exclamation-triangle";
            buttonClass = "btn btn-warning";
            break;
        default: 
            headerClass += " bg-primary text-white";
            icon = "fa fa-info-circle";
            buttonClass = "btn btn-primary";
    }

    const modalStyle = {
        display: 'block',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1050,
        overflowX: 'hidden',
        overflowY: 'auto'
    };

    const dialogStyle = {
        marginTop: '10vh'
    };


    return (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={modalStyle}>
            <div className="modal-dialog modal-dialog-centered" role="document" style={dialogStyle}>
                <div className="modal-content">
                    <div className={headerClass}>
                        <h5 className="modal-title">
                            <i className={icon} style={{marginRight: '10px'}}></i>
                            {title}
                        </h5>
                        <button type="button" className="close text-white" onClick={handleClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    
                    <div className="modal-footer">
                        {isConfirmation ? (
                            <>
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                                    Cancelar
                                </button>
                                <button type="button" className={buttonClass} onClick={onConfirm}>
                                    Aceptar
                                </button>
                            </>
                        ) : (
                            <button type="button" className={buttonClass} onClick={handleClose}>
                                Aceptar
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
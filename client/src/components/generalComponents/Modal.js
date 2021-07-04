import React from 'react';
import ReactDOM from 'react-dom';

import '../diary/main-view/foodsModal.css'

const Modal = ({ header, actions, onDismiss, children }) => {

    return ReactDOM.createPortal(
        <div onClick={onDismiss} className="custom-modal">
            <div className="background-overlay"></div>
            <div  className={`ui dimmer modals visible active`} >
                <div onClick={(e) => { e.stopPropagation() }} className={`ui standard modal visible active`} style={{ height: '90vh', position: 'fixed', overflowY: 'scroll' }}>

                    {children}

                </div>
            </div>
        </div>,
        document.querySelector("#modal")
    );
}

export default Modal;
import React from 'react';
import './index.css'


const Modal = ({children, onClick}) => {
    return (
        <div className="modal">
            <span className="close" onClick={onClick}>X</span>
            {children}
        </div>
    );
};

export default Modal;
import React, { useEffect } from "react";
import s from './Popup.module.css'

const Modal = ({active,close,children}) => {
    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          close();
        }
      };
    
      useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);
    
        return () => {
          document.removeEventListener("keydown", handleKeyDown, false);
        };
      });
    return (
        <div className={active?s.modal_active:s.modal} onClick={close}>
            <div className={active?s.modal__content_active:s.modal__content} onClick={e=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal
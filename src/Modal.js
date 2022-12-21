import "./Modal.css"
import React from "react"
import {CSSTransition} from "react-transition-group"

const Modal = (props) => {

    return(
        <CSSTransition
        in={props.show}
        unmountOnExit
        timeout={{enter: 0, exit: 300}}
        >
        <div className={`modal ${props.show ? "show" : ""}`} onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{props.title}</h2>
                </div>
                <div className="modal-body">{props.children}</div>
                <div className="modal-footer">
                    <button onClick={props.onClose} className="button">Close</button>
                    <button onClick={props.onSubmit} className="button">Pay</button>
                </div>
            </div>
        </div>
        </CSSTransition>
    )
}
export default Modal
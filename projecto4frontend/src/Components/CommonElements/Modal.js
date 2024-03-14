import React, { useEffect, useState } from 'react'
import { actionStore } from '../../Stores/ActionStore'

const Modal = (props) => {

    const showModal = actionStore((state) => state.showModal);
    const updateShowModal = actionStore((state) => state.updateShowModal);
    const { title, inputs, buttonText } = props;

    const closeModal = () => {
        updateShowModal(false);
    }

    const createInput = (input) => {
        const { type, name, placeholder, options } = input;

        if (type === 'select') {
            return (
                <select name={name} required={input.required}>
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </select>
            );
        } else {
            return <input type={type} name={name} placeholder={placeholder} required={input.required} />;
        }
    }


    return (
        <>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{title}</h2>
                        <form>
                            {inputs.map((input, index) => (
                                <div key={index}>
                                    {createInput(input)}
                                </div>
                            ))}
                        </form>
                        <button>{buttonText}</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
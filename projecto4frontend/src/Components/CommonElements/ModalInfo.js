import React, { useEffect, useState } from 'react';
import { useActionsStore } from '../../Stores/ActionStore';

const ModalInfo = (props) => {
    const showModal = useActionsStore((state) => state.showModal);
    const updateShowModal = useActionsStore((state) => state.updateShowModal);
    const { title, inputs } = props;

    const closeModal = () => {
        updateShowModal(false);
    }

    const createInput = (input) => {
        const { type, label, name, value } = input;
        return (
            <div key={name}>
                <label>{label}</label>
                <input type={type} name={name} value={value} disabled />
            </div>
        );
    }

    

    return (
        <>
            {showModal && (
                <div className="modal">
                    <div className="modalInfo-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{title}</h2>
                        <form>
                            {inputs.map((input, index) => (
                                <div key={index}>
                                    {createInput(input)}
                                </div>
                            ))}
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalInfo;
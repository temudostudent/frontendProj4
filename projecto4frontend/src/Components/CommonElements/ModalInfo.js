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
        const { label, name, value } = input;
        return (
            <div key={name} className='info-container'>
                <label>{label}</label>
                <h4>{value}</h4>
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
                        <div className='modal-info-container'>
                            {inputs.map((input, index) => (
                                <div key={index}>
                                    {createInput(input)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalInfo;
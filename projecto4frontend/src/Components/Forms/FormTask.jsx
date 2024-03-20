import React, { useState, useEffect} from "react"
import './FormStyle.css'
import { useActionsStore } from '../../Stores/ActionStore'

const FormTask = (props) => {

    const { title, inputs, buttonText, onSubmit, initialValues } = props;
    const [formData, setFormData] = useState(initialValues || {});

    useEffect(() => {
        setFormData(initialValues || {});
      }, [initialValues]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmitTask = async (event) => {
        event.preventDefault();
        try {

            if (onSubmit) {
                const formattedData = {
                    title: formData.title,
                    description: formData.description,
                    priority: parseInt(formData.priority),
                    startDate: formData.startDate,
                    limitDate: formData.limitDate,
                    category: { name: formData.category }
                };

                console.log(formattedData);
                await onSubmit(formattedData);

                setFormData({});

            }
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            
        }
    };


    const createInput = (input) => {
        const { type, name, placeholder, options, label } = input;
        

        if (type === 'select') {
            return (
                <select 
                    name={name} 
                    required={input.required}
                    onChange={handleChange}
                    value={
                        formData[name] && typeof formData[name] === 'object' && formData[name].id
                          ? formData[name].id
                          : formData[name]
                      }
                >
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </select>
            );
        } else {
            return (
                <div className="container-withLabel">
                    <label htmlFor={name}>{label}</label>
                    <input 
                        type={type} 
                        name={name} 
                        id={name} 
                        placeholder={placeholder} 
                        required={input.required} 
                        onChange={handleChange} 
                        value={formData[name] || ''}
                    />
                </div>
            );
        }
    }


    return (
        <>
        <div className="form">
            <div className="form-content">
                
                <h2>{title}</h2>
                <form onSubmit={handleSubmitTask}>
                    {inputs.map((input, index) => (
                        <div key={index}>
                            {createInput(input)}
                        </div>
                    ))}
                    <button type="submit">{buttonText}</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default FormTask;
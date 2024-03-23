import React, { useState, useEffect} from "react"
import './FormStyle.css'

const FormTask = (props) => {

    const { title, inputs, buttonText, onSubmit, initialValues } = props;
    const [formData, setFormData] = useState(initialValues || {
        category: { name: '', disabled: true }, 
        priority: { value: '', disabled: true }
    });

    useEffect(() => {
        setFormData(initialValues || {
            category: { name: '', disabled: true }, 
            priority: { value: '', disabled: true } 
        });
      }, [initialValues]);

      const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'category') {
            
            setFormData(prevState => ({
                ...prevState,
                category: { name: value }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmitTask = async (event) => {
        event.preventDefault();
        try {

            if (onSubmit) {

                const categoryName = formData.category && formData.category.name;

                const categoryObject = categoryName ? { name: categoryName } : null;

                const formattedData = {
                    title: formData.title,
                    description: formData.description,
                    priority: isNaN(formData.priority) ? 300 : parseInt(formData.priority),
                    startDate: formData.startDate,
                    limitDate: formData.limitDate,
                    category: categoryObject === null ? formData.category.name : categoryObject
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
        

        if (type === 'select' && name === 'category') {
            return (
                <select 
                    name={name} 
                    required={input.required}
                    onChange={handleChange}
                    value={(formData.category && formData.category.name)}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option.value} disabled={option.disabled}>{option.label}</option>
                    ))}
                </select>
            );
        } else if(type === 'select'){
            return (
                <select 
                    name={name} 
                    required={input.required}
                    onChange={handleChange}
                    value={
                        formData[name] 
                      }
                >
                    {options.map((option, index) => (
                        <option key={index} value={option.value} disabled={option.disabled}>{option.label}</option>
                    ))}
                </select>
            );
        }else {
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
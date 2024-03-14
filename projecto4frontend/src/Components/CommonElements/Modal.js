import React from 'react';

class Modal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
      };
    }
  
    openModal = () => {
      this.setState({ isOpen: true });
    }
  
    closeModal = () => {
      this.setState({ isOpen: false });
    }
  
    createInput = (input) => {
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
  
    render() {
      const { title, inputs, buttonText } = this.props;
  
      return (
        <>
          <button onClick={this.openModal}>Open Modal</button>
          
          {this.state.isOpen &&
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={this.closeModal}>&times;</span>
                <h2>{title}</h2>
                <form>
                  {inputs.map((input, index) => (
                    <div key={index}>
                      {this.createInput(input)}
                    </div>
                  ))}
                </form>
                <button>{buttonText}</button>
              </div>
            </div>
          }
        </>
      );
    }
  }
  
  export default Modal;
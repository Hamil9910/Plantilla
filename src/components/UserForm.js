import React, { Component } from 'react';
import Confirm from './Confirm';
import Success from './Success';
import Enfermedades from './Enfermedades';

export class UserForm extends Component {
  state = {
    step: 1,
    id_enfermedad: '',
    selectedOption: '',
    opcion: '',
    nombreenfermedad: '',
    descripcionenfermedad: ''
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { enfermedad_id, enfermedad_selected, enfermedad_opcion, enfermedad_checkopts, enfermedad_nombre, enfermedad_descripcion, enfermedad_file } = this.state;
    const values = { enfermedad_id, enfermedad_selected, enfermedad_opcion, enfermedad_checkopts, enfermedad_nombre, enfermedad_descripcion, enfermedad_file };

    switch (step) {
      case 1:
        return (
          <Enfermedades
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 3:
        return <Success />;
      default:
        (console.log('This is a multi-step form built with React.'))
    }
  }
}

export default UserForm;

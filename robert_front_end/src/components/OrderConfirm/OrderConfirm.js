import React, { Component } from 'react';
import FormUserAddress from './FormUserAddress';
import FormUserAddress2 from './FormUserAddress2';
import FormUserRecap from './FormUserRecap';
import { connect } from 'react-redux';
import { formValidated } from '../../actions/order';

class OrderConfirm extends Component {
  state = {
    step: 1
  };

  componentDidMount = () => {
    if (this.props.form_validated) {
      this.setState({
        step: 3
      });
    }
  };

  nextStep = async () => {
    const { step } = this.state;
    await this.setState({
      step: step + 1
    });
    if (this.state.step === 3) {
      this.props.formValidated(true);
    }
  };

  // Go back to prev step
  prevStep = async () => {
    const { step } = this.state;
    await this.setState({
      step: step - 1
    });
    this.props.formValidated(false);
  };
  initialState = async () => {
    await this.setState({
      step: 1
    });
    this.props.formValidated(false);
  };

  render() {
    const { handleClose } = this.props;
    const { step } = this.state;

    switch (step) {
      case 1:
        return <FormUserAddress nextStep={this.nextStep} />;
      case 2:
        return (
          <FormUserAddress2 nextStep={this.nextStep} prevStep={this.prevStep} />
        );
      case 3:
        return (
          <FormUserRecap
            handleClose={handleClose}
            initialState={this.initialState}
            prevStep={this.prevStep}
          />
        );
      default:
        return '';
    }
  }
}

const mapStateToProps = state => ({
  areas: state.areas,
  form_validated: state.order.form_validated
});

export default connect(
  mapStateToProps,
  { formValidated }
)(OrderConfirm);

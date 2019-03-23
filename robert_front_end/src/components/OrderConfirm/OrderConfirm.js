import React, { Component } from 'react';
import FormUserAddress from './FormUserAddress';
import FormUserAddress2 from './FormUserAddress2';
import FormUserRecap from './FormUserRecap';
import { connect } from 'react-redux';
import { loadOrderForm } from '../../actions/forms';

class OrderConfirm extends Component {
  state = {
    step: 1,
    phone_number: '',
    route: '',
    default_address: { lat: 25.1714393, lng: 55.22058549 }
    // street_number: '',
    // first_name: '',
    // last_name: '',
    // street: '',
    // area: '',
    // city: '',
    // housing: '',
    // counpound_building_name: '',
    // apt_villa_nbr: '',
    // details: '',
    // json_geocode: '',
    // delivery_choice: '',
    // reception_choice: '',
    // preference_default: true,
    // address_default: true
  };
  // update = Props => {
  //   const { address_components, geometry, types } = Props.areas.testAddress;
  //   if (Props.areas.testAddress) {
  //     this.setState({
  //       default_address: geometry.location || '',
  //       route: geometry.location !== '' ? types[0] : '',
  //       street_number:
  //         geometry.location !== ''
  //           ? types[0] !== 'route'
  //             ? address_components.filter(
  //                 item => item.types.indexOf('street_number') !== -1
  //               )[0].long_name
  //             : ''
  //           : '',
  //       area:
  //         geometry.location !== ''
  //           ? address_components.filter(
  //               item => item.types.indexOf('sublocality') !== -1
  //             )[0].long_name
  //           : '',
  //       city:
  //         geometry.location !== ''
  //           ? address_components.filter(
  //               item => item.types.indexOf('locality') !== -1
  //             )[0].long_name
  //           : ''
  //     });
  //   }
  // };

  async componentDidMount() {
    // await this.update(this.props);
    this.props.loadOrderForm(this.state);
  }
  // componentWillReceiveProps(nextProps) {
  //   this.update(nextProps);
  // }
  // Proceed to next step
  nextStep = values => {
    const { step } = this.state;
    if (values) {
      this.setState(values);
    }
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = values => {
    const { step } = this.state;
    if (values) {
      this.setState(values);
    }
    this.setState({
      step: step - 1
    });
  };
  initialState = () => {
    this.setState({
      step: 1
    });
  };

  render() {
    const { order, total, date, handleClose } = this.props;
    const { step, street, default_address } = this.state;

    switch (step) {
      case 1:
        return (
          <FormUserAddress
            nextStep={this.nextStep}
            default_address={default_address}
          />
        );
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
            order={order}
            total={total}
            date={date}
          />
        );
      default:
        return '';
    }
  }
}

const mapStateToProps = state => ({
  areas: state.areas,
  initialValues: state.forms.data
});

export default connect(
  mapStateToProps,
  { loadOrderForm }
)(OrderConfirm);

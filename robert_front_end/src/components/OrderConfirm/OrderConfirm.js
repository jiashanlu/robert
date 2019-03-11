import React, { Component } from 'react';
import FormUserAdress from './FormUserAddress';
import { connect } from 'react-redux';

class OrderConfirm extends Component {
  state = {
    step: 1,
    route: '',
    default_address: { lat: 25.1714393, lng: 55.22058549 },
    street_number: '',
    firstName: '',
    lastName: '',
    street: '',
    area: '',
    city: '',
    housing: '',
    floor_nbr: '',
    counpound_name: '',
    apt_villa_nbr: '',
    details: '',
    json_geocode: ''
  };
  update = Props => {
    const { address_components, geometry, types } = Props.areas.testAddress;
    if (Props.areas.testAddress) {
      this.setState({
        default_address: geometry.location || '',
        route: geometry.location !== '' ? types[0] : '',
        street: address_components.filter(
          item => item.types.indexOf('route') !== -1
        )[0].long_name,
        street_number:
          geometry.location !== ''
            ? types[0] !== 'route'
              ? address_components.filter(
                  item => item.types.indexOf('street_number') !== -1
                )[0].long_name
              : ''
            : '',
        area:
          geometry.location !== ''
            ? address_components.filter(
                item => item.types.indexOf('sublocality') !== -1
              )[0].long_name
            : '',
        city:
          geometry.location !== ''
            ? address_components.filter(
                item => item.types.indexOf('locality') !== -1
              )[0].long_name
            : ''
      });
    }
  };

  componentDidMount() {
    this.update(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.update(nextProps);
  }
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
    const {
      default_address,
      route,
      firstName,
      lastName,
      street,
      street_number,
      area,
      city,
      housing,
      floor_nbr,
      counpound_name,
      apt_villa_nbr,
      details,
      json_geocode
    } = this.state;
    const values = {
      route,
      default_address,
      firstName,
      lastName,
      street,
      street_number,
      area,
      city,
      housing,
      floor_nbr,
      counpound_name,
      apt_villa_nbr,
      details,
      json_geocode
    };

    switch (step) {
      case 1:
        return (
          <FormUserAdress
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      default:
        return '';
    }
  }
}

const mapStateToProps = state => ({
  areas: state.areas
});

export default connect(mapStateToProps)(OrderConfirm);

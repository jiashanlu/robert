import React from 'react';
/* global google */
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { checkAreas } from '../../components/Geo/CheckArea';
import { withRouter } from 'react-router';
import { returnErrors, createMessage } from '../../actions/messages';
import TextField from '@material-ui/core/TextField';
import { change } from 'redux-form';

import Button from '../../components/CustomButtons/Button.jsx';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
  input: {
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
};

class LandingForm extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
  }
  state = {
    nbr: ''
  };

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ['geocode'] }
    );
    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged = async () => {
    if (!this.props.withButton) {
      const onMap = true;
      await this.handleClick(onMap);
    }
  };

  handleClick = async onMap => {
    // const { dataForm } = this.props || '';
    // if (dataForm !== '') {
    //   if (/\d/.test(dataForm.value)) {
    //     await this.setState({
    //       nbr: dataForm.value.match(/\d+/)[0]
    //     });
    //   }
    // }
    const nbr = this.state.nbr;
    const address = this.autocomplete.getPlace();
    checkAreas(
      nbr,
      'geo',
      address,
      this.props.areas.areas,
      async addr => {
        this.props.change('FormUserAddress', 'street', addr.street);
        this.props.change(
          'FormUserAddress',
          'street_number',
          addr.street_number
        );
        this.props.change('FormUserAddress', 'area', addr.area);
        this.props.change('FormUserAddress', 'city', addr.city);
        this.props.history.push('/order');
        this.props.createMessage({
          AddressOK: 'Good news! Robert delivers here! start our services now!'
        });
      },
      no => {
        this.props.change('FormUserAddress', 'street', '');
        this.props.change('FormUserAddress', 'area', '');
        this.props.change('FormUserAddress', 'city', '');
        this.props.change('FormUserAddress', 'street_number', '');
        this.props.returnErrors({
          notAvailable:
            'Not yet available, try another address or comeback later'
        });
      },
      err => {
        this.props.returnErrors({
          addressIncorrect: 'The address format looks incorrect!'
        });
        this.props.change('FormUserAddress', 'street', '');
        this.props.change('FormUserAddress', 'area', '');
        this.props.change('FormUserAddress', 'city', '');
        this.props.change('FormUserAddress', 'street_number', '');
      }
    );
  };

  onFocus = () => {
    this.props.change('FormUserAddress', 'street', '');
    this.props.change('FormUserAddress', 'area', '');
    this.props.change('FormUserAddress', 'city', '');
  };
  button = (
    <Button
      onClick={this.handleClick}
      color="success"
      size="lg"
      href=""
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fas fa-play" />
      Try Now !
    </Button>
  );

  render() {
    const { withButton, dataForm, label, custom } = this.props;
    const { touched, invalid, error } = this.props.meta || '';
    return (
      <div className="form-post">
        <TextField
          {...dataForm}
          {...custom}
          error={touched && invalid}
          helperText={touched && error}
          fullWidth
          onFocus={this.onFocus}
          variant="outlined"
          margin="dense"
          label={label}
          inputRef={this.autocompleteInput}
        />
        {withButton ? <br /> : ''}
        {withButton ? this.button : ''}
      </div>
    );
  }
}

LandingForm.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  areas: state.areas
});

export default withRouter(
  withStyles(styles)(
    connect(
      mapStateToProps,
      { returnErrors, createMessage, change }
    )(LandingForm)
  )
);

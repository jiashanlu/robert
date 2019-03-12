import React from 'react';
/* global google */
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';
import { confirmInArea } from '../../actions/areas';
import { checkAreas } from '../../components/Geo/CheckArea';
import { withRouter } from 'react-router';
import { returnErrors } from '../../actions/messages';
import TextField from '@material-ui/core/TextField';

import Button from '../../components/CustomButtons/Button.jsx';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
  input: {
    // marginLeft: 8,
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
    input: this.props.textValue || '',
    blured: false
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
      await this.handleClick();
      this.setState({
        input: this.props.textValue || ''
      });
    }
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      input: nextProps.textValue || ''
    });
  }

  handleClick = () => {
    const address = this.autocomplete.getPlace();
    checkAreas(
      'geo',
      address,
      this.props.areas.areas,
      async addr => {
        await this.props.confirmInArea(addr);
        this.props.history.push('/order');
      },
      no => {
        this.props.confirmInArea();
        this.setState({
          input: ''
        });
      },
      err => {
        this.props.returnErrors({
          addressIncorrect: 'The address format looks incorrect!'
        });
        this.setState({
          input: ''
        });
      }
    );
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onFocus = () => {
    if (this.state.blured) {
      this.setState({
        input: ''
      });
    }
  };
  onBlur = () => {
    this.setState({
      blured: true
    });
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
    const { classes, withButton, areas } = this.props;
    return (
      <div className="form-post">
        <FormControl fullWidth>
          <TextField
            autoFocus
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            variant="outlined"
            margin="dense"
            required
            label="Street"
            error={
              areas.testAddress !== ''
                ? areas.testAddress.geometry.location === ''
                  ? true
                  : false
                : false
            }
            value={this.state.input}
            onChange={this.onChange}
            name="input"
            inputRef={this.autocompleteInput}
            placeholder="Test your location here .."
            inputProps={{
              'aria-label': 'Is Robert available?'
            }}
          />
        </FormControl>
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
      { confirmInArea, returnErrors }
    )(LandingForm)
  )
);

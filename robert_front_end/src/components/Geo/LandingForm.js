import React from 'react';
/* global google */
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';
import { confirmInArea } from '../../actions/areas';
import { checkAreas } from '../../components/Geo/CheckArea';
import { withRouter } from 'react-router';

import Button from '../../components/CustomButtons/Button.jsx';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
  input: {
    marginLeft: 8,
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

class IndexForm extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ['geocode'] }
    );

    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged() {
    const place = this.autocomplete.getPlace();
  }

  handleClick = () => {
    const address = this.autocomplete.getPlace();
    checkAreas(
      address,
      this.props.areas.areas,
      async addr => {
        await this.props.confirmInArea(addr);
        this.props.history.push('/order');
      },
      no => {
        this.props.confirmInArea();
        // set address to null
      }
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="form-post">
        <FormControl fullWidth>
          <Input
            inputRef={this.autocompleteInput}
            placeholder="Test your location here .."
            className={classes.input}
            inputProps={{
              'aria-label': 'Is Robert available?'
            }}
          />
          <br />
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
        </FormControl>
      </div>
    );
  }
}

IndexForm.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  areas: state.areas
});

export default withRouter(
  withStyles(styles)(
    connect(
      mapStateToProps,
      { confirmInArea }
    )(IndexForm)
  )
);

import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Map from '../Geo/Map';
import LandingForm from '../Geo/LandingForm';
import Grid from '@material-ui/core/Grid';

export class FormUserAddress extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  componentWillReceiveProps(newProps) {
    if (newProps.values.route === 'route') {
      setTimeout(() => {
        this.textField.focus();
      }, 100);
    }
  }

  render() {
    const { values, handleChange } = this.props;
    return (
      <Fragment>
        <DialogTitle id="form-dialog-title">
          I need to get to know you better!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Select / confirm your location</DialogContentText>
          <Map default_address={values.default_address} />
          <Grid container spacing={8}>
            <Grid item xs={12} sm={2}>
              <TextField
                type="number"
                disabled={values.route === 'route' ? false : true}
                inputRef={field => (this.textField = field)}
                value={values.street_number}
                onChange={handleChange('street_number')}
                required
                label="Street Number"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={10}>
              <LandingForm className="form-landing" textValue={values.street} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={values.area}
                disabled
                required
                label="Area"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={values.city}
                disabled
                fullWidth
                required
                label="City"
                margin="dense"
              />
            </Grid>
          </Grid>
          <br />
          <Button onClick={this.continue}>Continue</Button>
          <Button onClick={this.back}>Back</Button>
        </DialogContent>
      </Fragment>
    );
  }
}

export default FormUserAddress;

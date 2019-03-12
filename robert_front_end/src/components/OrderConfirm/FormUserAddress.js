import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Map from '../Geo/Map';
import LandingForm from '../Geo/LandingForm';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

export class FormUserAddress extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  componentWillReceiveProps(newProps) {
    if (newProps.values.street_number === '') {
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
          Confirm your name & location
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={6}>
              <FormControl required>
                <TextField
                  fullWidth
                  required
                  label="First Name"
                  margin="dense"
                  value={values.first_name}
                  onChange={handleChange('first_name')}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                value={values.last_name}
                onChange={handleChange('last_name')}
                required
                label="Last Name"
                margin="dense"
              />
            </Grid>
            <br />
            <Grid item xs={12} sm={12}>
              <DialogContentText>
                Drag the marker on the map or type in the street field
              </DialogContentText>
            </Grid>
            <Map default_address={values.default_address} />
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
          <Button type="submit" onClick={this.continue}>
            Continue
          </Button>
        </DialogContent>
      </Fragment>
    );
  }
}

export default FormUserAddress;

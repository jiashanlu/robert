import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import Map from '../Geo/Map';
import LandingForm from '../Geo/LandingForm';
import Grid from '@material-ui/core/Grid';

export class FormUserAddress extends Component {
  onSubmit = values => {
    this.props.nextStep(values);
  };

  componentWillReceiveProps(newProps) {
    if (newProps.values.street_number === '') {
      setTimeout(() => {
        this.Field.focus();
      }, 100);
    }
  }

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        validate={values => {
          const errors = {};
          if (!values.street_number) {
            errors.street_number = 'Required';
          }
          if (!values.street) {
            errors.street = 'Required';
          }
          return errors;
        }}
        initialValues={this.props.values}
        render={({ handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            <Fragment>
              <DialogTitle id="form-dialog-title">
                Confirm your name & location
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={8}>
                  <Grid item xs={12} sm={12}>
                    <DialogContentText>
                      Drag the marker on the map or type in the street field
                    </DialogContentText>
                  </Grid>
                  <Map default_address={values.default_address} />
                  <Grid item xs={12} sm={2}>
                    <Field
                      type="number"
                      component={TextField}
                      disabled={values.route === 'route' ? false : true}
                      inputRef={field => (this.Field = field)}
                      name="street_number"
                      // onChange={handleChange('street_number')}
                      label="Street Number"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <LandingForm
                      textValue={values.street}
                      className="form-landing"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      name="area"
                      disabled
                      label="Area"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      name="city"
                      disabled
                      fullWidth
                      label="City"
                      margin="dense"
                    />
                  </Grid>
                </Grid>
                <br />
                <Button type="submit" disabled={submitting}>
                  Continue
                </Button>
              </DialogContent>
            </Fragment>
          </form>
        )}
      />
    );
  }
}

export default FormUserAddress;

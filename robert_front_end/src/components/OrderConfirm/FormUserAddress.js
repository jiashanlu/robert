import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Map from '../Geo/Map';
import LandingForm from '../Geo/LandingForm';
import Grid from '@material-ui/core/Grid';

const validate = values => {
  const errors = {};
  const requiredFields = ['street_number', 'street'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  return errors;
};
const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const LandingFormField = ({ label, input, meta, ...custom }) => (
  <LandingForm dataForm={input} meta={meta} label={label} custom={custom} />
);
const FormUserAddress = props => {
  const { handleSubmit, pristine, submitting, nextStep } = props;
  return (
    <form
      onSubmit={handleSubmit(() => {
        nextStep();
      })}
    >
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
            <Map />
            <Grid item xs={12} sm={2}>
              <Field
                type="number"
                component={renderTextField}
                name="street_number"
                label="Street Number"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={10}>
              <Field
                component={LandingFormField}
                placeholder="enter a location"
                label="street"
                name="street"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                component={renderTextField}
                name="area"
                disabled
                label="Area"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                component={renderTextField}
                name="city"
                disabled
                fullWidth
                label="City"
                margin="dense"
              />
            </Grid>
          </Grid>
          <br />
          <Button type="submit" disabled={pristine || submitting}>
            Continue
          </Button>
        </DialogContent>
      </Fragment>
    </form>
  );
};

export default reduxForm({
  form: 'FormUserAddress',
  validate,
  destroyOnUnmount: false
})(FormUserAddress);

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
import Form1 from '../ReduxForms/Form1';

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
          <Form1 />
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

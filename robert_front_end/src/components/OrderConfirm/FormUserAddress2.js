import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import Form2 from '../ReduxForms/Form2';
import Form3 from '../ReduxForms/Form3';
import Form4 from '../ReduxForms/Form4';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'first_name',
    'last_name',
    'housing',
    'delivery_choice',
    'reception_choice'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (!values.phone_number) {
    errors.phone_number = 'Required';
  } else if ((values.phone_number.match(/\d/g) || []).length < 13) {
    errors.phone_number = 'Must be 9 figures';
  }
  return errors;
};

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onChange={input.onChange}
    color="default"
  />
);

let FormUserAddress2 = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    preference_default,
    address_default,
    housing,
    prevStep,
    nextStep
  } = props;
  return (
    <form
      onSubmit={handleSubmit(() => {
        nextStep();
      })}
    >
      <Fragment>
        <DialogTitle>Help me to find you better</DialogTitle>
        <DialogContent>
          <Form2 />
          <Form3 housing={housing} />
          <Grid container spacing={8} />
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={
                <Field
                  type="checkbox"
                  component={renderCheckbox}
                  name="address_default"
                />
              }
              label={
                address_default
                  ? 'This adress will be taken as default'
                  : 'It is not your usual addresss'
              }
            />
          </Grid>
        </DialogContent>
        <DialogTitle>Your delivery preferences</DialogTitle>
        <DialogContent>
          <Form4 />
          <Grid item xs={12} sm={12}>
            <br />
            <FormControlLabel
              control={
                <Field
                  type="checkbox"
                  component={renderCheckbox}
                  name="preference_default"
                />
              }
              label={
                preference_default
                  ? 'It will be your default preferences'
                  : 'It is not your default preferences'
              }
            />
          </Grid>
          <br />
          <Button type="submit" disabled={pristine || submitting}>
            Continue
          </Button>
          <Button onClick={prevStep}>Back</Button>
        </DialogContent>
      </Fragment>
    </form>
  );
};

FormUserAddress2 = reduxForm({
  form: 'FormUserAddress',
  validate,
  destroyOnUnmount: false
})(FormUserAddress2);

const selector = formValueSelector('FormUserAddress');
FormUserAddress2 = connect(state => {
  const { preference_default, address_default, housing } = selector(
    state,
    'preference_default',
    'address_default',
    'housing'
  );
  return {
    preference_default,
    address_default,
    housing
  };
})(FormUserAddress2);

export default FormUserAddress2;

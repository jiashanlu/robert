import React, { Component, Fragment } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';

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

const renderTextFieldNumber = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <NumberFormat
    label={label}
    format="+971(#)###-###-###"
    // color="default"
    customInput={TextField}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);
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

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onChange={input.onChange}
    color="default"
  />
);

const housingChoices = [
  {
    value: 'Villa',
    label: 'Villa'
  },
  {
    value: 'Appartment',
    label: 'Appartment'
  }
];
const deliveryChoices = [
  {
    value: '4:00 - 7:00',
    label: '4:00 - 7:00'
  },
  {
    value: '10:30 - 11:30',
    label: '10:30 - 11:30'
  },
  {
    value: '18:00 - 20:00',
    label: '18:00 - 20:00'
  }
];
const receptionChoices = [
  {
    value: 'ring the bell',
    label: 'ring the bell'
  },
  {
    value: 'let in the front door',
    label: 'front door'
  }
];

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
          <Grid container spacing={8}>
            <Grid item xs={12} sm={4}>
              <Field
                fullWidth
                name="first_name"
                component={renderTextField}
                label="First Name"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field
                fullWidth
                component={renderTextField}
                name="last_name"
                label="Last Name"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field
                fullWidth
                component={renderTextFieldNumber}
                name="phone_number"
                label="Mobile nbr"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field
                component={renderTextField}
                select
                name="housing"
                label="housing type"
                margin="dense"
                fullWidth
              >
                {housingChoices.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
            <Grid item xs={8} sm={4}>
              <Field
                component={renderTextField}
                fullWidth
                type="text"
                name="counpound_building_name"
                label={
                  housing === 'Villa'
                    ? 'Counpound name'
                    : housing === 'Appartment'
                    ? 'Building name'
                    : 'Counpound / Building name'
                }
                margin="dense"
              />
            </Grid>
            <Grid item xs={4} sm={4}>
              <Field
                component={renderTextField}
                fullWidth
                type="number"
                name="apt_villa_nbr"
                label={
                  housing === 'VILLA'
                    ? 'Villa nbr'
                    : housing === 'APT'
                    ? 'Apt nbr'
                    : 'Apt / villa nbr'
                }
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Field
                name="details"
                component={renderTextField}
                variant="outlined"
                multiline
                rows="4"
                fullWidth
                label="details"
                margin="normal"
                helperText="Here you could help me to find you bettre by giving me any details that you find usefull (about who is at home, access code, landmark etc...)"
              />
            </Grid>
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
          </Grid>
        </DialogContent>
        <DialogTitle>Your delivery preferences</DialogTitle>
        <DialogContent>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={6}>
              <Field
                component={renderTextField}
                select
                name="delivery_choice"
                required
                label="delivery choice"
                margin="dense"
                fullWidth
              >
                {deliveryChoices.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                component={renderTextField}
                select
                name="reception_choice"
                required
                label="reception choice"
                margin="dense"
                fullWidth
              >
                {receptionChoices.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
            </Grid>
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

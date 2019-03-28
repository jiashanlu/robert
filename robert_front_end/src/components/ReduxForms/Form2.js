import React from 'react';
import { Field } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import NumberFormat from 'react-number-format';

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

function Form2() {
  return (
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
    </Grid>
  );
}

export default Form2;

import React from 'react';
import { Field, formValueSelector } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

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

function Form4() {
  return (
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
    </Grid>
  );
}

export default Form4;

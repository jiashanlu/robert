import React from 'react';
import { Field } from 'redux-form';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Map from '../Geo/Map';
import LandingForm from '../Geo/LandingForm';

const LandingFormField = ({ label, input, meta, ...custom }) => (
  <LandingForm dataForm={input} meta={meta} label={label} custom={custom} />
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
function Form1() {
  return (
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
  );
}

export default Form1;

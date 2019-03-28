import React from 'react';
import { Field, formValueSelector } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';

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

function Form3(props) {
  const { housing } = props;
  return (
    <Grid container spacing={8}>
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
            housing === 'Villa'
              ? 'Villa nbr'
              : housing === 'Appartment'
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
    </Grid>
  );
}

export default Form3;

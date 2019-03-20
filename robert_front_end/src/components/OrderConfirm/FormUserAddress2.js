import React, { Component, Fragment } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NumberFormat from 'react-number-format';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox } from 'final-form-material-ui';
import TextFieldMat from '@material-ui/core/TextField';

export class FormUserAddress2 extends Component {
  onSubmit = values => {
    this.props.nextStep(values);
  };
  back = (e, values) => {
    e.persist();
    this.props.prevStep(values);
  };

  TextFieldAdapter = ({ input, meta, ...rest }) => (
    <NumberFormat
      customInput={TextFieldMat}
      color="default"
      format="+971(#)###-###-###"
      {...input}
      {...rest}
      error={meta.touched ? Boolean(meta.error) : false}
      helperText={meta.touched ? meta.error : ''}
      onBlur={event => input.onBlur(event)}
      onFocus={event => input.onFocus(event)}
      onChange={event => input.onChange(event)}
    />
  );

  housingChoices = [
    {
      value: 'Villa',
      label: 'Villa'
    },
    {
      value: 'Appartment',
      label: 'Appartment'
    }
  ];
  deliveryChoices = [
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
  receptionChoices = [
    {
      value: 'ring the bell',
      label: 'ring the bell'
    },
    {
      value: 'let in the front door',
      label: 'front door'
    }
  ];
  required = value => (value ? undefined : 'Required');
  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={this.props.values}
        render={({ handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            <Fragment>
              <DialogTitle>Help me to find you better</DialogTitle>
              <DialogContent>
                <Grid container spacing={8}>
                  <Grid item xs={12} sm={4}>
                    <Field
                      fullWidth
                      name="first_name"
                      validate={this.required}
                      component={TextField}
                      label="First Name"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field
                      fullWidth
                      component={TextField}
                      validate={this.required}
                      name="last_name"
                      label="Last Name"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field
                      fullWidth
                      component={this.TextFieldAdapter}
                      validate={this.required}
                      value="values.phone_number"
                      name="phone_number"
                      label="Mobile nbr"
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field
                      component={TextField}
                      validate={this.required}
                      select
                      name="housing"
                      label="housing type"
                      margin="dense"
                      fullWidth
                    >
                      {this.housingChoices.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={8} sm={4}>
                    <Field
                      component={TextField}
                      fullWidth
                      type="text"
                      name="counpound_building_name"
                      label={
                        values.housing === 'VILLA'
                          ? 'Counpound name'
                          : values.housing === 'APT'
                          ? 'Building name'
                          : 'Counpound / Building name'
                      }
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <Field
                      component={TextField}
                      fullWidth
                      type="number"
                      name="apt_villa_nbr"
                      label={
                        values.housing === 'VILLA'
                          ? 'Villa nbr'
                          : values.housing === 'APT'
                          ? 'Apt nbr'
                          : 'Apt / villa nbr'
                      }
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Field
                      name="details"
                      component={TextField}
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
                          component={Checkbox}
                          color="default"
                          name="address_default"
                        />
                      }
                      label={
                        values.address_default
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
                      component={TextField}
                      validate={this.required}
                      select
                      name="delivery_choice"
                      required
                      label="delivery choice"
                      margin="dense"
                      fullWidth
                    >
                      {this.deliveryChoices.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      validate={this.required}
                      select
                      name="reception_choice"
                      required
                      label="reception choice"
                      margin="dense"
                      fullWidth
                    >
                      {this.receptionChoices.map(option => (
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
                          component={Checkbox}
                          color="default"
                          name="preference_default"
                        />
                      }
                      label={
                        values.preference_default
                          ? 'It will be your default preferences'
                          : 'It is not your default preferences'
                      }
                    />
                  </Grid>
                </Grid>
                <br />
                <Button type="submit" disabled={submitting}>
                  Continue
                </Button>
                <Button onClick={this.back}>Back</Button>
              </DialogContent>
            </Fragment>
          </form>
        )}
      />
    );
  }
}

export default FormUserAddress2;

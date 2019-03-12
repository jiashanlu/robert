import React, { Component, Fragment } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export class FormUserAddress2 extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  housingChoices = [
    {
      value: 'VILLA',
      label: 'Villa'
    },
    {
      value: 'APT',
      label: 'Appartment'
    }
  ];
  deliveryChoices = [
    {
      value: 'AM',
      label: '4:00 - 7:00'
    },
    {
      value: 'NOON',
      label: '10:30 - 11:30'
    },
    {
      value: 'PM',
      label: '18:00 - 20:00'
    }
  ];
  receptionChoices = [
    {
      value: 'R',
      label: 'ring the bell'
    },
    {
      value: 'F',
      label: 'front door'
    }
  ];

  render() {
    const { values, handleChange, handleCheck } = this.props;
    return (
      <Fragment>
        <DialogTitle>Help me to find you better</DialogTitle>
        <DialogContent>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                value={values.housing}
                onChange={handleChange('housing')}
                required
                label="housing type"
                margin="dense"
                fullWidth
              >
                {this.housingChoices.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="text"
                value={values.counpound_building_name}
                onChange={handleChange('counpound_building_name')}
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
              <TextField
                fullWidth
                type="number"
                value={values.apt_villa_nbr}
                onChange={handleChange('apt_villa_nbr')}
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
              <TextField
                value={values.details}
                variant="outlined"
                multiline
                rows="5"
                onChange={handleChange('details')}
                fullWidth
                label="details"
                margin="normal"
                helperText="Here you could help me to find you bettre by giving me any details that you find usefull (about who is at home, access code, landmark etc...)"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <br />
              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    checked={values.address_default}
                    value="checked"
                    onClick={handleCheck('address_default')}
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
              <TextField
                select
                value={values.delivery_choice}
                onChange={handleChange('delivery_choice')}
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
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                value={values.reception_choice}
                onChange={handleChange('reception_choice')}
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
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <br />

              <FormControlLabel
                control={
                  <Checkbox
                    color="default"
                    checked={values.preference_default}
                    value="checked"
                    onClick={handleCheck('preference_default')}
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
          <Button onClick={this.continue}>Continue</Button>
          <Button onClick={this.back}>Back</Button>
        </DialogContent>
      </Fragment>
    );
  }
}

export default FormUserAddress2;

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { reduxForm, formValueSelector } from 'redux-form';
import Form1 from '../../../components/ReduxForms/Form1';
import Form3 from '../../../components/ReduxForms/Form3';
import Form4 from '../../../components/ReduxForms/Form4';
import { connect } from 'react-redux';

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

let Preferences = props => {
  const { handleSubmit, pristine, submitting, housing } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        className="account-section"
        container
        spacing={16}
        alignContent="flex-start"
      >
        <Grid xs={12} sm={12} item>
          <Typography variant="h4">Preferences</Typography>
          <Typography variant="h5" gutterBottom>
            What do you prefer?
          </Typography>
          <Divider variant="middle" light />
          <Grid xs={12} sm={12} item>
            <Form1 />
          </Grid>
          <Grid xs={12} sm={6} item>
            <Form3 housing={housing} />
          </Grid>
          <Grid xs={12} sm={6} item>
            <Form4 />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

Preferences = reduxForm({
  form: 'Preferences',
  validate
})(Preferences);

const selector = formValueSelector('Preferences');
Preferences = connect(state => {
  const { housing } = selector(state, 'housing');
  return {
    housing
  };
})(Preferences);

export default Preferences;

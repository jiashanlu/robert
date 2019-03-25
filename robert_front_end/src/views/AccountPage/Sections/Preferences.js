import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import MenuList from '../../../components/MenuList/MenuList';
import Grid from '@material-ui/core/Grid';

const Preferences = () => {
  return (
    <Grid container justify="center" alignItems="center">
      <Grid xs={12} sm={12} item className="account-section">
        <Typography component="h3" variant="h3">
          Preferences
        </Typography>
        <Typography variant="h4" gutterBottom>
          Tell us more
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Preferences;

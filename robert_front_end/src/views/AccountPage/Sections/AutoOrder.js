import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const AutoOrder = () => {
  return (
    <Grid container justify="center" alignItems="center">
      <Grid xs={12} sm={12} item className="account-section">
        <Typography component="h3" variant="h3">
          Auto-Order
        </Typography>
        <Typography variant="h4" gutterBottom>
          Make your life easier
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AutoOrder;

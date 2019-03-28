import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const AutoOrder = () => {
  return (
    <Grid
      className="account-section"
      container
      spacing={16}
      alignContent="flex-start"
    >
      <Grid xs={12} sm={12} item>
        <Typography component="h4" variant="h4">
          Auto-Order
        </Typography>
        <Typography variant="h5" gutterBottom>
          Make your life easier
        </Typography>
        <Divider variant="middle" light />
      </Grid>
    </Grid>
  );
};

export default AutoOrder;

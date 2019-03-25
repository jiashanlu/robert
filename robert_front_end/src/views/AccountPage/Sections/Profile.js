import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Profile = () => {
  return (
    <Grid container justify="center" alignItems="center">
      <Grid xs={12} sm={12} item className="account-section">
        <Typography component="h3" variant="h3">
          Profile
        </Typography>
        <Typography variant="h4" gutterBottom>
          Manage your account
        </Typography>
      </Grid>

      <Grid item>
        <h3>test</h3>
      </Grid>
    </Grid>
  );
};

export default Profile;

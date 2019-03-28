import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Card from '../../../components/Card/Card';
import CardBody from '../../../components/Card/CardBody';
import CardHeader from '../../../components/Card/CardHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import Refresh from '@material-ui/icons/Refresh';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Tooltip from '@material-ui/core/Tooltip';

import {
  cardTitle,
  cardSubtitle
} from '../../../assets/jss/material-kit-pro-react';

const style = {
  cardTitle,
  cardSubtitle
};

const Profile = props => {
  const { user } = props.auth;
  const { classes } = props;
  const username =
    user.username.charAt(0).toUpperCase() + user.username.slice(1);
  return (
    <Grid
      className="account-section"
      container
      spacing={16}
      alignContent="flex-start"
    >
      <Grid xs={12} sm={12} item>
        <Typography variant="h4">Profile</Typography>
        <Typography variant="h5" gutterBottom>
          Hi {username} ! Manage your account here <small>; - )</small>
        </Typography>
        <Divider variant="middle" light />
      </Grid>
      <Grid item xs={12} sm={7}>
        <Card>
          <CardBody>
            <CardHeader>
              <h4 className={classes.cardTitle}>Details</h4>
            </CardHeader>
            <dl style={{ textAlign: 'left' }}>
              <dd>
                <b>First Name:</b> {user.first_name}
              </dd>
              <dd>
                <b>Last Name:</b> {user.last_name}
              </dd>
              <dd>
                <b>Phone Nbr:</b> {user.phone_number}
              </dd>
            </dl>
            <Divider variant="middle" light />
            <br />
            <dl style={{ textAlign: 'left' }}>
              <dd style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>
                  <b>Email :</b> {user.email}
                </span>
                <span>
                  <Tooltip title="modify?" placement="right">
                    <Button size="small" variant="contained" color="secondary">
                      <Refresh />
                    </Button>
                  </Tooltip>
                </span>
              </dd>
              <dd style={{ display: 'flex', justifyContent: 'space-between' }}>
                <b>Modify your password</b>{' '}
                <Button size="small" variant="contained" color="secondary">
                  <Refresh />
                </Button>
              </dd>
            </dl>
          </CardBody>
        </Card>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Card>
          <CardBody>
            <CardHeader>
              <h4 className={classes.cardTitle}>Account Balance</h4>
            </CardHeader>
            <h3 style={{ textAlign: 'left' }}>
              Cash : <b>{user.balance} AED</b>
            </h3>
            <Divider variant="middle" light />
            <br />
            <h3>Top-up</h3>
            <br />
            <span style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Button size="large" variant="outlined" color="primary">
                200 AED
              </Button>
              <Button size="large" variant="outlined" color="primary">
                500 AED
              </Button>
              <Button size="large" variant="outlined" color="primary">
                1000 AED
              </Button>
            </span>
            <span
              style={{
                marginTop: '2px',
                display: 'flex',
                justifyContent: 'space-around'
              }}
            >
              <ArrowUpward color="primary" />
              <ArrowUpward color="primary" />
              <ArrowUpward color="primary" />
            </span>
            <span
              style={{
                marginTop: '2px',
                display: 'flex',
                justifyContent: 'space-around'
              }}
            >
              <Typography variant="caption" gutterBottom>
                for 195AED
              </Typography>
              <Typography variant="caption" gutterBottom>
                for 480AED
              </Typography>
              <Typography variant="caption" gutterBottom>
                for 950AED
              </Typography>
            </span>
          </CardBody>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Card>
          <CardBody>
            <CardHeader>
              <h4 className={classes.cardTitle}>Membership</h4>
            </CardHeader>
            YOUR MEMBERSHIP
          </CardBody>
        </Card>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(style)(Profile));

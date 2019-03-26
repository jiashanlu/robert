import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import Quote from '../../../components/Typography/Quote';
import Card from '../../../components/Card/Card';
import CardBody from '../../../components/Card/CardBody';
import CardHeader from '../../../components/Card/CardHeader';
import withStyles from '@material-ui/core/styles/withStyles';
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
    <Grid className="account-section" container alignContent="flex-start">
      <Grid xs={12} sm={12} item>
        <Typography variant="h4">Profile</Typography>
        <Typography variant="h5" gutterBottom>
          Manage your account
        </Typography>
        <Divider variant="middle" light />
        <br />
        <br />
      </Grid>
      <Grid style={{ textAlign: 'left' }} xs={12} sm={12} item>
        <Quote
          text={
            <span>
              Hi <b>{username}</b>
              !, this is the place for managing your profile
            </span>
          }
          author=" Robert, Baker"
        />
      </Grid>
      <Grid style={{ margin: '5px' }} item xs={12} sm={4}>
        <Card>
          <CardBody>
            <CardHeader>
              <h4 className={classes.cardTitle}>{username} details</h4>
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

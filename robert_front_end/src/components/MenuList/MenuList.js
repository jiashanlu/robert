import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Layers from '@material-ui/icons/Layers';
import Assignment from '@material-ui/icons/Assignment';
import Build from '@material-ui/icons/Build';
import { connect } from 'react-redux';
import { newAccountTab } from '../../actions/path';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {}
});

const handdleClick = (event, s, props) => {
  console.log('s');
  event.preventDefault();
  event.persist();
  props.newAccountTab(s);
};

const ListItemComposition = props => {
  const { classes } = props;

  return (
    <Grid container>
      <MenuList className="list-account-menu-custom">
        <Grid item xs={3} sm={12}>
          <a href="#" onClick={e => handdleClick(e, 1, props)}>
            <MenuItem className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary="Profile"
              />
            </MenuItem>
          </a>
        </Grid>
        <Grid item xs={3} sm={12}>
          <a href="#" onClick={e => handdleClick(e, 2, props)}>
            <MenuItem className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <Build />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary="Preferences"
              />
            </MenuItem>
          </a>
        </Grid>
        <Grid item xs={3} sm={12}>
          <a href="#" onClick={e => handdleClick(e, 3, props)}>
            <MenuItem className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <Layers />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary="Auto-Order"
              />
            </MenuItem>
          </a>
        </Grid>
        <Grid item xs={3} sm={12}>
          <a href="#" onClick={e => handdleClick(e, 4, props)}>
            <MenuItem className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <Assignment />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary="Order History"
              />
            </MenuItem>
          </a>
        </Grid>
      </MenuList>
    </Grid>
  );
};

ListItemComposition.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { newAccountTab }
)(withStyles(styles)(ListItemComposition));

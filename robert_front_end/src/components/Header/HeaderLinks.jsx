/* eslint-disable */
import React from 'react';

// nodejs library to set properties for components
import PropTypes from 'prop-types';
// react components for routing our app without refresh
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// @material-ui/icons
import Apps from '@material-ui/icons/Apps';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Layers from '@material-ui/icons/Layers';
import Assignment from '@material-ui/icons/Assignment';
import Build from '@material-ui/icons/Build';

// core components
import CustomDropdown from '../CustomDropdown/CustomDropdown.jsx';
import Button from '../CustomButtons/Button.jsx';
import { logout } from '../../actions/auth';

import headerLinksStyle from '../../assets/jss/material-kit-pro-react/components/headerLinksStyle.jsx';

function HeaderLinks({ ...props }) {
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = (e, target) => {
    if (window.location.pathname === '/sections') {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        var targetScroll = document.getElementById(target);
        scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
      }
    }
  };
  const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function() {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };

  var onClickSections = {};
  const { classes, dropdownHoverColor } = props;
  const { isAuthenticated, user } = props.auth;
  const loggedIn = (
    <Link to="/login">
      <Button
        className={classes.registerNavLink}
        color="success"
        round
        size="sm"
      >
        Sign-In
      </Button>
    </Link>
  );
  const loggedOut = (
    <Link to="/">
      <Button
        onClick={props.logout}
        className={classes.registerNavLink}
        color="danger"
        round
        size="sm"
      >
        Sign-Out
      </Button>
    </Link>
  );
  const order = (
    <Link to="/order">
      <Button className={classes.registerNavLink} simple size="sm">
        Order!
      </Button>
    </Link>
  );
  const menu = (
    <CustomDropdown
      noLiPadding
      navDropdown
      hoverColor={dropdownHoverColor}
      buttonText="My Account"
      buttonProps={{
        className: classes.navLink,
        color: 'transparent'
      }}
      buttonIcon={Apps}
      dropdownList={[
        <Link to="#" className={classes.dropdownLink}>
          <AccountCircle className={classes.dropdownIcons} /> Profile
        </Link>,
        <Link to="#" className={classes.dropdownLink}>
          <Build className={classes.dropdownIcons} /> Preferences
        </Link>,
        <Link to="#" className={classes.dropdownLink}>
          <Layers className={classes.dropdownIcons} />
          Auto-Order
        </Link>,

        <Link to="#" className={classes.dropdownLink}>
          <Assignment className={classes.dropdownIcons} />
          Order History
        </Link>
      ]}
    />
  );

  return (
    <List className={classes.list + ' ' + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        {isAuthenticated ? order : ''}
      </ListItem>
      <ListItem className={classes.listItem}>
        {isAuthenticated ? menu : ''}
      </ListItem>

      <span>&nbsp;&nbsp; </span>
      <ListItem className={classes.listItem}>
        {isAuthenticated ? loggedOut : loggedIn}
      </ListItem>
    </List>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: 'primary'
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    'dark',
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'rose'
  ])
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withStyles(headerLinksStyle)(
  connect(
    mapStateToProps,
    { logout }
  )(HeaderLinks)
);

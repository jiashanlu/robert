import React, { Component, Fragment } from 'react';
import OrderHistory from './OrderHistory';
import AutoOrder from './AutoOrder';
import Preferences from './Preferences';
import Profile from './Profile';
import { connect } from 'react-redux';

const SectionsSwitch = props => {
  const { tab } = props;
  switch (tab) {
    case 1:
      return <Profile />;
    case 2:
      return <Preferences />;
    case 3:
      return <AutoOrder />;
    case 4:
      return <OrderHistory />;
    default:
      return '';
  }
};

const mapStateToProps = state => ({
  tab: state.path.accountTab
});

export default connect(mapStateToProps)(SectionsSwitch);

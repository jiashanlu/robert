import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message, path } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.name) alert.error(`Name: ${error.msg.name[0]}`);
      if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
      if (error.msg.message)
        alert.error(`Message: ${error.msg.message.join()}`);
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
      if (error.msg.username) alert.error(error.msg.username.join());
      if (error.msg.notAvailable && path.pathName !== '/order')
        alert.error(error.msg.notAvailable);
      if (error.msg.addressIncorrect && path.pathName !== '/order')
        alert.error(error.msg.addressIncorrect);
    }
    if (message !== prevProps.message) {
      if (message.termsnotagreed) alert.error(message.termsnotagreed);
      if (message.AddressOK && path.pathName !== '/order')
        alert.success(message.AddressOK);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages,
  path: state.path
});

export default connect(mapStateToProps)(withAlert()(Alerts));

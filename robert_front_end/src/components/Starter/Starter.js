import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Starter extends Component {
  render() {
    return !this.props.auth && !this.props.items && !this.props.areas ? (
      this.props.children
    ) : (
      <h1>Loading...</h1>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth.isLoading,
  items: state.items.isLoading,
  areas: state.areas.isLoading
});

export default connect(mapStateToProps)(Starter);

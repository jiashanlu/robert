import React, { Component, Fragment } from "react";
import Login from "./Login";
import Register from "./Register";
import { connect } from "react-redux";
import { newPath } from "../../actions/path";

export class Registration extends Component {
  componentDidMount() {
    this.props.newPath(this.props.location.pathname); // set path state
  }
  render() {
    return (
      <Fragment>
        <Login />
        <Register />
      </Fragment>
    );
  }
}

export default connect(
  null,
  { newPath }
)(Registration);

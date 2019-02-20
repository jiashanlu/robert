import React, { Component, Fragment } from "react";
import LandingTop from "./LandingTop";
import Carousel from "./Carousel";
import { connect } from "react-redux";
import { newPath } from "../../../actions/path";

export class Landing extends Component {
  componentDidMount() {
    this.props.newPath(this.props.location.pathname);
  }

  render() {
    return (
      <Fragment>
        <LandingTop />
        <Carousel />
      </Fragment>
    );
  }
}

export default connect(
  null,
  { newPath }
)(Landing);

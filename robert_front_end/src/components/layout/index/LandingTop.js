import React, { Component } from "react";
import IndexForm from "../../geo/IndexForm";

export class LandingTop extends Component {
  render() {
    return (
      <div className="body-up">
        <div className="text-area">
          <span>The best bread in Town!</span>
        </div>
        <div className="img-home" />
        <IndexForm />
      </div>
    );
  }
}

export default LandingTop;

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { newPath } from "../../actions/path";
import Grid from "@material-ui/core/Grid";
import Parallax from "../../layout/materialKit/Parallax.jsx";
import Button from "@material-ui/core/Button";
import Header from "./Header";

export class Landing extends Component {
  componentDidMount() {
    this.props.newPath(this.props.location.pathname); // set path state
  }

  render() {
    return (
      <Fragment>
        <Header
          color="transparent"
          brand="Material Kit React"
          // rightLinks={}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
        />
        <Parallax filter image={require("../../../static/img/landing-bg.jpg")}>
          <div>
            <Grid container className="container-landing">
              <Grid item xs={12} sm={12} md={6}>
                <h1 className="title-landing">Your Story Starts With Us.</h1>
                <h4>
                  Every landing page needs a small description after the big
                  bold title, that's why we added this text here. Add here all
                  the information that can make you or your product create the
                  first impression.
                </h4>
                <br />
                <Button
                  color="danger"
                  size="lg"
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-play" />
                  Watch video
                </Button>
              </Grid>
            </Grid>
          </div>
        </Parallax>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { newPath }
)(Landing);

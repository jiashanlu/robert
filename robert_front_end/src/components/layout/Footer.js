import React, { Component } from "react";
import logo_bottom from "../../static/img/logo-bottom.svg";
import app_store_bottom from "../../static/img/app-store-badge.png";
import google_play_bottom from "../../static/img/google-play-badge.png";

export class Footer extends Component {
  render() {
    return (
      <div className="wrapper-bottom">
        <img className="logo-btm" src={logo_bottom} alt="logo not loaded" />
        <div className="app-link">
          <img src={app_store_bottom} alt="app store link" />
          <img src={google_play_bottom} alt="google play link" />
        </div>
      </div>
    );
  }
}

export default Footer;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../static/img/logo-full3.svg";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout, login } from "../../actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    path: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const signin = (
      <Link to="/login">
        <button type="button" className="sign btn btn-sm btn-outline-secondary">
          Signin
        </button>
      </Link>
    );
    const signout = (
      <button
        onClick={this.props.logout}
        className="sign btn btn-sm btn-outline-secondary"
      >
        Logout
      </button>
    );
    const userSigned = (
      <span>
        <span>{user ? `Welcome ${user.username} ` : ""}</span>
        <a title="Your account details" href="">
          My Account!
        </a>
      </span>
    );

    return (
      <div className="navbar header">
        {isAuthenticated ? userSigned : ""}
        <div
          className={this.props.path.pathName === "/" ? "logo-index" : "logo"}
        >
          <Link to="/">
            <img src={logo} alt="logo not loaded" />
          </Link>
        </div>
        <div>{isAuthenticated ? signout : signin}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  path: state.path
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);

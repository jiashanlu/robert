import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
// core components
import Header from "../../components/Header/Header.jsx";
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
// import InfoArea from "components/InfoArea/InfoArea.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import logo from "../../assets/img/logo-color2.svg";
import signupPageStyle from "../../assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";
import image from "../../assets/img/login-picture.jpg";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import { newPath } from "../../actions/path";
import { createMessage } from "../../actions/messages";
import { Redirect, Link } from "react-router-dom";

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      checked: [1]
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  componentDidMount() {
    this.props.newPath(this.props.location.pathname); // set path state
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }
  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onHandleClick = e => {
    e.preventDefault();
    const { username, email, password, checked } = this.state;
    const newUser = {
      username,
      password,
      email
    };
    if (checked.indexOf(1) !== -1) {
      this.props.register(newUser);
    } else {
      this.props.createMessage({
        termsnotagreed: "please agree on terms first"
      });
    }
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { classes, ...rest } = this.props;
    const { username, password, email } = this.state;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          logo={logo}
          links={<HeaderLinks dropdownHoverColor="rose" />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={10} md={10}>
                <Card className={classes.cardSignup}>
                  <h2 className={classes.cardTitle}>Register</h2>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={5} md={5}>
                      <div className={classes.textCenter}>
                        <Button justIcon round color="twitter">
                          <i className={classes.socials + " fab fa-twitter"} />
                        </Button>
                        {` `}
                        <Button justIcon round color="dribbble">
                          <i className={classes.socials + " fab fa-dribbble"} />
                        </Button>
                        {` `}
                        <Button justIcon round color="facebook">
                          <i
                            className={classes.socials + " fab fa-facebook-f"}
                          />
                        </Button>
                        {` `}
                        <h4 className={classes.socialTitle}>or be classical</h4>
                      </div>
                      <form className={classes.form}>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,

                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Face className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            name: "username",
                            value: username,
                            placeholder: "Username",
                            onChange: this.onChange
                          }}
                        />
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Email className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            placeholder: "Email...",
                            name: "email",
                            value: email,
                            onChange: this.onChange
                          }}
                        />
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Icon className={classes.inputAdornmentIcon}>
                                  lock_outline
                                </Icon>
                              </InputAdornment>
                            ),
                            name: "password",
                            value: password,
                            placeholder: "Password...",
                            onChange: this.onChange,
                            type: "password"
                          }}
                        />
                        <FormControlLabel
                          classes={{
                            label: classes.label
                          }}
                          control={
                            <Checkbox
                              tabIndex={-1}
                              onClick={() => this.handleToggle(1)}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                              }}
                              checked={
                                this.state.checked.indexOf(1) !== -1
                                  ? true
                                  : false
                              }
                            />
                          }
                          label={
                            <span>
                              I agree to the{" "}
                              <a href="#pablo">terms and conditions</a>.
                            </span>
                          }
                        />
                        <div className={classes.textCenter}>
                          <Button
                            round
                            color="success"
                            onClick={this.onHandleClick}
                          >
                            Get started
                          </Button>
                          <Link to="/login">
                            <Button color="info" simple>
                              Already have an account?
                            </Button>
                          </Link>
                        </div>
                      </form>
                    </GridItem>
                  </GridContainer>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default withStyles(signupPageStyle)(
  connect(
    mapStateToProps,
    { register, newPath, createMessage }
  )(SignupPage)
);

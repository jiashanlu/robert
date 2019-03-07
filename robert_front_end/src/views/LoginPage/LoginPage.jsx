import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Face from '@material-ui/icons/Face';
// core components
import Header from '../../components/Header/Header.jsx';
import HeaderLinks from '../../components/Header/HeaderLinks.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import Card from '../../components/Card/Card.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CustomInput from '../../components/CustomInput/CustomInput';
import logo from '../../assets/img/logo-color2.svg';
import { connect } from 'react-redux';
import { login, loginFacebook } from '../../actions/auth';
import { newPath } from '../../actions/path';
import loginPageStyle from '../../assets/jss/material-kit-pro-react/views/loginPageStyle.jsx';
import image from '../../assets/img/login-picture.jpg';
import { Link, Redirect } from 'react-router-dom';

class LoginPage extends React.Component {
  state = {
    username: '',
    password: '',
    email: ''
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    this.props.newPath(this.props.location.pathname); // set path state
  }

  onHandleClick = e => {
    e.preventDefault();
    this.props.login(
      this.state.username,
      this.state.password,
      this.state.email
    );
  };
  onHandleClickFacebook = e => {
    e.preventDefault();
    this.props.loginFacebook();
  };

  onChange = e => {
    if (e.target.value.indexOf('@') > -1 && e.target.value.indexOf('.') > -1) {
      this.setState({
        email: e.target.value,
        [e.target.name]: ''
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        email: ''
      });
    }
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { classes } = this.props;
    const { username, password, email } = this.state;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          logo={logo}
          links={<HeaderLinks dropdownHoverColor="info" />}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: 'url(' + image + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'top center'
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card>
                  <form className={classes.form}>
                    <CardHeader
                      color="success"
                      signup
                      className={classes.cardHeader}
                    >
                      <h4 className={classes.cardTitle}>Login</h4>
                      <div className={classes.socialLine}>
                        <Button
                          justIcon
                          color="transparent"
                          className={classes.iconButtons}
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fab fa-twitter" />
                        </Button>
                        <Button
                          justIcon
                          color="transparent"
                          className={classes.iconButtons}
                          onClick={this.onHandleClickFacebook}
                        >
                          <i className="fab fa-facebook" />
                        </Button>
                        <Button
                          justIcon
                          color="transparent"
                          className={classes.iconButtons}
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fab fa-google-plus-g" />
                        </Button>
                      </div>
                    </CardHeader>
                    <p
                      className={`${classes.description} ${classes.textCenter}`}
                    >
                      Or Be Classical
                    </p>
                    <CardBody signup>
                      <CustomInput
                        id="first"
                        success
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: 'Username or Email',
                          type: 'text',
                          name: 'username',
                          value: email === '' ? username : email,
                          onChange: this.onChange,
                          startAdornment: (
                            <InputAdornment position="start">
                              <Face className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        id="pass"
                        formControlProps={{
                          fullWidth: true
                        }}
                        success
                        inputProps={{
                          placeholder: 'Password',
                          type: 'password',
                          name: 'password',
                          value: password,
                          onChange: this.onChange,
                          startAdornment: (
                            <InputAdornment position="start">
                              <Icon className={classes.inputIconsColor}>
                                lock_utline
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                    <div className={classes.textCenter}>
                      <Button
                        onClick={this.onHandleClick}
                        simple
                        color="success"
                        size="lg"
                      >
                        Let's Go :-)
                      </Button>
                      <Link to="/signup">
                        <Button color="info" simple>
                          Register a new account?
                        </Button>
                      </Link>
                    </div>
                  </form>
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

export default withStyles(loginPageStyle)(
  connect(
    mapStateToProps,
    { login, loginFacebook, newPath }
  )(LoginPage)
);

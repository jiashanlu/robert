import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons
// core components
import Header from '../../components/Header/Header.jsx';
import HeaderLinks from '../../components/Header/HeaderLinks.jsx';
import Parallax from '../../components/Parallax/Parallax.jsx';
import logo from '../../assets/img/logo-color2.svg';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';
import accountPageStyle from '../../assets/jss/material-kit-pro-react/views/accountPageStyle';
import { newPath } from '../../actions/path';
import MenuList from '../../components/MenuList/MenuList';
import Grid from '@material-ui/core/Grid';
import SectionsSwitch from './Sections/SectionsSwitch';

// Sections for this page

class AccountPage extends React.Component {
  state = {
    step: 1
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    this.props.newPath(this.props.location.pathname); // set path state
  }

  changeStep = s => {
    this.setState({
      step: s
    });
  };

  render() {
    const { classes, ...rest } = this.props;
    const { step } = this.state;
    return (
      <div>
        <Header
          color="transparent"
          links={<HeaderLinks dropdownHoverColor="info" />}
          fixed
          logo={logo}
          changeColorOnScroll={{
            height: 100,
            color: 'primary'
          }}
          {...rest}
        />
        <Parallax
          image={require('../../assets/img/account-landing.jpg')}
          filter="dark"
          className={classes.parallax}
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <Grid container>
            <Grid item xs={5}>
              <MenuList />
            </Grid>
            <Grid item item xs={12} sm={12} className="account-section">
              <SectionsSwitch className="account-container" />
            </Grid>
          </Grid>
        </div>
        <br />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default withStyles(accountPageStyle)(
  connect(
    mapStateToProps,
    { newPath }
  )(AccountPage)
);

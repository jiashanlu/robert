import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons
// core components
import Header from '../../components/Header/Header.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import HeaderLinks from '../../components/Header/HeaderLinks.jsx';
import Parallax from '../../components/Parallax/Parallax.jsx';
import logo from '../../assets/img/logo-color2.svg';
import LandingForm from '../../components/Geo/LandingForm';
import Footer from '../../components/Footer/Footer';
import { connect } from 'react-redux';
import landingPageStyle from '../../assets/jss/material-kit-pro-react/views/landingPageStyle.jsx';
import { newPath } from '../../actions/path';

// Sections for this page
import SectionProduct from './Sections/SectionProduct.jsx';

class LandingPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    this.props.newPath(this.props.location.pathname); // set path state
  }
  render() {
    const { classes, ...rest } = this.props;
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
          image={require('../../assets/img/robert-landing.jpg')}
          filter="dark"
        >
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <h1 className={classes.title}>The Best Bread in Town!.</h1>
                <h4>
                  Rober will deliver the best bakery products every morning. You
                  have the garantee to have fresh bread and croissants the same
                  way than if you live in France!
                </h4>
                <br />
                <LandingForm withButton className="form-landing" />
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <SectionProduct />
          </div>
        </div>
        <br />
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(
  connect(
    null,
    { newPath }
  )(LandingPage)
);

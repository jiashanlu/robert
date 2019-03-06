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
import OrderPageStyle from '../../assets/jss/material-kit-pro-react/views/orderPageStyle';
import { newPath } from '../../actions/path';

// Sections for this page
import SectionOrderList from './Sections/SectionOrderList.jsx';

class OrderPage extends React.Component {
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
          image={require('../../assets/img/order-bg.jpg')}
          filter="dark"
          className={classes.parallax}
        />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <SectionOrderList />
          </div>
        </div>
        <br />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items
});

export default withStyles(OrderPageStyle)(
  connect(
    mapStateToProps,
    { newPath }
  )(OrderPage)
);

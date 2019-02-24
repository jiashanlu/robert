import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CartItem from "../../../components/CardItem/CartItem";

// @material-ui/icons
// core components
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import baguette from "../../../assets/img/icon-baguette.svg";
import croissant from "../../../assets/img/icon-croissant.svg";
import special from "../../../assets/img/icon-special.svg";
import productStyle from "../../../assets/jss/material-kit-pro-react/views/landingPageSections/productStyle.jsx";
import { connect } from "react-redux";

class SectionOrderList extends React.Component {
  render() {
    const { classes, items } = this.props;

    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8} md={8}>
            <h3 className={classes.title}>
              Select your favorites products from our selection
            </h3>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <div className="container menu-container">
            {items.items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items
});

export default withStyles(productStyle)(
  connect(mapStateToProps)(SectionOrderList)
);

import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
// core components
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import InfoArea from "../../../components/InfoArea/InfoArea.jsx";
import baguette from "../../../assets/img/icon-baguette.svg";
import croissant from "../../../assets/img/icon-croissant.svg";
import special from "../../../assets/img/icon-special.svg";
import breadI from "../../../assets/img/items/bread-landing.jpg";
import croissantI from "../../../assets/img/items/croissant-landing.jpg";
import specialI from "../../../assets/img/items/special-landing.jpg";
import productStyle from "../../../assets/jss/material-kit-pro-react/views/landingPageSections/productStyle.jsx";
import Success from "../../../components/Typography/Success";
import Quote from "../../../components/Typography/Quote";

import classNames from "classnames";

class SectionProduct extends React.Component {
  render() {
    const { classes } = this.props;
    const imgClasses = classNames(
      classes.imgRaised,
      classes.imgRounded,
      classes.imgFluid
    );
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8} md={8}>
            <h2 className={classes.title}>Robert works all night!</h2>
            <h5 className={classes.description}>
              We commit to provide you with breads freshly made this night and
              delivered to you early morning! Robert selects for you the best
              Bakeries in town!
            </h5>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="Baguettes"
              description="The best French baguette in Town"
              img={baguette}
              vertical
              icon="null"
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="Croissants"
              description="Every kind of delicious croissants"
              img={croissant}
              vertical
              icon="null"
            />
          </GridItem>
          <GridItem xs={12} sm={4} md={4}>
            <InfoArea
              title="Special"
              description="A french touch!"
              img={special}
              vertical
              icon="null"
            />
          </GridItem>

          <GridItem xs={12} sm={8} md={8}>
            <br />
            <br />
            <br />
            <Success>
              <Quote
                text="“I'll do my best to let you feel like you have a bit of your home
                country with you!”"
                author="Robert - Baker & Driver"
              />
            </Success>
          </GridItem>
          <GridItem xs={12} sm={10} md={10} className={classes.section}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={4} md={4}>
                <img src={breadI} alt="..." className={imgClasses} />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <img src={croissantI} alt="..." className={imgClasses} />
              </GridItem>
              <GridItem xs={12} sm={4} md={4}>
                <img src={specialI} alt="..." className={imgClasses} />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(productStyle)(SectionProduct);

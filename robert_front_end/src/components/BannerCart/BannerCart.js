import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '../../components/Card/Card.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import Button from '../CustomButtons/Button';
import Refresh from '@material-ui/icons/Refresh';
import { connect } from 'react-redux';
import styles from '../../assets/jss/material-kit-pro-react/components/BannerCart';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
export class BannerCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRotate1: '',
      activeRotate2: '',
      startDate: new Date()
    };
  }
  componentDidMount = () => {
    const { classes } = this.props;
    var rotatingCards = document.getElementsByClassName(classes.cardRotate);
    for (let i = 0; i < rotatingCards.length; i++) {
      var rotatingCard = rotatingCards[i];
      var rotatingWrapper = rotatingCard.parentElement;
      var cardWidth = rotatingCard.parentElement.offsetWidth;
      var cardHeight = rotatingCard.children[0].children[0].offsetHeight;
      rotatingWrapper.style.height = cardHeight + 'px';
      rotatingWrapper.style['margin-bottom'] = 30 + 'px';
      var cardFront = rotatingCard.getElementsByClassName(classes.front)[0];
      var cardBack = rotatingCard.getElementsByClassName(classes.back)[0];
      cardFront.style.height = cardHeight + 35 + 'px';
      cardFront.style.width = '100%';
      cardBack.style.height = cardHeight + 35 + 'px';
      cardBack.style.width = '100%';
    }
  };

  render() {
    const { classes, ...rest } = this.props;
    const { startDate } = this.state;
    const order = this.props.order.order.filter(ord => ord.qty > 0);
    const { total } = this.props.order;
    return (
      <GridContainer justify="center">
        <GridItem>
          <div
            className={`${classes.rotatingCardContainer} ${
              classes.manualRotate
            } ${this.state.activeRotate1}`}
          >
            <Card className={classes.cardRotate}>
              <div className={classes.front}>
                <CardBody className={classes.cardBodyRotate}>
                  <h4 className={classes.cardTitle}>
                    Your order for tommorow :
                  </h4>
                  <GridContainer justify="center">
                    <GridItem>
                      {order.map((item, index) => (
                        <span>
                          <b>
                            {item.qty}{' '}
                            {item.qty > 1 ? item.name + 's' : item.name}
                            {index < order.length - 1 ? ', ' : ''}
                          </b>
                        </span>
                      ))}
                      <p>
                        Total <small>(before discount)</small> : {total} AED
                      </p>
                    </GridItem>
                  </GridContainer>
                  <div className={classes.textCenter}>
                    <Button
                      round
                      color="gray"
                      onClick={() =>
                        this.setState({
                          activeRotate1: classes.activateRotate
                        })
                      }
                    >
                      <Refresh /> Select another Day
                    </Button>
                  </div>
                </CardBody>
              </div>
              <div className={classes.back}>
                <CardBody className={classes.cardBodyRotate}>
                  <DayPicker
                    selectedDay={startDate}
                    numberOfMonths={3}
                    canChangeMonth={false}
                    onChange={this.handleChange}
                  />
                  <Button
                    link
                    onClick={() => this.setState({ activeRotate1: '' })}
                  >
                    <Refresh /> Back...
                  </Button>
                </CardBody>
              </div>
            </Card>
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}
const mapStateToProps = state => ({
  order: state.order
});

export default withStyles(styles)(connect(mapStateToProps)(BannerCart));

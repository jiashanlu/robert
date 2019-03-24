import React, { Component } from 'react';
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
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Moment from 'react-moment';
import Dialog from '@material-ui/core/Dialog';
import OrderConfirm from '../../components/OrderConfirm/OrderConfirm';
import OrderDetails from './OrderDetails';
import SignupPage from '../../views/SignupPage/SignupPage';
export class BannerCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
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
      // var cardWidth = rotatingCard.parentElement.offsetWidth;
      var cardHeight = rotatingCard.children[0].children[0].offsetHeight;
      rotatingWrapper.style.height = cardHeight + 'px';
      rotatingWrapper.style['margin-bottom'] = 30 + 'px';
      var cardFront = rotatingCard.getElementsByClassName(classes.front)[0];
      var cardBack = rotatingCard.getElementsByClassName(classes.back)[0];
      cardFront.style.height = cardHeight + 'px';
      cardFront.style.width = '100%';
      cardBack.style.height = cardHeight + 'px';
      cardBack.style.width = '100%';
    }
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { startDate } = this.state;
    const order = this.props.order.order.filter(ord => ord.qty > 0);
    const { total, date } = this.props.order;
    return (
      <GridContainer justify="center">
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal + ' ' + classes.modalLarge
          }}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <OrderConfirm handleClose={this.handleClose} />
        </Dialog>
        <GridItem>
          <div
            className={`${classes.rotatingCardContainer} ${
              classes.manualRotate
            } ${this.state.activeRotate1}`}
          >
            <Card className={classes.cardRotate}>
              <div className={classes.front}>
                <CardBody className={classes.cardBodyRotate}>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                  >
                    <Grid item xs={12} sm={8} md={5}>
                      <OrderDetails total={total} order={order} />
                      <br />
                      <br />
                      <Button
                        onClick={this.handleClickOpen}
                        round
                        variant="outlined"
                        color="success"
                      >
                        Confirm your order
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={8} md={3}>
                      <span>
                        <b>
                          For <Moment format="dddd Do">{date}</Moment>
                        </b>
                      </span>
                      <span style={{ padding: '1vw' }}>
                        <Tooltip title="Check another date?" placement="top">
                          <Button
                            justIcon
                            round
                            color="white"
                            onClick={() =>
                              this.setState({
                                activeRotate1: classes.activateRotate
                              })
                            }
                          >
                            <Refresh />
                          </Button>
                        </Tooltip>
                      </span>
                    </Grid>
                  </Grid>
                </CardBody>
              </div>
              <div className={classes.back}>
                <CardBody className={classes.cardBodyRotate}>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="flex-start"
                  >
                    <Grid item xs={12} sm={12} md={12}>
                      <DayPicker
                        selectedDay={startDate}
                        numberOfMonths={3}
                        canChangeMonth={false}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Button
                        link
                        onClick={() => this.setState({ activeRotate1: '' })}
                      >
                        <Refresh /> Back...
                      </Button>
                    </Grid>
                  </Grid>
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

import React, { Component } from 'react';
import Card from '../../components/Card/Card.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardFooter from '../../components/Card/CardFooter.jsx';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import cartItemStyle from '../../assets/jss/material-kit-pro-react/components/cartItemStyle';
import Button from '../CustomButtons/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { updateOrder } from '../../actions/order';

export class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.item
    };
  }
  componentDidMount = async () => {
    try {
      const qty_saved = this.props.order_saved.filter(
        item => item.id === this.state.id
      )[0].qty;
      await this.setState({
        imglink: 'img-var/items/' + this.state.name + '.jpg',
        qty: qty_saved !== 0 ? qty_saved : 0
      });
    } catch {
      await this.setState({
        imglink: 'img-var/items/' + this.state.name + '.jpg',
        qty: 0
      });
    } finally {
      this.props.updateOrder(this.state);
    }
  };

  add = async () => {
    await this.setState(prevState => {
      return {
        qty: prevState.qty + 1
      };
    });
    this.props.updateOrder(this.state);
  };
  remove = async () => {
    await this.setState(prevState => {
      if (prevState.qty > 0) {
        return {
          qty: prevState.qty - 1
        };
      }
    });
    this.props.updateOrder(this.state);
  };

  render() {
    const { type, name, price, qty, imglink } = this.state;
    const { classes } = this.props;
    return (
      <div className={type}>
        <Card profile style={{ width: '85%', margin: 'auto' }}>
          <CardHeader image>
            <img src={imglink} alt={name} />
            <div
              className={classes.coloredShadow}
              style={{
                backgroundImage: `url(${imglink})`,
                opacity: '1'
              }}
            />
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>{name}</h4>
            <h6
              className={`${classes.cardCategory} ${classes.cardDescription}`}
            >
              {Number(price).toPrecision(2)} AED
            </h6>
          </CardBody>
          <CardFooter profile className={classes.justifyContentCenter}>
            <Button onClick={this.remove} justIcon round color="white">
              <Remove style={{ color: 'red' }} />
            </Button>
            <h3 style={{ padding: '0 2vw' }} className={classes.qty}>
              {qty}
            </h3>
            <Button onClick={this.add} justIcon round color="white">
              <Add style={{ color: 'green' }} />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  order_saved: state.order.order
});

export default withStyles(cartItemStyle)(
  connect(
    mapStateToProps,
    { updateOrder }
  )(CartItem)
);

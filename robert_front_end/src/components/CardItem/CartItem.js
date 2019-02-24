import React, { Component, Fragment } from "react";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import cartItemStyle from "../../assets/jss/material-kit-pro-react/components/cartItemStyle";
import Button from "../CustomButtons/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { updateOrder } from "../../actions/order";
import customDropdownStyle from "../../assets/jss/material-kit-pro-react/components/customDropdownStyle.jsx";

export class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.item,
      qty: 0,
      imglink: ""
    };
  }
  componentDidMount() {
    this.setState({
      imglink: "img-var/items/" + this.state.name + ".jpg"
    });
  }
  add = async () => {
    const lastQty = this.state.qty;
    await this.setState({
      qty: lastQty + 1
    });
    console.log(this.state);
    this.props.updateOrder(this.state);
  };
  remove = async () => {
    const lastQty = this.state.qty;
    console.log(lastQty);
    (await lastQty) > 0
      ? this.setState({ qty: lastQty - 1 })
      : this.setState({ qty: 0 });
    this.props.updateOrder(this.state);
  };

  render() {
    const { id, type, name, price, qty, imglink } = this.state;
    const { classes } = this.props;
    return (
      <div className={type}>
        <Card profile style={{ width: "85%", margin: "auto" }}>
          <CardHeader image>
            <img src={imglink} alt={name} />
            <div
              className={classes.coloredShadow}
              style={{
                backgroundImage: `url(${imglink})`,
                opacity: "1"
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
            <Button onClick={this.remove} simple size="lg" color="danger">
              <Remove />
            </Button>
            <h3 className={classes.qty}>{qty} </h3>
            <Button onClick={this.add} simple size="lg" color="success">
              <Add />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default withStyles(cartItemStyle)(
  connect(
    null,
    { updateOrder }
  )(CartItem)
);

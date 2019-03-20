import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Refresh from '@material-ui/icons/Refresh';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Moment from 'react-moment';
import DialogTitle from '@material-ui/core/DialogTitle';
import OrderDetails from '../BannerCart/OrderDetails';

export class FormUserAddress2 extends Component {
  continue = e => {
    e.preventDefault();
    const {
      street_number,
      street,
      area,
      city,
      housing,
      counpound_building_name,
      apt_villa_nbr,
      details,
      json_geocode,
      delivery_choice,
      reception_choice,
      preference_default,
      address_default,
      phone_number,
      first_name,
      last_name
    } = this.props.values;
    const data = {
      user: {
        phone_number,
        first_name,
        last_name
      },
      default: {
        preference_default,
        address_default
      },
      ordered_item: [],
      address: {
        street_number,
        street,
        area,
        city,
        housing,
        counpound_building_name,
        apt_villa_nbr,
        details,
        json_geocode
      },
      preferences: {
        delivery_choice,
        reception_choice
      }
    };
    const orders = this.props.order.filter(order => order.qty > 0);
    let i;
    for (i in orders) {
      data.ordered_item.push({
        qty: orders[i].qty,
        id: orders[i].id
      });
    }
    console.log(orders, data);
  };
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  modifyUserDetails = () => {
    this.props.initialState();
  };

  render() {
    const { values, order, total, date, handleClose } = this.props;
    return (
      <Fragment>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={24}
            justify="space-around"
            alignItems="center"
          >
            <Grid item xs={12} sm={12}>
              <DialogContentText>
                Your order details for <Moment format="dddd Do">{date}</Moment>
              </DialogContentText>
            </Grid>
            <Grid item xs={12} sm={9}>
              <OrderDetails order={order} total={total} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                Modify?
                <Refresh />
              </Button>
            </Grid>

            <Grid item xs={12} sm={12}>
              <br />
              <DialogContentText>Your delivery details</DialogContentText>
            </Grid>
            <Grid item xs={12} sm={9}>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${values.first_name}, ${values.last_name}`}
                    secondary={`${values.phone_number}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocalShippingIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${values.street_number}, ${values.street}, ${
                      values.area
                    } / ${values.city}`}
                    secondary={`${values.housing}, ${
                      values.counpound_building_name
                    }, nbr ${values.apt_villa_nbr} / ${values.details}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`will be deliver within ${
                      values.delivery_choice
                    }, please ${values.reception_choice}`}
                    secondary={null}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                onClick={this.modifyUserDetails}
                variant="contained"
                color="secondary"
              >
                Modify?
                <Refresh />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogTitle>Payment details</DialogTitle>
        <DialogContent>
          <Button onClick={this.continue}>Confirm and pay</Button>
          <Button onClick={this.back}>Back</Button>
        </DialogContent>
      </Fragment>
    );
  }
}

export default FormUserAddress2;

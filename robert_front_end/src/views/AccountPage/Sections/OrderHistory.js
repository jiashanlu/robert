import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '../../../components/Table/Table';
import Close from '@material-ui/icons/Close';
import { connect } from 'react-redux';

const OrderHistory = props => {
  const closeIcon = <Close />;
  const { orders } = props;
  return (
    <Grid container justify="center" alignItems="center">
      <Grid xs={12} sm={12} item className="account-section">
        <Typography component="h3" variant="h3">
          Orders History
        </Typography>
        <Typography variant="h4" gutterBottom>
          Cancel/Modify your orders
        </Typography>
      </Grid>{' '}
      <br />
      <br />
      <br />
      <Grid xs={12} sm={12} item>
        <Table
          tableHead={[
            'Order',
            'Address',
            'Preferences',
            'Date',
            'Price',
            'Actions'
          ]}
          tableData={orders.map(item => [
            item.id,
            `${item.delivery_address.street_number} ${
              item.delivery_address.street
            }, ${item.delivery_address.area}`,
            `${item.delivery_preference.delivery_choice} and ${
              item.delivery_preference.reception_choice
            }`,
            item.date,
            item.id,
            closeIcon
          ])}
        />
      </Grid>
    </Grid>
  );
};
const mapStateToProps = state => ({
  orders: state.orders.orders
});

export default connect(mapStateToProps)(OrderHistory);

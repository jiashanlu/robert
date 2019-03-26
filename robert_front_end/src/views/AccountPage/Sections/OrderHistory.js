import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '../../../components/Table/Table';
import Close from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import tooltipsStyle from '../../../assets/jss/material-kit-pro-react/tooltipsStyle';
import withStyles from '@material-ui/core/styles/withStyles';
import { deleteOrder } from '../../../actions/orders';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';

const OrderHistory = props => {
  const tomorrow = moment(new Date())
    .add(1, 'days')
    .format('YYYY-MM-DD');
  const { orders, classes, deleteOrder } = props;
  const closeIcon = id => (
    <a
      href="#"
      onClick={() =>
        window.confirm(
          'Cancel the order? it will credit your Robert balance account'
        )
          ? deleteOrder(id)
          : ''
      }
    >
      <Tooltip
        title="cancel?"
        placement="bottom"
        classes={{ tooltip: classes.tooltip }}
      >
        <Close />
      </Tooltip>
    </a>
  );
  return (
    <Grid className="account-section" container alignContent="flex-start">
      <Grid xs={12} sm={12} item>
        <Typography variant="h4">Orders History</Typography>
        <Typography variant="h5" gutterBottom>
          Cancel/Modify your orders
        </Typography>
        <Divider variant="middle" light />
        <br />
        <br />
      </Grid>{' '}
      <Grid xs={12} sm={12} item>
        <Table
          tableHead={[
            'Order ID',
            'Address',
            'Preferences',
            'Date',
            'Paid',
            'Actions'
          ]}
          tableData={orders
            .map(item => [
              <Tooltip
                title={
                  <span>
                    {item.orderitem_set.map((oi, i) => (
                      <span key={oi.item.id}>
                        <span style={{ display: 'inline-block' }}>
                          {oi.qty}
                          {oi.qty > 1
                            ? ' ' + oi.item.name + 's'
                            : ' ' + oi.item.name}
                        </span>
                        {i < item.orderitem_set.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </span>
                }
                placement="right"
                classes={{ tooltip: classes.tooltip }}
              >
                <span>{item.id}</span>
              </Tooltip>,
              <Tooltip
                title={
                  <span>
                    {item.delivery_address.area}, {item.delivery_address.city}
                  </span>
                }
                placement="right"
                classes={{ tooltip: classes.tooltip }}
              >
                <span>
                  {item.delivery_address.street_number}{' '}
                  {item.delivery_address.street}
                </span>
              </Tooltip>,
              <Tooltip
                title={item.delivery_preference.reception_choice}
                placement="right"
                classes={{ tooltip: classes.tooltip }}
              >
                <span>
                  time slot : {item.delivery_preference.delivery_choice}
                </span>
              </Tooltip>,
              item.date,
              `${item.total} AED`,
              <span>{item.date === tomorrow ? closeIcon(item.id) : ''}</span>
            ])
            .sort()
            .reverse()}
        />
      </Grid>
    </Grid>
  );
};
const mapStateToProps = state => ({
  orders: state.orders.orders
});

export default connect(
  mapStateToProps,
  { deleteOrder }
)(withStyles(tooltipsStyle)(OrderHistory));

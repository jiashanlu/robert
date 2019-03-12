import React, { Fragment } from 'react';

function OrderDetails(props) {
  const { order, total } = props;
  return (
    <Fragment>
      {order.map((item, index) => (
        <b key={item.id}>
          {item.qty} {item.qty > 1 ? item.name + 's' : item.name}
          {index < order.length - 1 ? ', ' : ''}
        </b>
      ))}
      <br />
      <span>
        {total === 0 ? (
          <b>Your Cart is empty, let's have a try!</b>
        ) : (
          <span>
            Total
            <small> (before discount) : </small>
            {total} AED
          </span>
        )}
      </span>
    </Fragment>
  );
}

export default OrderDetails;

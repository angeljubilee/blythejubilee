import React from 'react';

import Grid from '../layout/grid';

const style = {

  container: {
    color: '#333'
  },

  title: {
    fontSize: '16px',
    margin: '20px 0 10px 0',
    textAlign: 'center'
  },

  detail: {
    fontSize: '16px',
    margin: '20px 0 10px 0'
  },

  total: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '20px 0 10px 0'
  }

};

function OrderSummary(props) {
  const items = props.items;
  const subtotal = items.reduce((acc, item) => {
    return acc + parseInt(item.price);
  }, 0);
  const shipping = 3.99;
  const total = subtotal + shipping;

  return (
    <Grid style={style.container}>
      <Grid.Cell>
        <Grid style={style.Container}>
          <Grid.Row>
            <p style={style.title}>
              Subtotal
            </p>
            <p style={style.detail}>
              ${subtotal.toFixed(2)}
            </p>
          </Grid.Row>
          <Grid.Row>
            <p style={style.title}>
              Shipping
            </p>
            <p style={style.detail}>
              ${shipping.toFixed(2)}
            </p>
          </Grid.Row>
          <Grid.Row>
            <p style={style.title}>
              Total
            </p>
            <p style={style.total}>
              ${total.toFixed(2)}
            </p>
          </Grid.Row>
        </Grid>
      </Grid.Cell>
    </Grid>
  );
}

export default OrderSummary;

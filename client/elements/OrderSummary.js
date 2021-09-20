import React from 'react';

import Grid from '../layout/Grid';

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

function OrderSummary(data) {
  const { items } = data;
  const subtotal = items.reduce((acc, item) => acc + parseInt(item.price, 10), 0).toFixed(2);
  const total = parseInt(subtotal + 3.99, 10).toFixed(2);
  return (
    <Grid style={style.container}>
      <Grid.Cell>
        <Grid style={style.Container}>
          <Grid.Row>
            <p style={style.title}>
              Subtotal
            </p>
            <p style={style.detail}>
              ${subtotal}
            </p>
          </Grid.Row>
          <Grid.Row>
            <p style={style.title}>
              Shipping
            </p>
            <p style={style.detail}>
              $3.99
            </p>
          </Grid.Row>
          <Grid.Row>
            <p style={style.title}>
              Total
            </p>
            <p style={style.total}>
              ${total}
            </p>
          </Grid.Row>
        </Grid>
      </Grid.Cell>
    </Grid>
  );
}

export default OrderSummary;

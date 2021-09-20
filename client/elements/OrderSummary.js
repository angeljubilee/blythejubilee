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
    fontSize: '14px',
    margin: 0
  },

  total: {
    fontSize: '14px',
    fontWeight: 'bold',
    margin: 0
  }

};

function OrderSummary(data) {
  const { items } = data;
  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal + 3.99;
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
              {total}
            </p>
          </Grid.Row>
        </Grid>
      </Grid.Cell>
    </Grid>
  );
}

export default OrderSummary;

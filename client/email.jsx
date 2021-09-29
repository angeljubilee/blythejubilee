import React from 'react';

import Grid from './layout/grid';
import Header from './elements/header';
import Title from './elements/title';
import Body from './elements/body';
import OrderItems from './elements/order-items';
import OrderSummary from './elements/order-summary';

const style = {

  container: {
    backgroundColor: '#efefef',
    padding: '20px 0',
    fontFamily: 'sans-serif'
  },

  main: {
    maxWidth: '500px',
    width: '100%'
  }

};

function Email(props) {
  return (
    <center style={style.container}>
      <Grid style={style.main}>
        <Header />
        <Body>
          <Title orderId={props.orderId} />
          <OrderItems items={props.items} />
          <OrderSummary items={props.items} />
        </Body>
      </Grid>
    </center>
  );
}

export default Email;

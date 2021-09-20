import React from 'react';

import Grid from './layout/Grid';
import Header from './elements/Header';
import Title from './elements/Title';
import Body from './elements/Body';
import OrderItems from './elements/OrderItems';
import OrderSummary from './elements/OrderSummary';

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

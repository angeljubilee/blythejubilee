import React from 'react';

import Grid from '../layout/grid';

const style = {

  wrapper: {
    width: 'auto',
    margin: '0 auto'
  },

  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '5px',
    marginBottom: '10px'
  }

};

function Title(props) {
  return (
    <Grid style={style.wrapper}>
      <h1 style={style.title} className="title-heading">
        Order #{props.orderId}
      </h1>
    </Grid>
  );
}

export default Title;

import React from 'react';

import Grid from '../layout/grid';

const style = {

  header: {
    margin: '10px auto 20px auto',
    width: 'auto',
    fontSize: '24px',
    color: '#f95263'
  }

};

function Header() {
  return (
    <Grid style={style.header}>
      <h1>BlytheJubilee Order Confirmation</h1>
    </Grid>
  );
}

export default Header;

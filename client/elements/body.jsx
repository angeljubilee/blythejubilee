import React from 'react';

import Grid from '../layout/grid';

const style = {

  content: {
    backgroundColor: 'white',
    padding: '20px'
  }

};

function Body(data) {
  const { children } = data;
  return (
    <Grid>
      <Grid.Cell style={style.content}>
        {children}
      </Grid.Cell>
    </Grid>
  );
}

export default Body;

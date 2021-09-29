import React from 'react';

import Grid from '../layout/Grid';
import Img from './Img';

const style = {

  container: {
    color: '#333'
  },

  title: {
    fontSize: '16px',
    margin: '20px 0 10px 0',
    textAlign: 'center'
  },

  itemsContainer: {
    margin: '0 auto',
    width: 'auto'
  },

  itemContainer: {
    marginBottom: '10px',
    width: 'auto'
  },

  itemIcon: {
    width: '32px',
    height: '32px',
    marginRight: '20px'
  },

  itemBody: {
    maxWidth: '280px'
  },

  itemTitle: {
    fontSize: '18px',
    margin: '3px 0 2px 0'
  },

  itemDetail: {
    fontSize: '14px',
    margin: 0
  },

  itemPrice: {
    fontSize: '14px',
    fontWeight: 'bold',
    margin: 0
  }

};

function Icon(props) {
  return (
    <Img
      style={props.style}
      src={props.url}
    />
  );
}

function OrderItems(props) {
  return (
    <Grid style={style.container}>
      <Grid.Cell>
        <Grid style={style.itemsContainer}>
          {props.items.map(item => (
            <Grid style={style.itemContainer} key={item.itemId}>
              <Grid.Row>
                <Icon style={style.itemIcon} url={item.url} />
                <Grid style={style.itemBody}>
                  <p style={style.itemTitle}>
                    {item.title}
                  </p>
                  <p style={style.itemDetail}>
                    Qty {item.qty}
                  </p>
                  <Grid>
                    <p style={style.itemPrice}>
                      ${item.price}
                    </p>
                  </Grid>
                </Grid>
              </Grid.Row>
            </Grid>
          ))}
        </Grid>
      </Grid.Cell>
    </Grid>
  );
}

export default OrderItems;

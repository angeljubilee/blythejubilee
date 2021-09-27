import React from 'react';
import ErrorMessage from '../components/error-message';
import LoadingSpinner from '../components/loading-spinner';

export default function StockItems(props) {

  if (props.state.error) {
    <ErrorMessage msg="Connection error" />;
  }

  if (!props.state.loading && !props.state.item) {
    return (<div>No items in the shop.</div>);
  }

  const itemList = props.stock.items.map(item => {
    return (
      <li key={item.itemId}>
        <div className="hide-on-med-and-up">
          <div className="col s12">
            <div className="card horizontal">
              <div className="card-image col s4">
                <img src={item.url} />
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <section>
                    <h6>{item.title.slice(0, 35)}...</h6>
                    <div>
                      In Stock: {item.numInStock}
                      <div className="darkpink-text">
                        ${item.price}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hide-on-small-only">
          <div className="container">
            <div className="col m3">
              <div className="card medium">
                <div className="card-image">
                  <img src={item.url} />
                </div>
                <div className="card-content">
                  <section>
                    <p>{item.title.slice(0, 40)}...</p>
                    <div>
                      In Stock: {item.numInStock}
                      <div className="darkpink-text">
                        ${item.price}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>);
  });

  return (
    props.stock.loading
      ? <LoadingSpinner />
      : <div className="container">
          <div className="row">
            <div className="col s8">
              <h5>Shop Items</h5>
            </div>
            <div className="col s1 right">
              <a href="#addStock">
                <h6><i className="material-icons">add</i></h6>
              </a>
            </div>
          </div>
          <ul className="row">
            {itemList}
          </ul>
        </div>
  );
}

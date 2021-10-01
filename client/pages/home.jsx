import React from 'react';
import ErrorMessage from '../components/error-message';
import LoadingSpinner from '../components/loading-spinner';

export default function Home(props) {

  if (props.stock.error) {
    return <ErrorMessage msg="Connection error" />;
  }

  if (!props.stock.loading && !props.stock.items.length) {
    return <ErrorMessage msg="No items in the shop" />;
  }

  const itemList = props.stock.items.map(item => {
    return (
      <li key={item.itemId}>
        <div className="hide-on-med-and-up">
          <div className="col s6">
            <a href={`#items?itemId=${item.itemId}`} >
              <div className="card small">
                <div className="card-image">
                  <img src={item.url} />
                </div>
                <div className="card-stacked">
                  <div className="card-content">
                    <section>
                      <h6>{item.title.slice(0, 39)}...</h6>
                      <div className="bold-text">
                        ${item.price}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="hide-on-small-only">
          <div className="col m6 l4">
            <a href={`#items?itemId=${item.itemId}`}>
              <div className="card large">
                <div className="card-image">
                  <img src={item.url} />
                </div>
                <div className="card-content">
                  <section>
                    <div className="row">
                      <div className="col s12">
                        <h6>{item.title.slice(0, 36)}...</h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s6 bold-text">
                        ${item.price}
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </a>
          </div>
        </div>
      </li>);
  });

  return (
    props.stock.loading
      ? <LoadingSpinner />
      : <div className="container">
          <ul className="row">
            {itemList}
          </ul>
        </div>
  );
}

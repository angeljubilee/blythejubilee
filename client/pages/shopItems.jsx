import React from 'react';

export default class ShopItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('/api/items')
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data,
          isLoading: false
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const itemList = this.state.items.map(item => {
      return (
      <li key={item.itemId}>
          <div className="hide-on-med-and-up">
        <div className="col s12 show-on-medium-and-down">
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
          </div></div>
        </div>
        <div className="hide-on-small-only">
          <div className="col m3">
            <div className="card medium">
              <div className="card-image">
                <img src={item.url} />
              </div>
              <div className="card-content">
                <section>
                  <div className="row">
                    <div className="col s12">
                      <h6>{item.title.slice(0, 54)}...</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s5">
                      In Stock: {item.numInStock}
                    </div>
                    <div className="col s6 darkpink-text">
                      ${item.price}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </li>);
    });

    return (
      this.state.isLoading
        ? <div className="preloader-wrapper active">
          <div className="spinner-layer spinner-red-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
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
}

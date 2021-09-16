import React from 'react';

export default class Cart extends React.Component {

  constructor(props) {
    super(props);
    this.handleClickClose = this.handleClickClose.bind(this);
  }

  handleClickClose(event) {
    const $li = event.target.closest('li');
    const itemId = $li.getAttribute('data-view');
    this.props.removeItem(parseInt(itemId));
  }

  render() {
    const items = this.props.cart.map(item => {
      return (
        <li key={item.itemId} data-view={item.itemId}>
          <div className="row">
            <div className="col s4">
              <img src={item.url}></img>
            </div>
            <div className="col s7">
              <div className="row">
                <div className="col s12">
                  <p>{item.title.slice(0, 40)}</p>
                </div>
              </div>
              <div className="row">
                <div className="col s12 right-align">
                  <p>${item.price}</p>
                </div>
              </div>
            </div>
            <div className="col s1">
              <span className="material-icons nav-link"
                onClick={this.handleClickClose}>
                close
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col s4">
              <p>{item.qty}</p>
            </div>
          </div>
        </li>
      );

    });

    const subtotal = this.props.cart.reduce((acc, item) => {
      return acc + parseInt(item.price);
    }, 0);

    return (
      this.props.cart.length
        ? <div className="container">
          <div className="row">
            <div className="col s12">
              <h6>Your Shopping bag</h6>
            </div>
          </div>
          <ul>
            {items}
          </ul>
          <div className="row">
            <div className="col s12">
              <p className="bold-text">Order Summary</p>
            </div>
          </div>
          <div className="row">
            <div className="col s6">
              Subtotal
            </div>
            <div className="col s6 right-align">
              ${subtotal}
            </div>
          </div>
          <div className="row">
            <div className="col s6">
              Shipping
            </div>
            <div className="col s6 right-align">
              $3.99
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <p>Order total ({this.props.cart.length} items)</p>
            </div>
          </div>
          <div>
            <button>Login to checkout</button>
          </div>
          <div>
            <button color="yellow">Checkout as Guest</button>
          </div>
        </div>
        : <div className="container">
         <div className="col s12">
           No items in your cart.
         </div>
       </div>
    );
  }
}

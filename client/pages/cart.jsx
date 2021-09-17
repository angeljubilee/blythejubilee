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
          <div className="hide-on-med-and-up">
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
              <div className="col s4 m2">
                <p>Qty {item.qty}</p>
              </div>
            </div>
          </div>
          <div className="hide-on-small-only">
              <div className="card horizontal">
                <div className="card-image col s2">
                  <img src={item.url}></img>
                </div>
                <div className="card-stacked">
                  <div className="card-content">
                    <div className="row">
                      <div className="col s8">
                        <p>{item.title}</p>
                      </div>
                      <div className="col s2">
                        <p>Qty {item.qty}</p>
                      </div>
                      <div className="col s2">
                        <p>${item.price}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col s1">
                        <a href="#cart"
                           onClick={this.handleClickClose}>
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
      );

    });

    const subtotal = this.props.cart.reduce((acc, item) => {
      return acc + parseInt(item.price);
    }, 0);
    const shipping = 3.99;
    const total = (subtotal + shipping).toFixed(2);

    return (
      this.props.cart.length
        ? <>
          <div className="container hide-on-small-only">
            <div className="row">
              <h5 className="bold-text">Your Shopping bag</h5>
            </div>
            <div className="row">
              <div className="col s8">
                <ul>
                  {items}
                </ul>
              </div>
              <div className="col s1"></div>
              <div className="col s3">
                <h6 className="bold-text">Order Summary</h6>
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
                    ${shipping}
                  </div>
                </div>
                <div className="row">
                  <div className="col s6 bold-text">
                    <p>Order total ({this.props.cart.length} items)</p>
                  </div>
                  <div className="col s6 right-align">
                    <p className="bold-text">${total}</p>
                  </div>
                </div>
                <button className="float-right">Login to checkout</button>
                <button className="orange float-right margin-top-1">Checkout as Guest</button>
              </div>
            </div>
          </div>
          <div className="container hide-on-med-and-up">
            <div className="row">
              <div className="col s12">
                <h5 className="bold-text">Your Shopping bag</h5>
              </div>
            </div>
            <ul>
              {items}
            </ul>
            <div className="row">
              <h6 className="bold-text">Order Summary</h6>
            </div>
            <div className="col s12">
              <div className="row">
                <div className="col s6">
                 Subtotal
                </div>
                <div className="col s6 right-align">
                  ${subtotal}
                </div>
              </div>
            </div>
            <div className="col s12">
              <div className="row">
                <div className="col s6 ">
                  Subtotal
                </div>
                <div className="col s6 right-align">
                  ${subtotal}
                </div>
            </div>
            <div className="col s12">
              <div className="col s4 row">
                <div className="col s6">
                  Shipping
                </div>
                <div className="col s6 right-align">
                  ${shipping}
                </div>
              </div>
            </div>
            <div className="col s12">
              <div className="col s4 row">
                <div className="col s6 bold-text">
                  <p>Order total ({this.props.cart.length} items)</p>
                </div>
                <div className="col s6 right-align">
                  <p className="bold-text">${total}</p>
                </div>
              </div>
            </div>
            <button className="float-right">Login to checkout</button>
            <button className="orange float-right">Checkout as Guest</button>
          </div>
        </div>
        </>
        : <div className="container">
         <div className="col s12">
           No items in your cart.
         </div>
       </div>
    );
  }
}

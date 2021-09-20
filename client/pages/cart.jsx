import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PaypalButton from '../components/paypal';
import Email from '../email';
import axios from 'axios';

const styles = {
  show: {
    display: 'block'
  },
  hide: {
    display: 'none'
  }
};

export default class Cart extends React.Component {

  constructor(props) {
    super(props);
    this.handleClickClose = this.handleClickClose.bind(this);
    this.guestCheckout = this.guestCheckout.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.state = { showPaypal: false };
  }

  handleClickClose(event) {
    const $li = event.target.closest('li');
    const itemId = $li.getAttribute('data-view');
    this.props.removeItem(parseInt(itemId));
  }

  guestCheckout(event) {
    this.setState({ showPaypal: true });
  }

  handleOrder(id, name, email) {

    const items = this.props.cart;
    const newOrder = {
      transactionId: id,
      userId: 1,
      items: items
    };

    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOrder)
    })
      .then(res => res.json())
      .then(data => {
        const orderId = data.orderId;
        const emailElement = React.createElement(Email, { orderId, items });
        const content = ReactDOMServer.renderToStaticMarkup(emailElement);

        axios({
          method: 'POST',
          url: 'http://localhost:3001/send',
          data: {
            name: this.state.name,
            email: this.state.email,
            orderId: orderId,
            html: content
          }
        }).then(res => {
          if (res.data.msg === 'success') {
            this.resetForm();
          } else if (res.data.msg === 'fail') {
            console.error('Failed to send confirmation email');
          }
        });

        window.location.hash = `order?orderId=${data.orderId}`;
      });

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

    const checkinStyle = this.state.showPaypal ? styles.hide : styles.display;
    const paypalStyle = this.state.showPaypal ? styles.display : styles.hide;

    return (
      this.props.cart.length
        ? <>
          <div className="container">
            <div className="row">
              <div className="col s12">
                <h5 className="bold-text">Your Shopping bag</h5>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m8">
                <ul>
                  {items}
                </ul>
              </div>
              <div className="col m1"></div>
              <div className="col s12 m3">
                <div className="row">
                  <h6 className="bold-text">Order Summary</h6>
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
                  <div className="col s6 ">
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
                <div className="row">
                  <div className="col s12 m9 right" style={checkinStyle}>
                    <button>Login to checkout</button>
                    <button className="orange margin-top-1" onClick={this.guestCheckout}>
                      Checkout as Guest
                    </button>
                  </div>
                </div>
                <div style={paypalStyle}>
                  <PaypalButton numItems={this.props.cart.length}
                    total={total}
                    newOrder={this.handleOrder}/>
                </div>
              </div>
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

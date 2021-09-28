import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PaypalButton from '../components/paypal';
import CartItem from '../components/cartItem';
import Email from '../email';
import LoadingSpinner from '../components/loading-spinner';
import ErrorMessage from '../components/error-message';

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
    this.handleError = this.handleError.bind(this);

    this.state = {
      showPaypal: false,
      loading: false,
      error: false
    };
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
    this.setState({ loading: true });

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
        const content = ReactDOMServer.renderToStaticMarkup(<Email orderId={orderId} items={items}/>);

        const emailData = {
          name: name,
          email: email,
          orderId: orderId,
          html: content
        };
        fetch('/api/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailData)
        }).then(res => res.json())
          .then(msgStatus => {
            if (msgStatus.msg === 'success') {
              this.setState({ loading: false });
              this.props.resetCart();
            } else if (msgStatus.msg === 'fail') {
              console.error('Failed to send confirmation email');
            }
            window.location.hash = `order?orderId=${data.orderId}`;
          })
          .catch(err => {
            console.error(err);
            this.setState({ error: true });
          });
      })
      .catch(err => {
        console.error(err);
        this.setState({ error: true });
      });
  }

  handleError() {
    this.setState({ error: true });
  }

  render() {

    const subtotal = this.props.cart.reduce((acc, item) => {
      return acc + parseInt(item.price);
    }, 0);
    const shipping = 3.99;
    const total = (subtotal + shipping).toFixed(2);

    const checkinStyle = this.state.showPaypal ? styles.hide : styles.display;
    const paypalStyle = this.state.showPaypal ? styles.display : styles.hide;

    let cartStyle;
    let loadingStyle;
    let errorStyle;

    if (this.state.error) {
      errorStyle = styles.display;
      loadingStyle = styles.hide;
      cartStyle = styles.hide;
    } else if (this.state.loading) {
      loadingStyle = styles.display;
      errorStyle = styles.hide;
      cartStyle = styles.hide;
    } else {
      cartStyle = styles.display;
      loadingStyle = styles.hide;
      errorStyle = styles.hide;
    }

    return (
      this.props.cart.length
        ? <>
            <div style={errorStyle}>
              <ErrorMessage msg='Transaction error' />
            </div>
            <div className="flex-container" style={loadingStyle}>
              <LoadingSpinner />
            </div>
            <div className="container" style={cartStyle}>
              <div className="row">
                <div className="col s12">
                  <h5 className="bold-text">Your Shopping bag</h5>
                </div>
              </div>
              <div className="row">
                <div className="col s12 l7">
                  <ul>
                    <CartItem cart={this.props.cart} handleClose={this.handleClickClose} />
                  </ul>
                </div>
                <div className="col m1"></div>
                <div className="col s12 l4">
                  <div className="row">
                    <h6 className="bold-text">Order Summary</h6>
                  </div>
                  <div className="row">
                    <div className="col s6">
                      Subtotal
                    </div>
                    <div className="col s6 right-align">
                      ${subtotal.toFixed(2)}
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
                    <div className="col s8">
                      <h6 className="bold-text">Order total ({this.props.cart.length} items)</h6>
                    </div>
                    <div className="col s4 right-align">
                      <h6 className="bold-text">${total}</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12" style={checkinStyle}>
                      <button className="payment-button">Login to checkout</button>
                      <button className="payment-button orange"
                        onClick={this.guestCheckout}>
                        Checkout as Guest
                      </button>
                    </div>
                  </div>
                  <div style={paypalStyle}>
                    <PaypalButton numItems={this.props.cart.length}
                      total={total}
                      newOrder={this.handleOrder}
                      error={this.handleError} />
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

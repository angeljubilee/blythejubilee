import React from 'react';
import ReactDOM from 'react-dom';

const PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM });

export default class PaypalButton extends React.Component {
  createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          description: 'Etsy shop items',
          amount: {
            currency_code: 'USD',
            value: this.props.total
          }
        }
      ]
    });
  }

  onApprove(data, actions) {
    return actions.order.capture().then(details => {
      const { orderID } = data;
      const { name, email } = details.payer;
      this.props.newOrder(orderID, name, email);
      this.setState({ paid: true });
    });
  }

  render() {
    return (
      <PayPalButton
        createOrder={(data, actions) => this.createOrder(data, actions)}
        onApprove={(data, actions) => this.onApprove(data, actions)}
      />
    );
  }
}

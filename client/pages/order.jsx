import React from 'react';

export default function Order(props) {
  return (
    <div className="container margin-top-1">
      <div className="row">
        <div className="col m3"></div>
        <div className="col s12 m6">
          <h4 className="bold-text margin-bottom-1">Thank you for your order!</h4>
          <h5 className="bold-text margin-bottom-1">Order #: {props.orderId}</h5>
          <h6>We will contact you as soon as your package has shipped.</h6>
        </div>
        <div className="col m3"></div>
      </div>
    </div>
  );
}

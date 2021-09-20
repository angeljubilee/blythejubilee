import React from 'react';

export default function Order(props) {
  return (
    <div className="container margin-top-1">
      <div className="row">
        <div className="col s3"></div>
        <div className="col s6">
          <h3 className="bold-text margin-bottom-1">Thank you for your order!</h3>
          <h4 className="bold-text margin-bottom-1">Order #: {props.orderId}</h4>
          <h5>We will contact you as soon as your package has shipped.</h5>
        </div>
        <div className="col s3"></div>
      </div>
    </div>
  );
}

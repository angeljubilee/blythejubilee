import React from 'react';

export default function CartItem(props) {

  const items = props.cart.map((item, index) => {
    return (
      <li key={index} data-view={index}>
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
                <div className="col s12">
                  <Variations item={item} />
                </div>
              </div>
            </div>
            <div className="col s1">
              <span className="material-icons nav-link"
                onClick={props.handleClickClose}>
                close
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col s9">
              <p>Qty {item.qty}</p>
            </div>
            <div className="col s3 right-align">
              <p>${item.price}</p>
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
                <div>
                  <Variations item={item} />
                </div>
                <div className="row">
                  <div className="col s1">
                    <a href="#cart"
                      onClick={props.handleClose}>
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

  return items;
}

function Variations(props) {
  const vars = [];
  for (const key in props.item.vars) {
    vars.push(
      <div key={key} className="row">
        <div className="col s3 l2">{key[0].toUpperCase() + key.slice(1)}</div>
        <div className="col s3 l2">{props.item.vars[key].value}</div>
      </div>
    );
  }
  return vars;
}

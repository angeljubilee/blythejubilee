import React from 'react';
import M from 'materialize-css';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.dropdown1 = React.createRef();
    this.dropdown2 = React.createRef();
  }

  componentDidMount() {
    const options = {
      inDuration: 300,
      outDuration: 300,
      hover: true,
      coverTrigger: false
    };
    M.Dropdown.init(this.dropdown2.current, options);
    M.Dropdown.init(this.dropdown1.current, options);
  }

  render() {
    return (
    <>
      <ul id="dropdown" className="dropdown-content width-10">
        <li>
          <a href="#stock" className="dark-pink-text">Stock</a>
        </li>
      </ul>
      <nav>
        <div className="nav-wrapper white">
          <a className="nav-menu hide-on-large-only dropdown-trigger dark-pink-text margin-left-1"
              href="#"
              data-target="dropdown"
              ref={this.dropdown1}>
              <span className="material-icons dark-pink-text nav-link md-48">
                menu
              </span>
          </a>
          <a href="#" className="brand-logo dark-pink-text line-height-8">
            BlytheJubilee
          </a>
          <ul className="right">
            <li className="hide-on-med-and-down">
              <a className="dropdown-trigger dark-pink-text"
                href="#stock"
                data-target="dropdown"
                ref={this.dropdown2}>
                <h6 className="nav-link">Admin Account</h6>
              </a>
            </li>
            <li>
              <a href="#cart">
                <button className="cart-num">{this.props.cartNum}</button>
                <span className="material-icons dark-pink-text nav-link md-48">
                  shopping_bag
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
    );
  }
}

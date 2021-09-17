import React from 'react';
import M from 'materialize-css';

export default class NavHeader extends React.Component {
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

    M.Dropdown.init(this.dropdown1.current, options);
    M.Dropdown.init(this.dropdown2.current, options);
  }

  render() {
    return (
    <>
      <ul id="dropdown" className="dropdown-content width-10">
        <li>
          <a href="#stock" className="darkpink-text">Stock</a>
        </li>
      </ul>
      <nav>
        <div className="nav-wrapper white">
          <a className="nav-menu hide-on-med-and-up dropdown-trigger darkpink-text margin-left-1"
              href="#!"
              data-target="dropdown"
              ref={this.dropdown1}>
              <span className="material-icons darkpink-text nav-link md-48">
                menu
              </span>
          </a>
          <a href="#" className="brand-logo darkpink-text line-height-8">
            BlytheJubilee
          </a>
          <ul className="right">
            <li className="hide-on-small-only">
              <a className="dropdown-trigger darkpink-text"
                href="#!"
                data-target="dropdown"
                ref={this.dropdown2}>
                <h6 className="nav-link">Admin Account</h6>
              </a>
            </li>
            <li>
              <a href="#cart">
                <button className="cart-num">{this.props.cartNum}</button>
                <span className="material-icons darkpink-text nav-link md-48">
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

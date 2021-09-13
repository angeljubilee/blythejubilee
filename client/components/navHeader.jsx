import React from 'react';
import M from 'materialize-css';

export default class NavHeader extends React.Component {
  componentDidMount() {
    const dropdowns = document.querySelectorAll('.dropdown-trigger');

    const options = {
      inDuration: 300,
      outDuration: 300,
      hover: true,
      coverTrigger: false
    };

    M.Dropdown.init(dropdowns, options);
  }

  render() {
    return (
    <>
      <ul id="dropdown1" className="dropdown-content width-10">
        <li>
          <a href="#stock" className="darkpink-text">Stock Item</a>
        </li>
      </ul>
      <nav>
        <div className="nav-wrapper white">
          <a className="nav-menu hide-on-med-and-up dropdown-trigger darkpink-text margin-left-1"
              href="#!"
              data-target="dropdown1">
              <span className="material-icons darkpink-text nav-link md-48">
                menu
              </span>
          </a>
          <a href="#" className="brand-logo darkpink-text line-height-8 margin-left-1">
            BlytheJubilee
          </a>
          <ul className="right">
            <li className="hide-on-small-only">
              <a className="dropdown-trigger darkpink-text"
                href="#!"
                data-target="dropdown1">
                <h6 className="nav-link">Admin Account</h6>
              </a>
            </li>
            <li>
              <span className="material-icons darkpink-text nav-link md-48">
                shopping_bag
              </span>
            </li>
          </ul>
        </div>
      </nav>
    </>
    );
  }
}

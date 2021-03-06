import React from 'react';
import M from 'materialize-css';
import LoadingSpinner from '../components/loading-spinner';
import ErrorMessage from '../components/error-message';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      item: null,
      vars: null,
      qty: 1
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.addVariation = this.addVariation.bind(this);
    this.addQuantity = this.addQuantity.bind(this);

    this.select1 = React.createRef();
  }

  componentDidMount() {
    fetch(`/api/items/${this.props.itemId}`)
      .then(res => res.json())
      .then(item => {
        const defaultVars = { };
        for (const key in item.vars) {
          defaultVars[key] = item.vars[key][0];
        }
        this.setState({
          vars: defaultVars,
          loading: false
        });
        this.setState({ item });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: true });
      });
    this.setState({ loading: true });
  }

  componentDidUpdate() {
    if (this.select1.current) {
      M.FormSelect.init(this.select1.current);
    }
  }

  addQuantity(event) {
    this.setState({ qty: event.target.value });
  }

  addVariation(event) {
    const variation = this.state.item.vars[event.target.name].find(v => v.varId === parseInt(event.target.value));
    const newVars = { ...this.state.vars };
    newVars[event.target.name] = variation;
    this.setState({ vars: newVars });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { itemId, url, title, price, numInStock } = this.state.item;
    const { qty, vars } = this.state;
    this.props.addToCart({ itemId, url, title, price, numInStock, qty, vars });

  }

  render() {
    if (this.state.error) {
      return <ErrorMessage msg="Connection error" />;
    }

    if (this.state.loading) {
      return <LoadingSpinner />;
    }

    if (!this.state.item) {
      return <ErrorMessage msg="Product not found" />;
    }

    const opts = {};
    for (const key in this.state.item.vars) {
      const opt = this.state.item.vars[key].map((variation, index) => {
        const { value, varId } = variation;
        return (
          <div className="col s4 l3" key={index}>
            <label>
              <input name={key}
                type="radio"
                value={varId}
                checked={value === this.state.vars[key].value}
                onChange={this.addVariation} />
              <span>{value}</span>
            </label>
          </div>
        );
      });
      opts[key] = opt;
    }

    const variations = [];
    for (const key in this.state.item.vars) {
      variations.push(
        <div className="row" key={key}>
          <div className="col s12">
            <p className="label">{key}</p>
            <div className="row">
              {opts[key]}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="product-details margin-top-1">
        <div className="row">
          <div className="col l1"></div>
          <div className="col s12 l4">
            <img src={this.state.item.url}></img>
          </div>
          <div className="col l1"></div>
          <div className="col s12 l5">
            <form className="no-autoinit margin-left-1" onSubmit={this.handleSubmit}>
              <h6>{this.state.item.title}</h6>
              <h6>{this.state.item.price}</h6>
              {variations}
              <div className="row">
                <div className="col s4 l4">
                  <label>Qty</label>
                  <select ref={this.select1} onChange={this.addQuantity} className="qty-input">
                    <QtyOptions num={this.state.item.numInStock} />
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col s11 hide-on-large-only">
                  <button>Add to Cart</button>
                </div>
                <div className="col s5 right hide-on-med-and-down">
                  <button>Add to Cart</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col l1"></div>
        </div>
      </div>
    );
  }
}

function QtyOptions(props) {
  const options = [];
  for (let i = 1; i <= props.num; i++) {
    options.push(<option value={i} key={i}>{i}</option>);
  }
  return options;
}

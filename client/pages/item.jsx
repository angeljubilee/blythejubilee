import React from 'react';
import M from 'materialize-css';

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      vars: null,
      qty: 1
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.addVariation = this.addVariation.bind(this);
    this.addQuantity = this.addQuantity.bind(this);

    this.select = React.createRef();
  }

  componentDidMount() {
    fetch(`/api/items/${this.props.itemId}`)
      .then(res => res.json())
      .then(item => this.setState({ item }));
  }

  componentDidUpdate() {
    if (this.select.current) {
      M.FormSelect.init(this.select.current);
    }
  }

  addQuantity(event) {
    this.setState({ qty: event.target.value });
  }

  addVariation(event) {
    const newVars = { ...this.state.vars };
    newVars[event.target.name] = event.target.value;
    this.setState({ vars: newVars });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { itemId, url, title, price } = this.state.item;
    const { qty, vars } = this.state;
    this.props.addToCart({ itemId, url, title, price, qty, vars });

  }

  render() {
    if (!this.state.item) {
      return <div>Product not found</div>;
    }

    return (
      <>
        <div className="container-max-70">
          <img className="img-1-4" src={this.state.item.url}></img>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="col s12">
                <h6>{this.state.item.title.slice(0, 38)}...</h6>
                <h6>{this.state.item.price}</h6>
              </div>
            </div>
            <Variations vars={this.state.item.vars} addVariation={this.addVariation}/>
            <div className="row">
              <div className="input-field col s4 m2">
                <select ref={this.select} onChange={this.addQuantity}>
                  <QtyOptions num={this.state.item.numInStock} />
                </select>
              <label>Qty</label>
              </div>
            </div>
          </div>
          <div className="container-max-70">
            <button type="submit" className="float-right">Add to Cart</button>
          </div>
        </form>
      </>
    );
  }
}

function Variations(props) {
  const variations = [];
  let key;
  for (key in props.vars) {
    variations.push(
      <div className="row" key={key}>
        <div className="col s12">
          <p className="label">{key}</p>
          <div className="row">
            <VarOptions name={key} options={props.vars[key]} addVariation={props.addVariation} />
          </div>
        </div>
      </div>
    );
  }
  return variations;

}

function VarOptions(props) {
  const options = props.options.map((variation, index) => {
    return (
      <div className="col s4 m1" key={index}>
        <label>
          <input name={props.name} type="radio" value={variation.varId}
            onChange={props.addVariation}/>
          <span>{variation.value}</span>
        </label>
      </div>

    );
  });
  return options;
}

function QtyOptions(props) {
  const options = [];
  for (let i = 1; i <= props.num; i++) {
    options.push(<option value={i} key={i}>{i}</option>);
  }
  return options;
}

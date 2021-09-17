import React from 'react';
import M from 'materialize-css';

export default class QtyInput extends React.Component {
  constructor(props) {
    super(props);
    this.select = React.createRef();
  }

  componentDidMount() {
    M.FormSelect.init(this.select.current);
  }

  render() {
    return (
      <select name="qty" ref={this.select} onChange={this.addQuantity}>
        <QtyOptions num={this.props.item.numInStock} selected={this.props.item.qty} />
      </select>
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

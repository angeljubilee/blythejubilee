import React from 'react';
import AddPhoto from '../components/addPhoto';

export default class AddItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmitPhoto = this.handleSubmitPhoto.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleNumInStockChange = this.handleNumInStockChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSize = this.handleSize.bind(this);
    this.addSize = this.addSize.bind(this);

    this.state = {
      title: '',
      description: '',
      url: '',
      price: '',
      numInStock: '',
      size: '',
      sizeList: []
    };
  }

  handleSubmitPhoto(event) {
    const $form = event.target.closest('form');
    const form = new FormData($form);
    fetch('/api/uploads', {
      method: 'POST',
      body: form
    })
      .then(res => res.json())
      .then(result => {
        const path = `.${result.url}`;
        this.setState({ url: path });
      });
  }

  handleSubmit(event) {
    const newItem = {
      title: this.state.title,
      description: this.state.description,
      url: this.state.url,
      price: this.state.price,
      numInStock: this.state.numInStock,
      sizeList: this.state.sizeList
    };

    fetch('/api/items/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    });

    event.target.reset();
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handlePriceChange(event) {
    this.setState({ price: event.target.value });
  }

  handleNumInStockChange(event) {
    this.setState({ numInStock: event.target.value });
  }

  handleSize(event) {
    this.setState({ size: event.target.value });
  }

  addSize(event) {
    this.setState({
      sizeList: [...this.state.sizeList, this.state.size],
      size: ''
    });
  }

  render() {
    const chips = this.state.sizeList.map((size, index) => {
      return <div className="chip" key={index}>{size}</div>;
    });

    return (
      <>
        <div className="container-max-70">
          <AddPhoto url={this.state.url}
            onChange={this.handleSubmitPhoto} />
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="container margin-top-1">
            <div className="row">
              <div className="col s12">
                <h6>Title</h6>
                <input type="text"
                  value={this.state.title}
                  onChange={this.handleTitleChange} />
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <h6>Description</h6>
                <textarea
                  value={this.state.description}
                  onChange={this.handleDescriptionChange}
                  className="margin-top-1"/>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <h6>Size</h6>
                <div className="row flex-center">
                  <div className="col s2 m1">
                    <input type="text"
                      value={this.state.size}
                      onChange={this.handleSize} />
                  </div>
                  <span className="material-icons plus-icon"
                    onClick={this.addSize}>
                    add
                  </span>
                </div>
                {this.state.sizeList.length
                  ? <div className="row">
                      <div className="col s12">
                        <div className="row">{chips}</div>
                      </div>
                    </div>
                  : <div></div>
                }
              </div>
            </div>
            <div className="row">
              <div className="col s2 m1">
                <h6>Price</h6>
                <input type="text"
                  value={this.state.price}
                  onChange={this.handlePriceChange} />
              </div>
            </div>
            <div className="row">
              <div className="col s2 m1">
                <h6>Qty</h6>
                <input type="text"
                  value={this.state.numInStock}
                  onChange={this.handleNumInStockChange} />
              </div>
            </div>
          </div>
          <div className="container-max-70">
            <button
              type="submit"
              name="action"
              className="margin-bottom-1">
              Save
            </button>
          </div>
        </form>
      </>
    );
  }
}

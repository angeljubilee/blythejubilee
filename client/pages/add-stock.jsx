import React from 'react';
import ErrorMessage from '../components/error-message';
import LoadingSpinner from '../components/loading-spinner';

export default class AddItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmitPhoto = this.handleSubmitPhoto.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addSize = this.addSize.bind(this);

    this.state = {
      title: '',
      description: '',
      url: '',
      price: '',
      numInStock: '',
      size: '',
      sizeList: [],
      loading: false,
      error: false
    };
  }

  handleSubmitPhoto(event) {
    event.preventDefault();
    const $form = event.target.closest('form');
    const form = new FormData($form);
    fetch('/api/uploads', {
      method: 'POST',
      body: form
    })
      .then(res => res.json())
      .then(result => {
        const url = `${result.url}`;
        this.setState({
          url: url,
          loading: false
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ error: true });
      });
    this.setState({ loading: true });
  }

  handleSubmit(event) {
    event.preventDefault();

    const price = parseInt(this.state.price).toFixed(2);

    const newItem = {
      title: this.state.title,
      description: this.state.description,
      url: this.state.url,
      price: price,
      numInStock: this.state.numInStock,
      sizeList: this.state.sizeList
    };

    fetch('/api/items/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })
      .then(res => res.json())
      .then(data => {
        this.props.handleNewItem(data);

        this.setState({
          title: '',
          description: '',
          url: '',
          price: '',
          numInStock: '',
          size: '',
          sizeList: []
        });
        window.location.hash = 'stock';
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  addSize(event) {
    if (this.state.size.length) {
      this.setState({
        sizeList: [...this.state.sizeList, this.state.size],
        size: ''
      });
    }
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage msg="Error loading photo" />;
    }

    const chips = this.state.sizeList.map((size, index) => {
      return <div className="chip" key={index}>{size}</div>;
    });

    return (
      <>
        <div className="container-max-70">
          {this.state.url
            ? <div className="card">
                <img src={this.state.url}></img>
              </div>
            : this.state.loading
              ? <LoadingSpinner />
              : <div className="flex-container box millennial-pink">
                  <form className="no-autoinit">
                    <label htmlFor="image" className="center-align">
                      <div className="add-photo">
                        <span className="material-icons white-text">
                          photo_camera
                        </span>
                        <h6 className="white-text">Add Photo</h6>
                      </div>
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      className="visually-hidden"
                      onChange={this.handleSubmitPhoto}
                    />
                  </form>
                </div>
         }
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="container margin-top-1">
            <div className="row">
              <div className="col s12">
                <h6>Title</h6>
                <input type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleInputChange} required />
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <h6>Description</h6>
                <textarea
                  name="description"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                  className="margin-top-1" required/>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <h6>Size</h6>
                <div className="row flex-center">
                  <div className="col s3 m2">
                    <input type="text"
                      name="size"
                      value={this.state.size}
                      onChange={this.handleInputChange} />
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
              <div className="col s3 m2">
                <h6>Price</h6>
                <input type="number"
                  name="price"
                  value={this.state.price}
                  onChange={this.handleInputChange}
                  required/>
              </div>
            </div>
            <div className="row">
              <div className="col s3 m2">
                <h6>Qty</h6>
                <input type="number"
                  name="numInStock"
                  value={this.state.numInStock}
                  onChange={this.handleInputChange}
                  required/>
              </div>
            </div>
          </div>
          <div className="container-max-70">
            <button
              type="submit"
              className="margin-bottom-1">
              Save
            </button>
          </div>
        </form>
      </>
    );
  }
}

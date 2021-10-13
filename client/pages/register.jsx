import React from 'react';
import Redirect from '../components/redirect';

export default class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      rePassword: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/auth/sign-up', req)
      .then(res => res.json())
      .then(result => {
        window.location.hash = 'sign-in';
      });
  }

  render() {
    if (this.props.user) return <Redirect to="" />;

    return (
      <div className="container">
        <h6>Sign Up Now</h6>
        <form className="row">
          <div className="col s12">
            <label htmlFor="email">
              Email Address
            </label>
            <input
              required
              autoFocus
              id="email"
              type="email"
              name="email"
              onChange={this.handleChange} />
          </div>
          <div className="col s12">
            <label htmlFor="firstName">
              First Name
            </label>
            <input
              required
              autoFocus
              id="firstName"
              type="text"
              name="firstName"
              onChange={this.handleChange} />
          </div>
          <div className="col s12">
            <label htmlFor="lastName">
              Last Name
            </label>
            <input
              required
              autoFocus
              id="lastName"
              type="text"
              name="lastName"
              onChange={this.handleChange} />
          </div>
          <div className="col s12">
            <label htmlFor="password">
              Password
            </label>
            <input
              required
              autoFocus
              id="password"
              name="password"
              onChange={this.handleChange} />
          </div>
          <div className="col s12">
            <label htmlFor="rePassword">
              Password
            </label>
            <input
              required
              autoFocus
              id="password"
              name="password"
              onChange={this.handleChange} />
          </div>
          <button>Register</button>
        </form>
      </div>
    );
  }
}

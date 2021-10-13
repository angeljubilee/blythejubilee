import React from 'react';

export default class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleRegister(event) {
    window.location.hash = '#register';
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
    fetch('/api/auth/sign-in', req)
      .then(res => res.json())
      .then(result => {
        this.props.onSignIn(result);
      });
  }

  render() {
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
          <button type="submit">Sign in</button>
          <button onClick={this.handleRegister}>Register</button>
        </form>
      </div>
    );
  }
}

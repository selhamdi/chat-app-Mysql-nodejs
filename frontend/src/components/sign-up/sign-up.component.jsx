import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: ""
    };
  }
  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    const { email, password, password_confirmation } = this.state;

    if (password !== password_confirmation) {
      alert("Passwords don't match");
      return;
    }

    if (password.length < 5 || 20 < password.length) {
      alert("Passwords must be between 5 and 20 characters");
      return;
    }

    axios
      .post(
        "http://localhost:4000/api/users/signup",
        {
          email,
          password,
          password_confirmation
        },
        { withCreditential: true }
      )
      .then(res => {
        console.log("register res", res);
        alert("You have successfully registered!");
        this.props.history.push("/mail");
      })
      .catch(err => {
        console.log("register error", err);
        alert("An account already exists with this email address");
        this.setState({ email: "", password: "", password_confirmation: "" });
      });
    event.preventDefault();
  };

  render() {
    const { email, password, password_confirmation } = this.state;
    return (
      <div className="signup">
        <form onSubmit={this.handleSubmit}>
          <h2>Sign up</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            value={password_confirmation}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Register</button>
          <p>
            Already have an account?{" "}
            <Link className="link" to="/singIn">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    );
  }
}

export default SignUp;

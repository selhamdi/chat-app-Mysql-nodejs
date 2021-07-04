import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./sign-in.styles.scss";

class SignIn extends React.Component {
  // constructor est une méthode qui est utilisée pour créer et initialiser un objet 
  constructor() {
    // Il est utilisé pour appeler le constructeur de la classe parent 
    super();
    // Utilisez toujours la méthode setState() pour modifier l'objet d'état,
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    // Cette méthode est appelée déstructuration
    const { name, value } = event.target;
    // Utilisez toujours la méthode setState() pour modifier l'objet d'état
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    const { email, password } = this.state;
    axios
      .post(
        "http://localhost:4000/api/users/signin",
        {
          email,
          password
        },
        { withCreditential: true }
      )
      .then(res => {
        console.log("register res", res);
        alert("User has logged in successfully");
        this.props.history.push("/login");
        this.setState({
          email: "",
          password: ""
        });
      })
      .catch(err => {
        console.log("register error", err);
        alert("Incorrect email or passwords. Please try again!");
      });
    event.preventDefault();
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="signin">
        <form onSubmit={this.handleSubmit}>
          <h2>Sign in</h2>
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

          <button className="submit" type="submit">
            Sign In
          </button>

          <Link className="link" to="/singUp">
            Create an account
          </Link>
        </form>
      </div>
    );
  }
}

export default SignIn;

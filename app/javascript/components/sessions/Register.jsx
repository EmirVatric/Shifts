import React, { Component } from "react";
import "./register.css";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import PersonIcon from "@material-ui/icons/Person";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      name: "",
      EmailErrors: "",
      PasswordErrors: "",
      Password_confirmationErrors: "",
      NameErrors: ""
    };
  }

  handleChange(event) {
    let name =
      event.target.id.charAt(0).toUpperCase() +
      event.target.id.slice(1) +
      "Errors";
    if (name == "") {
      this.setState({
        [event.target.id]: event.target.value
      });
    } else {
      this.setState({
        [event.target.id]: event.target.value,
        [event.target.id.charAt(0).toUpperCase() +
        event.target.id.slice(1) +
        "Errors"]: ""
      });
    }
  }

  handleSumbit(e) {
    e.preventDefault();
    const url = "/api/registrations";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        registration: {
          email: this.state.email,
          name: this.state.name,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation
        }
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(response => {
        if (response.status == 500) {
          response.errors.forEach(error => {
            if (error.split(" ")[1] == "confirmation") {
              this.setState({
                Password_confirmationErrors: "Passwords did not match"
              });
            } else {
              this.setState({
                [error.split(" ")[0] + "Errors"]: error
              });
            }
          });
        } else if (response.status == "created") {
          this.props.history.push("/");
        }
      })
      .catch(e => console.log(e));
  }
  render() {
    return (
      <div>
        <Container maxWidth="sm">
          <CssBaseline />
          <div className="papper">
            <Avatar className="avatar">
              <PersonIcon />
            </Avatar>
            <Typography component="h5" variant="caption" noWrap>
              * Please create account to move forward!
            </Typography>
            <form className="form" noValidate>
              <TextField
                error={this.state.EmailErrors.length > 0 ? true : false}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={this.state.EmailErrors}
                onChange={e => this.handleChange(e)}
                autoFocus
              />
              <TextField
                error={this.state.NameErrors.length > 0 ? true : false}
                helperText={this.state.NemeErrors}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                onChange={e => this.handleChange(e)}
              />
              <TextField
                error={this.state.PasswordErrors.length > 0 ? true : false}
                helperText={this.state.PasswordErrors}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => this.handleChange(e)}
              />
              <TextField
                error={
                  this.state.Password_confirmationErrors.length > 0
                    ? true
                    : false
                }
                helperText={this.state.Password_confirmationErrors}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password_confirmation"
                label="Confirm Password"
                type="password"
                id="password_confirmation"
                autoComplete="current-password"
                onChange={e => this.handleChange(e)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
                onClick={e => this.handleSumbit(e)}
              >
                Sign Up
              </Button>
            </form>
            <Link from="/signup" to="/login" className="mt-4 w-100">
              Login
            </Link>
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter(Signup);

import React, { Component } from "react";
import "./login.css";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { loggedInStatus } from "../../actions";
import { connect } from "react-redux";
import { compose } from "redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  handleChange(event) {
    if (this.state.error.length > 0) {
      this.setState({
        [event.target.id]: event.target.value,
        error: ""
      });
    } else {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  }

  handleSumbit(e) {
    e.preventDefault();
    const url = "/api/sessions";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        session: this.state
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(response => {
        if (response.status == 401) {
          this.setState({
            error: response.errors
          });
        } else if (response.status == "created") {
          this.props.loggedIn();
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h5" variant="caption" noWrap>
              * Please login to move forward!
            </Typography>
            <form className="form" noValidate>
              <TextField
                error={this.state.error.length > 0 ? true : false}
                helperText={this.state.error}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => this.handleChange(e)}
                autoFocus
              />
              <TextField
                error={this.state.error.length > 0 ? true : false}
                helperText={this.state.error}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
                onClick={e => this.handleSumbit(e)}
              >
                Sign In
              </Button>
            </form>
            <Link from="/login" to="/signup" className="mt-4 w-100">
              Sign Up
            </Link>
          </div>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loggedIn: () => {
      dispatch(loggedInStatus());
    }
  };
};

export default compose(withRouter, connect(null, mapDispatchToProps))(Login);

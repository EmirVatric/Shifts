import React, { Component } from "react";

import { connect } from "react-redux";
import { loggedInStatus } from "../../actions/index";
import { Redirect } from "react-router";

import "../tasks/create.css";

import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { post } from "../../utils/dataTransfer";

class CreateTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      name: "",
      description: "",
      NameErrors: "",
      DescriptionErrors: ""
    };
  }

  componentDidMount() {
    this.props.loggedIn().then(res => {
      this.setState({
        redirect: !res.loggedIn
      });
    });
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
    post("/api/teams", this.state).then(response => {
      if (response.status == 500) {
        response.errors.forEach(error => {
          this.setState({
            [error.split(" ")[0] + "Errors"]: error
          });
        });
      } else if (response.status == "created") {
        this.props.history.push(`/teams`);
      }
    });
  }

  render() {
    if (this.state.redirect) return <Redirect to="/login" />;
    return (
      <div>
        <Container maxWidth="sm">
          <CssBaseline />
          <div className="papper">
            <Avatar className="avatar">
              <AddIcon />
            </Avatar>
            <Typography component="h5" variant="caption" noWrap>
              * Please provide team informations!
            </Typography>
            <form className="form" noValidate>
              <TextField
                error={this.state.NameErrors.length > 0 ? true : false}
                helperText={this.state.NameErrors}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Team Name"
                name="name"
                autoComplete="name"
                onChange={e => this.handleChange(e)}
                autoFocus
              />
              <TextField
                error={this.state.DescriptionErrors.length > 0 ? true : false}
                helperText={this.state.DescriptionErrors}
                variant="outlined"
                margin="normal"
                fullWidth
                className="mt-0"
                id="description"
                label="Team Description"
                name="description"
                autoComplete="description"
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
                Create New Team
              </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loggedIn: () => {
      return dispatch(loggedInStatus());
    }
  };
};

export default connect(null, mapDispatchToProps)(CreateTeam);

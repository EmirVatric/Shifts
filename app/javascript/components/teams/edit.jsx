import React, { Component } from "react";
import { Redirect } from "react-router";

import { connect } from "react-redux";
import { loggedInStatus } from "../../actions/index";

import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

class UpdateTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      name: "",
      creator: "",
      description: "",
      NameErrors: "",
      DescriptionErrors: ""
    };
  }

  componentDidMount() {
    this.props
      .loggedIn()
      .then(res => {
        this.setState({
          redirect: !res.loggedIn
        });
      })
      .then(() => {
        const { name, description, creator } = this.props.location.state.team;

        this.setState({
          name,
          description,
          creator
        });
      })
      .then(() => {
        if (this.state.creator !== this.props.name) {
          this.props.history.push(`/`);
        }
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

    const url = `/api/teams/${this.props.location.state.team.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        team: this.state
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
            this.setState({
              [error.split(" ")[0] + "Errors"]: error
            });
          });
        } else if (response.status == 200) {
          this.props.history.push(`/teams`);
        }
      })
      .catch(e => console.log(e));
  }

  handleDelete(e) {
    e.preventDefault();

    let url = `/api/teams/${this.props.location.state.team.id}`;
    fetch(url, {
      method: "DELETE"
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(response => {
        this.props.history.push(`/teams`);
      })
      .catch(err => console.log(err));
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
                value={this.state.name}
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
                value={this.state.description}
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
                Submit
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className="submit"
                onClick={e => this.handleDelete(e)}
              >
                Delete Team
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

function mapStateToProps(state) {
  const { name } = state;
  return { name: name };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTeam);

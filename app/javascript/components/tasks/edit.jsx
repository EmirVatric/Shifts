import React, { Component } from "react";
import { Redirect } from "react-router";
import "./create.css";

import { connect } from "react-redux";
import { loggedInStatus } from "../../actions/index";

import EditIcon from "@material-ui/icons/Edit";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";

class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      TitleErrors: "",
      DescriptionErrors: "",
      description: "",
      DateErrors: "",
      start_time: new Date(),
      end_time: new Date(),
      redirect: false,
      TitleErrors: "",
      DescriptionErrors: "",
      DateErrors: ""
    };
  }

  componentDidMount() {
    this.props.loggedIn().then(res => {
      this.setState({
        redirect: !res.loggedIn
      });
    });

    const {
      title,
      description,
      start_time,
      end_time
    } = this.props.location.state.task;
    this.setState({
      title,
      description,
      start_time,
      end_time
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

  handleStartDateChange(event) {
    if (this.state.DateErrors == "") {
      this.setState({
        start_time: event
      });
    } else {
      this.state.DateErrors = "";
      this.setState({
        start_time: event
      });
    }
  }
  handleEndDateChange(event) {
    this.setState({
      end_time: event
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const url = `/api/tasks/${this.props.location.state.task.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task: this.state
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
            if (error.split(" ")[1] == "time") {
              this.setState({
                DateErrors: error
              });
            } else {
              this.setState({
                [error.split(" ")[0] + "Errors"]: error
              });
            }
          });
        } else if (response.status == 200) {
          this.props.history.push(`/task/${this.props.location.state.task.id}`);
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.redirect) return <Redirect to="/login" />;

    const options = {
      month: "short",
      day: "numeric",
      year: "2-digit",
      hour: "numeric",
      minute: "numeric"
    };
    return (
      <div>
        <Container maxWidth="sm">
          <CssBaseline />
          <div className="papper">
            <Avatar className="avatar">
              <EditIcon />
            </Avatar>
            <Typography component="h5" variant="caption" noWrap>
              * Please provide task informations!
            </Typography>
            <form className="form" noValidate>
              <TextField
                error={this.state.TitleErrors.length > 0 ? true : false}
                helperText={this.state.TitleErrors}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={this.state.title}
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                onChange={e => this.handleChange(e)}
              />
              <TextField
                error={this.state.DescriptionErrors.length > 0 ? true : false}
                helperText={this.state.DescriptionErrors}
                variant="outlined"
                margin="normal"
                value={this.state.description}
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                onChange={e => this.handleChange(e)}
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  error={this.state.DateErrors.length > 0 ? true : false}
                  helperText={this.state.DateErrors}
                  className="w-100 mt-3"
                  label="Start date and time"
                  inputVariant="outlined"
                  value={this.state.start_time}
                  onChange={e => this.handleStartDateChange(e)}
                />

                <DateTimePicker
                  error={this.state.DateErrors.length > 0 ? true : false}
                  helperText={this.state.DateErrors}
                  className="w-100 mt-4"
                  label="End date and time"
                  inputVariant="outlined"
                  value={this.state.end_time}
                  minDate={this.state.start_time}
                  onChange={e => this.handleEndDateChange(e)}
                />
              </MuiPickersUtilsProvider>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
                onClick={e => this.handleSubmit(e)}
              >
                Submit Changes
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

export default connect(null, mapDispatchToProps)(EditTask);

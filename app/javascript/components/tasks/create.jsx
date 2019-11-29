import React, { Component } from "react";
import { withRouter } from "react-router";
import "./create.css";

import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";

class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      TitleErrors: "",
      DescriptionErrors: "",
      description: "",
      DateErrors: "",
      start_time: new Date(),
      end_time: new Date()
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

  handleSumbit(e) {
    e.preventDefault();
    const url = "/api/tasks";
    fetch(url, {
      method: "POST",
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
              <AddIcon />
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
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                onChange={e => this.handleChange(e)}
                autoFocus
              />
              <TextField
                error={this.state.DescriptionErrors.length > 0 ? true : false}
                helperText={this.state.DescriptionErrors}
                variant="outlined"
                margin="normal"
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
                  disablePast={true}
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
                onClick={e => this.handleSumbit(e)}
              >
                Create New Task
              </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

export default withRouter(CreateTask);
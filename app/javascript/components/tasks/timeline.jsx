import React, { Component } from "react";
import "./timeline.css";

import { Redirect } from "react-router";
import { connect } from "react-redux";
import { loggedInStatus } from "../../actions/index";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import { Timeline, Event } from "react-timeline-scribble";

class TimelineTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      tasks: [],
      redirect: false
    };
  }

  getDayTasks() {
    let url = "api/timeline";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date: this.state.date
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(response => {
        this.setState({
          tasks: response.tasks
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.props.loggedIn().then(res => {
      this.setState({
        redirect: !res.loggedIn
      });
    });
    this.getDayTasks();
  }

  handleChange(event) {
    this.setState(
      {
        date: event
      },
      () => {
        this.getDayTasks();
      }
    );
  }

  render() {
    if (this.state.redirect) return <Redirect to="/login" />;
    const options = {
      hour: "numeric",
      minute: "numeric"
    };
    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            helperText={this.state.DateErrors}
            className="w-100 mb-5"
            label="Date"
            inputVariant="outlined"
            value={this.state.date}
            onChange={e => this.handleChange(e)}
          />
        </MuiPickersUtilsProvider>

        <Timeline>
          {this.state.tasks.map(task => (
            <Event
              key={task.id}
              interval={`${new Date(task.start_time).toLocaleTimeString(
                "en-US",
                options
              )} - ${new Date(task.end_time).toLocaleTimeString(
                "en-US",
                options
              )}`}
              title={task.title}
            >
              {task.description}
            </Event>
          ))}
        </Timeline>
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

export default connect(null, mapDispatchToProps)(TimelineTasks);

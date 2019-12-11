import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./timeline.css";

import { Redirect } from "react-router";
import { connect } from "react-redux";
import { loggedInStatus } from "../../actions/index";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import { Timeline, Event } from "react-timeline-scribble";
import { post } from "../../utils/dataTransfer";

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
    post("api/timeline", this.state.date).then(response => {
      this.setState({
        tasks: response.tasks
      });
    });
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
              className="timeline"
              title={task.title}
            >
              {task.description}
              <Link
                from="/timeline"
                to={`/task/${task.id}`}
                className="linkToTask"
              >
                See Task
              </Link>
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

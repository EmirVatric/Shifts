import React, { Component } from "react";
import "./timeline.css";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";

class TimelineTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      tasks: []
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
    const options = {
      hour: "numeric",
      minute: "numeric"
    };
    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils} className="mb-0">
          <DatePicker
            helperText={this.state.DateErrors}
            className="w-100 mt-3"
            label="Start date and time"
            inputVariant="outlined"
            value={this.state.date}
            onChange={e => this.handleChange(e)}
          />
        </MuiPickersUtilsProvider>

        <Timeline lineColor={"#4154B3"} className="mt-0">
          {this.state.tasks.map(task => (
            <TimelineItem
              key={task.id}
              dateText={`${new Date(task.start_time).toLocaleTimeString(
                "en-US",
                options
              )} - ${new Date(task.end_time).toLocaleTimeString(
                "en-US",
                options
              )}`}
              style={{ color: "#e86971" }}
            >
              <p className="timelineTitleSubtext">Title:</p>
              <h3 className="mb-2">{task.title}</h3>
              <p className="timelineTitleSubtext">Description:</p>
              <p className="mt-1">{task.description}</p>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    );
  }
}

export default TimelineTasks;

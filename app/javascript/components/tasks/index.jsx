import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import "./index.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const classes = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  }
});

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      completedTasks: [],
      pendingTasks: []
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex() {}

  componentDidMount() {
    const url = "/api/tasks";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(response => {
        this.setState({
          completedTasks: response.completedTasks,
          pendingTasks: response.pendingTasks
        });
      })
      .catch(e => console.log(e));
  }

  render() {
    const options = {
      month: "short",
      day: "numeric",
      year: "2-digit",
      hour: "numeric",
      minute: "numeric"
    };
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Completed" className="tab" />
            <Tab label="Pending" className="tab" />
          </Tabs>
        </AppBar>

        {this.state.value == 0 ? (
          <div className="mt-3">
            {this.state.completedTasks.map(task => (
              <Link from="/tasks" to={`/task/${task.id}`} key={task.id}>
                <Paper className="wrapperTask row mb-3">
                  <div className="col-11 pt-3 pb-3">
                    <Typography
                      variant="h6"
                      component="h6"
                      className="text-center"
                    >
                      {task.title}
                    </Typography>
                    <Typography
                      component="h5"
                      variant="caption"
                      className="text-center d-flex align-items-center justify-content-center"
                      noWrap
                    >
                      <AccessTimeIcon className="mr-2 " />
                      {new Date(task.start_time).toLocaleDateString(
                        "en-US",
                        options
                      )}{" "}
                      -{" "}
                      {new Date(task.end_time).toLocaleDateString(
                        "en-US",
                        options
                      )}
                    </Typography>
                  </div>
                  <div className="col-1 arrowTask">
                    <ArrowForwardIosIcon />
                  </div>
                </Paper>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-3">
            {this.state.pendingTasks.map(task => (
              <Link from="/tasks" to={`/task/${task.id}`} key={task.id}>
                <Paper className="wrapperTask row mb-3">
                  <div className="col-11 pt-3 pb-3">
                    <Typography
                      variant="h6"
                      component="h6"
                      className="text-center"
                    >
                      {task.title}
                    </Typography>
                    <Typography
                      component="h5"
                      variant="caption"
                      className="text-center d-flex align-items-center justify-content-center"
                      noWrap
                    >
                      <AccessTimeIcon className="mr-2 " />
                      {new Date(task.start_time).toLocaleDateString(
                        "en-US",
                        options
                      )}{" "}
                      -{" "}
                      {new Date(task.end_time).toLocaleDateString(
                        "en-US",
                        options
                      )}
                    </Typography>
                  </div>
                  <div className="col-1 arrowTask">
                    <ArrowForwardIosIcon />
                  </div>
                </Paper>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(classes)(Tasks);

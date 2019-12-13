import React, { Component } from "react";
import { withRouter, Redirect } from "react-router";
import { compose } from "redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import "./index.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loggedInStatus } from "../../actions/index";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { get } from "../../utils/dataTransfer";

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
      pendingTasks: [],
      redirect: false
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentDidMount() {
    this.props.loggedIn().then(res => {
      this.setState({
        redirect: !res.loggedIn
      });
      if (res.loggedIn) {
        get("/api/tasks").then(response => {
          let completedTasks = [];
          let pendingTasks = [];
          response.completedTasks.forEach(arr => {
            arr.forEach(task => {
              completedTasks.push(task);
            });
          });
          response.pendingTasks.forEach(arr => {
            arr.forEach(task => {
              pendingTasks.push(task);
            });
          });
          this.setState({
            completedTasks: completedTasks,
            pendingTasks: pendingTasks
          });
        });
      }
    });
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
                      component="h5"
                      variant="caption"
                      className="text-center"
                      noWrap
                    >
                      {task.team}
                    </Typography>
                    <h1 className="pageHeaderTeam">{task.title}</h1>
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
                      component="h5"
                      variant="caption"
                      className="text-center"
                      noWrap
                    >
                      {task.team}
                    </Typography>
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

const mapDispatchToProps = dispatch => {
  return {
    loggedIn: () => {
      return dispatch(loggedInStatus());
    }
  };
};

export default compose(
  withStyles(classes),
  withRouter,
  connect(null, mapDispatchToProps)
)(Tasks);

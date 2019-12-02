import React, { Component } from "react";
import "./show.css";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loggedInStatus } from "../../actions/index";
import { withRouter, Redirect } from "react-router";
import { compose } from "redux";

import AccessTimeIcon from "@material-ui/icons/AccessTime";
import TocIcon from "@material-ui/icons/Toc";
import AddIcon from "@material-ui/icons/Add";
import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";
import RemoveIcon from "@material-ui/icons/Remove";

class ShowTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      task: "",
      creator: "",
      assignees: [],
      errors: [],
      user: {},
      redirect: false
    };
  }

  addTask(event) {
    let url = `/api/assignment`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.state.task.id
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok!");
      })
      .then(response => {
        this.setState({
          assignees: response.assignees
        });
      })
      .catch(e => console.log(e));
  }

  removeTask() {
    let url = `/api/assignment`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.state.task.id
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok!");
      })
      .then(response => {
        this.setState({
          assignees: response.assignees,
          user: response.user
        });
      })
      .catch(e => console.log(e));
  }

  componentDidMount() {
    this.props.loggedIn().then(res => {
      this.setState({
        redirect: !res.loggedIn
      });
      if (res.loggedIn) {
      }
      let url = `/api/tasks/${this.props.match.params.id}`;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok!");
        })
        .then(response => {
          this.setState({
            task: response.task,
            creator: response.creator,
            assignees: response.assignees,
            user: response.user
          });
        })
        .catch(e => console.log(e));
    });
  }

  ifAssigned() {
    let result = false;
    this.state.assignees.forEach(user => {
      if (user.id === this.state.user.id) {
        result = true;
      }
    });

    return result;
  }
  render() {
    const options = {
      month: "short",
      day: "numeric",
      year: "2-digit",
      hour: "numeric",
      minute: "numeric"
    };
    if (this.state.redirect) return <Redirect to="/login" />;

    return (
      <div>
        <div className="singleTaskHeader">
          <div className="singleTaskSubtextWrapper borderTopRadius">
            <AccessTimeIcon className="singleTaskTimeAvarat" />
            <div className="dateTimeWrapperSingleTask">
              <div className="dateTimeHeader">Date & Time</div>
              <div className="dateTimeSingleTask">
                {new Date(this.state.task.start_time).toLocaleDateString(
                  "en-US",
                  options
                )}{" "}
                -{" "}
                {new Date(this.state.task.end_time).toLocaleDateString(
                  "en-US",
                  options
                )}
              </div>
            </div>
          </div>
          <div className="singleTaskSubtextWrapper">
            <TocIcon className="singleTaskTimeAvarat" />
            <div className="singleTaskTitle">
              <div className="dateTimeHeader">Title</div>
              {this.state.task.title}
            </div>
          </div>
          {this.props.name !== undefined &&
          this.props.name === this.state.creator.name ? (
            <Link
              to={{
                pathname: `/task/edit/${this.props.match.params.id}`,
                state: { task: this.state.task }
              }}
            >
              <div className="addThisTask">
                Edit task
                <EditIcon />
              </div>
            </Link>
          ) : null}
          {this.ifAssigned() ? (
            <div
              className="addThisTaskToTimeline borderBottomRadius"
              onClick={e => this.removeTask(e)}
            >
              Remove from my schedle
              <RemoveIcon />
            </div>
          ) : (
            <div
              className="addThisTaskToTimeline borderBottomRadius"
              onClick={e => this.addTask(e)}
            >
              Add to my schedule
              <AddIcon />
            </div>
          )}
        </div>

        <div className="singleTaskDescription">
          <p className="singleTaskDescriptionTitle">Description:</p>
          <p className="singleTaskDescriptionContent">
            {this.state.task.description}
          </p>
        </div>

        <div className="singleTaskDescriptionUser">
          <PersonIcon className="singleTaskTimeAvarat" />
          <div className="singleTaskTitle">
            <div className="dateTimeHeader">Creator:</div>
            {this.state.creator.name}
          </div>
        </div>

        <div className="assignedToUsers">
          <div className="dateTimeHeader w-100">Assigned to:</div>
          {this.state.assignees.map(user => (
            <div key={user.id} className="w-100 d-flex align-items-center mt-3">
              <PersonIcon className="singleTaskTimeAvarat" />
              <span className="singleTaskTitle">{user.name}</span>
            </div>
          ))}
        </div>
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

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ShowTask);
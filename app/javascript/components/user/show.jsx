import React, { Component } from "react";
import { get, del } from "../../utils/dataTransfer";
import { Redirect } from "react-router";
import "./show.css";
import { connect } from "react-redux";
import { loggedInStatus } from "../../actions/index";
import { Link } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import RemoveIcon from "@material-ui/icons/Remove";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

class ShowUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      name: "",
      tasks: [],
      teams: []
    };
  }

  componentDidMount() {
    this.props.loggedIn().then(res => {
      this.setState({
        redirect: !res.loggedIn
      });
    });

    get("/api/profile").then(response => {
      this.setState({
        name: response.name,
        tasks: response.tasks,
        teams: response.teams
      });
    });
  }

  leaveTeam(team) {
    del(`/api/leaveteam`, team).then(response => {
      this.props.history.push(`/teams`);
    });
  }

  render() {
    if (this.state.redirect) return <Redirect to="/login" />;
    return (
      <div>
        <Paper className="w-100 homeHeaderWrapper mx-auto row mb-4">
          <div className="col-6 border-right text-center">
            <div className="homeHeaderSub">Teams:</div>
            <div className="homeHeaderNumber">{this.state.teams.length}</div>
          </div>
          <div className="col-6 text-center">
            <div className="homeHeaderSub">Tasks:</div>
            <div className="homeHeaderNumber">{this.state.tasks.length}</div>
          </div>
        </Paper>
        <Typography component="h5" variant="caption" className="mb-2" noWrap>
          MY TASKS:
        </Typography>
        <Link to={`/timeline`}>
          <Paper className="profileTasksWrapper pl-3 mb-3 row">
            <div className="col-11 pt-3 pb-3"> See my day</div>
            <div className="col-1 arrowTask">
              <ArrowForwardIosIcon />
            </div>
          </Paper>
        </Link>
        <Typography component="h5" variant="caption" className="mb-2" noWrap>
          MY TEAMS:
        </Typography>
        {this.state.teams.map(team => (
          <Paper className="wrapperTask row mb-3" key={team.id}>
            <div className="col-12 pt-3 pb-3">
              <h1 className="pageHeaderTeam">{team.name}</h1>
              <div className="teamMembers">
                <div className="teamsDescription text-left">
                  <div className="creatorSubtext">Description:</div>
                  <div className="teamDesc">{team.description}</div>
                </div>
              </div>
            </div>
            <div
              className="addThisTaskToTimeline borderBottomRadius height w-100"
              onClick={e => this.leaveTeam(team.id)}
            >
              Leave the Team
              <RemoveIcon />
            </div>
          </Paper>
        ))}
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

export default connect(null, mapDispatchToProps)(ShowUser);

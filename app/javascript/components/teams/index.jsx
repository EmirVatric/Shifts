import React, { Component } from "react";
import { Link } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import "./index.css";

import { connect } from "react-redux";
import { loggedInStatus } from "../../actions/index";

import { Redirect } from "react-router";
import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

class AllTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      name,
      redirect: false
    };
  }

  componentDidMount() {
    this.props.loggedIn().then(res => {
      this.setState({
        redirect: !res.loggedIn,
        name: res.name
      });
    });
    const url = "/api/teams";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(response => {
        this.setState({
          teams: response.teams
        });
      })
      .catch(e => console.log(e));
  }

  joinTeam(e) {
    let url = `/api/jointeam`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: e
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
          teams: response.teams
        });
      })
      .catch(e => console.log(e));
  }

  leaveTeam(team) {
    let url = `/api/leaveteam`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: team
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
          teams: response.teams
        });
      })
      .catch(e => console.log(e));
  }

  ifMember(team) {
    let result = false;
    team.forEach(member => {
      if (member === this.state.name) {
        result = true;
      }
    });
    return result;
  }

  render() {
    if (this.state.redirect) return <Redirect to="/login" />;
    return (
      <div>
        {this.state.teams.map(team => (
          <Paper className="wrapperTask row mb-3" key={team.id}>
            <div className="col-12 pt-3 pb-3">
              <Typography
                variant="h6"
                component="h6"
                className="text-center"
                noWrap
              >
                {team.name}
              </Typography>
              <Typography
                noWrap
                component="h5"
                variant="caption"
                className="text-center d-flex align-items-center justify-content-center"
                noWrap
              >
                <PersonIcon className="mr-1 personIconCreator" />
                <div className="mr-2 text-left">
                  <div className="creatorSubtext">Creator:</div>
                  <div className="creatorText">{team.creator}</div>
                </div>
              </Typography>
              <div className="teamMembers row">
                <div className="col-6">
                  <div className="creatorSubtext">Members:</div>
                  <div className="membersList">
                    {team.members.map(user => (
                      <div className="memberList" key={user}>
                        {user}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="teamsDescription col-6 text-right">
                  <div className="creatorSubtext">Description:</div>
                  <div className="teamDesc">{team.description}</div>
                </div>
              </div>
            </div>
            {team.creator === this.state.name ? (
              <Link
                to={{
                  pathname: `/team/edit/${team.id}`,
                  state: { team: team }
                }}
                className="w-100"
              >
                <div className="addThisTask height w-100">
                  Edit team
                  <EditIcon />
                </div>
              </Link>
            ) : null}
            {this.ifMember(team.members) ? (
              <div
                className="addThisTaskToTimeline borderBottomRadius height w-100"
                onClick={e => this.leaveTeam(team.id)}
              >
                Leave the Team
                <RemoveIcon />
              </div>
            ) : (
              <div
                className="addThisTaskToTimeline height borderBottomRadius w-100"
                onClick={e => this.joinTeam(team.id)}
              >
                Join the Team
                <AddIcon />
              </div>
            )}
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

function mapStateToProps(state) {
  const { name } = state;
  return { name: name };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTeams);

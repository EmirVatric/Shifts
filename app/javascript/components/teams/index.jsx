import React, { Component } from "react";
import { Link } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import "./index.css";

import PersonIcon from "@material-ui/icons/Person";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

class AllTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: []
    };
  }

  componentDidMount() {
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

  render() {
    return (
      <div>
        {this.state.teams.map(team => (
          <Link from="/tasks" to={`/team/${team.id}`} key={team.id}>
            <Paper className="wrapperTask row mb-3">
              <div className="col-11 pt-3 pb-3">
                <Typography variant="h6" component="h6" className="text-center">
                  {team.name}
                </Typography>
                <Typography
                  component="h5"
                  variant="caption"
                  className="text-center d-flex align-items-center justify-content-center"
                  noWrap
                >
                  <div className="mr-2">
                    <PersonIcon className="mr-1" /> Creator:
                  </div>

                  {team.creator}
                </Typography>
              </div>
              <div className="col-1 arrowTask">
                <ArrowForwardIosIcon />
              </div>
            </Paper>
          </Link>
        ))}
      </div>
    );
  }
}

export default AllTeams;

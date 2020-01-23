import React, { Component } from "react";
import { connect } from "react-redux";
import { loggedInStatus } from "../actions/index";
import "./home.css";

import { get } from "../utils/dataTransfer";

import Paper from "@material-ui/core/Paper";
import LowPriorityIcon from "@material-ui/icons/LowPriority";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import AlarmOnOutlinedIcon from "@material-ui/icons/AlarmOnOutlined";
import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: 0,
      tasks: 0
    };
  }

  componentDidMount() {
    this.props.loggedIn();

    get("/api/count").then(response => {
      this.setState({
        teams: response.teams,
        tasks: response.tasks
      });
    });
  }

  render() {
    return (
      <div>
        <div className="overlay">
          THIS CONTENT IS MENT FOR MOBILE PHONES ONLY, PLEASE USE SMALL SCREEN
          WIDTH (MAX: 500PX).
        </div>
        <Paper className="w-100 homeHeaderWrapper mx-auto row">
          <div className="col-6 border-right text-center">
            <div className="homeHeaderSub">Teams:</div>
            <div className="homeHeaderNumber">{this.state.teams}</div>
          </div>
          <div className="col-6 text-center">
            <div className="homeHeaderSub">Tasks:</div>
            <div className="homeHeaderNumber">{this.state.tasks}</div>
          </div>
        </Paper>
        <div className="row boxContainer mt-5">
          <div className="col-4 box shadow-sm">
            <LowPriorityIcon className="icon mb-0" />
            <p className="mt-0 mb-0 subBoxText">Tasks</p>
          </div>
          <div className="col-4 box shadow-sm">
            <PlaylistAddCheckIcon className="icon mb-0" />
            <p className="mt-0 mb-0 subBoxText">Day tasks</p>
          </div>
          <div className="col-4 box shadow-sm">
            <PeopleOutlineIcon className="icon mb-0" />
            <p className="mt-0 mb-0 subBoxText">Teams</p>
          </div>
        </div>
        <div className="row boxContainer">
          <div className="col-4 box shadow-sm">
            <LibraryBooksOutlinedIcon className="icon mb-0" />
            <p className="mt-0 mb-0 subBoxText">Organisation</p>
          </div>
          <div className="col-4 box shadow-sm">
            <AlarmOnOutlinedIcon className="icon mb-0" />
            <p className="mt-0 mb-0 subBoxText">Efficiency</p>
          </div>
          <div className="col-4 box shadow-sm">
            <AccountBalanceOutlinedIcon className="icon mb-0" />
            <p className="mt-0 mb-0 subBoxText">Balance</p>
          </div>
        </div>

        <div className="aboutUs mt-5">
          <div className="aboutUsHeader mb-3">ABOUT US</div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            laboriosam, voluptatibus corporis unde beatae fugiat praesentium
            accusantium dolorum. Sequi tenetur autem porro totam eum optio
            necessitatibus numquam consequatur hic, nisi ipsum, accusantium
            repellendus et similique corporis ratione quia cum id facere
            voluptatibus explicabo? Ipsa ullam nulla quasi unde, id rerum cum,
            quo incidunt veniam voluptatum quisquam ratione adipisci accusamus.
            Deserunt, impedit modi! Voluptate quos, quam voluptas sequi quas
            deleniti recusandae.
          </p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loggedIn: () => {
      dispatch(loggedInStatus());
    }
  };
};

function mapStateToProps(state) {
  const { name } = state;
  return { name: name };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

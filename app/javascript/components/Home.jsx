import React, { Component } from "react";
import { connect } from "react-redux";
import { loggedInStatus } from "../actions/index";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.loggedIn();
  }

  render() {
    return <div>Ammar</div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loggedIn: () => {
      dispatch(loggedInStatus());
    }
  };
};

export default connect(null, mapDispatchToProps)(Home);

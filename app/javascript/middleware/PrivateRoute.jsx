import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loggedInStatus } from "../actions/index";
import Navbar from "../components/navbar/Navbar";
import { store } from "../packs/Index";

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogged: false, gotAnswerFromServer: false };
  }

  componentDidMount() {
    this.props.loggedIn().then(res => {
      if (res.loggedIn == true) {
        this.setState({
          gotAnswerFromServer: true,
          isLogged: true
        });
      } else {
        this.setState({
          gotAnswerFromServer: true,
          isLogged: false
        });
      }
    });
  }
  render() {
    {
      if (this.state.gotAnswerFromServer) {
        if (this.state.isLogged)
          return (
            <Route
              path={this.props.path}
              render={() => <Navbar>{this.props.component}</Navbar>}
            />
          );
        else return <Redirect to="/login" />;
      } else return null;
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loggedIn: () => {
      return dispatch(loggedInStatus());
    }
  };
};

export default connect(null, mapDispatchToProps)(PrivateRoute);

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Navbar from "../components/navbar/Navbar";
import Login from "../components/sessions/Login";
import Signup from "../components/sessions/Register";
import CreateTask from "../components/tasks/create";
import Tasks from "../components/tasks/index";
import ShowTask from "../components/tasks/show";
import PrivateRoute from "../middleware/PrivateRoute";

export default (
  <Router>
    <Switch>
      <Route
        path="/login"
        exact
        render={() => (
          <Navbar title="Login">
            <Login />
          </Navbar>
        )}
      />
      <Route
        path="/signup"
        exact
        render={() => (
          <Navbar title="Signup">
            <Signup />
          </Navbar>
        )}
      />
      <Route
        path="/task/create"
        exact
        render={() => (
          <Navbar title="Create Task">
            <CreateTask />
          </Navbar>
        )}
      />
      <Route
        path="/tasks"
        exact
        render={() => (
          <Navbar title="Create Task">
            <Tasks />
          </Navbar>
        )}
      />
      <Route
        path="/task/:id"
        exact
        render={({ match, history }) => (
          <Navbar title="Specific Task">
            <ShowTask match={match} history={history} />
          </Navbar>
        )}
      />
      <Route
        path="/"
        render={() => (
          <Navbar title="Home Page">
            <Home />
          </Navbar>
        )}
      />
    </Switch>
  </Router>
);

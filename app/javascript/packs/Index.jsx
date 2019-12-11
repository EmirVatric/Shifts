import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from "../components/App";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../reducers/rootReducer";
import thunkMiddleware from "redux-thunk";

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunkMiddleware))
);

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});

import React, { Component } from "react";

class ShowTask extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
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
        console.log(response);
      })
      .catch(e => console.log(e));
  }
  render() {
    return <div>EMir</div>;
  }
}

export default ShowTask;

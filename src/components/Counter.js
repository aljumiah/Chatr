import React, { Component } from "react";
import goDown from "../assets/images/goDown.png";

export default class Counter extends Component {
  state = {
    numberOfMessages: this.props.numberOfMessages
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevState) {
    if (prevState.numberOfMessages !== this.props.numberOfMessages) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    const bottom = document.getElementById("bottom");

    if (bottom) bottom.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    return (
      <div onClick={this.scrollToBottom} style={{ cursor: "pointer" }}>
        <img style={{ width: 25, cursor: "pointer" }} src={goDown} alt="" />
      </div>
    );
  }
}

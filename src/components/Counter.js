import React, { Component } from "react";

import down from "../assets/images/down.png";

export default class Counter extends Component {
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

    if (bottom)
      bottom.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });

    // window.scrollTo(0, document.getElementById("bottom").scrollHeight);
  };

  render() {
    return (
      <div
        onClick={this.scrollToBottom}
        style={{
          position: "absolute",
          top: 300,
          right: 0,
          background: "#73bbe74d",
          borderRadius: "20px 0px 0px 20px",
          padding: 14,
          cursor: "pointer"
        }}
      >
        <img src={down} alt="" style={{ width: 20, height: 20 }} />
      </div>
    );
  }
}

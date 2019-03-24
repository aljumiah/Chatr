import React, { Component } from "react";
import Sound from "react-sound";
import tone from "../assets/audio/snapchatTone.mp3";
import down from "../assets/images/down.png";
import ReactPlayer from "react-player";
export default class Counter extends Component {
  state = {
    playTone: false
  };
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevState) {
    if (prevState.numberOfMessages !== this.props.numberOfMessages) {
      this.scrollToBottom();
      this.toneToggleOn();
      setTimeout(() => {
        this.toneToggleOff();
      }, 850);
    }
  }

  toneToggleOn = () => {
    this.setState({ playTone: true });
  };
  toneToggleOff = () => {
    this.setState({ playTone: false });
  };

  scrollToBottom = () => {
    const bottom = document.getElementById("bottom");

    if (bottom)
      bottom.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
  };

  render() {
    console.log(this.state.playTone);
    return (
      <div>
        {this.state.playTone && <ReactPlayer url={tone} playing />}

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
      </div>
    );
  }
}

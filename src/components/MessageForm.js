import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";

// Actions
import * as actionCreators from "../store/actions";

// Fontawesome
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faSignOutAlt,
//   faSignInAlt,
//   faUserPlus
// } from "@fortawesome/free-solid-svg-icons";
import SendIcone from "../assets/images/send-button.png";
import emojiIcone from "../assets/images/happy.png";

import Emoji from "./Emoji.js";

//emoji
import EmojiPicker from "emoji-picker-react";
import JSEMOJI from "emoji-js";
let jsemoji = new JSEMOJI();

class MessageForm extends Component {
  state = {
    user: this.props.user,
    channel: this.props.channelID,
    message: "",
    emojiShown: false,
    open: false
  };

  onOpenModal = () => this.setState({ open: true });

  onCloseModal = () => this.setState({ open: false });

  resetForm = () => {
    this.setState({ message: "" });
  };
  onTextChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onSubmit = event => {
    event.preventDefault();
    this.props.postMessage(
      {
        channel: this.state.channel,
        message: this.state.message,
        user: this.state.user
      },
      this.resetForm,
      this.props.channelID
    );
  };

  // addEmoji = oneEmoji => {
  //   this.setState({ message: this.state.message + " " + oneEmoji });
  // };

  handleEmojiClick = (n, e) => {
    let emoji = jsemoji.replace_colons(`:${e.name}:`);
    this.setState({
      message: this.state.message + emoji
    });
  };

  render() {
    const { open } = this.state;
    return (
      <div className="col-12">
        <form onSubmit={this.onSubmit}>
          <div className="col-12">
            <table style={{ marginBottom: 20 }}>
              <tr>
                <td>
                  <button
                    style={{ cursor: "pointer" }}
                    value="Add Message"
                    style={{ border: "none", background: "none", fontSize: 20 }}
                  >
                    <img
                      style={{ width: 35 }}
                      onClick={this.onOpenModal}
                      src={emojiIcone}
                      alt=""
                    />
                  </button>
                </td>
                <td className="col-12">
                  <input
                    type="text"
                    className="form-control messageStyleInput"
                    name="message"
                    value={this.state.message}
                    onChange={this.onTextChange}
                    placeholder="Type somthing to send .."
                  />
                </td>

                {/* 
            <Emoji addEmoji={this.addEmoji} /> */}

                <td>
                  <button
                    type="submit"
                    value="Add Message"
                    style={{
                      border: "none",
                      background: "none",
                      fontSize: 20,
                      paddingLeft: 20
                    }}
                  >
                    <img src={SendIcone} alt="" />
                  </button>
                </td>
              </tr>
            </table>
            <div>
              <Modal
                style={{ padding: 20 }}
                open={open}
                onClose={this.onCloseModal}
                center
              >
                <EmojiPicker onEmojiClick={this.handleEmojiClick} />
              </Modal>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    channels: state.rootChannels.channels,
    channel: state.rootChannel.channel,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postMessage: (message, reset, channelID) =>
      dispatch(actionCreators.postMessage(message, reset, channelID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageForm);

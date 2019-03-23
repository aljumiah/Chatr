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
    emojiShow: false
  };

  showEmoji = () => {
    this.state.emojiShow
      ? this.setState({ emojiShow: false })
      : this.setState({ emojiShow: true });
  };
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

    this.resetForm();

    this.setState({ emojiShow: false, message: "" });

  };

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
            <table className="col-12" style={{ marginBottom: 20 }}>
              <tbody className="col-12">
                <tr className="col-12">
                  {/* the emoji button on the left */}
                  <td className="col-2">
                    <div
                      onClick={this.showEmoji}
                      style={{ cursor: "pointer" }}
                      value="Add Message"
                      style={{
                        border: "none",
                        background: "none",
                        fontSize: 20,
                        paddingLeft: 20
                      }}
                      type="text"
                    >
                      <img
                        style={{ width: 35, cursor: "pointer" }}
                        src={emojiIcone}
                        alt=""
                      />
                    </div>
                  </td>

                  {/* send input textArea */}
                  <td className="col-8">
                    <input
                      type="text"
                      className="form-control messageStyleInput"
                      name="message"
                      value={this.state.message}
                      onChange={this.onTextChange}
                      placeholder="Type somthing to send .."
                    />
                  </td>

                  {/* send button on the right */}
                  <td className="col-2">
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
              </tbody>
            </table>
            {/* the emoji box */}
            <div className="emoji-table " id="show-emoji-yes">
              {/* if emojiShow set to TRUE show it else hide it  */}
              {this.state.emojiShow && (
                <EmojiPicker onEmojiClick={this.handleEmojiClick} />
              )}
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

// function
// addEmoji = oneEmoji => {
//   this.setState({ message: this.state.message + " " + oneEmoji });
// };

// to call the emoji componnent
//  <Emoji addEmoji={this.addEmoji} />

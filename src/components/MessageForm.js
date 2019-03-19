import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";

// Actions
import * as actionCreators from "../store/actions";
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
    this.props.postMessage(this.state, this.resetForm, this.props.channelID);
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
      <div className="mt-5 p-2">
        <form onSubmit={this.onSubmit}>
          <div className="">
            <input
              type="text"
              className="form-control messageStyleInput"
              name="message"
              value={this.state.message}
              onChange={this.onTextChange}
            />
            {/* 
            <Emoji addEmoji={this.addEmoji} /> */}
            <div style={{ cursor: "pointer" }} onClick={this.onOpenModal}>
              {"😎"}
            </div>
            <Modal
              style={{ padding: 20 }}
              open={open}
              onClose={this.onCloseModal}
              center
            >
              <EmojiPicker onEmojiClick={this.handleEmojiClick} />
            </Modal>
          </div>

          <input type="submit" value="Add Message" />
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

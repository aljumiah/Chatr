import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "../store/actions";

class MessageForm extends Component {
  state = {
    user: this.props.user,
    channel: this.props.channelID,
    message: ""
  };
  resetForm = () => {
    console.log("test reset");
    this.setState({ message: "" });
  };
  onTextChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onSubmit = event => {
    console.log(this.state);
    event.preventDefault();
    this.props.postMessage(this.state, this.resetForm, this.props.channelID);
  };

  render() {
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

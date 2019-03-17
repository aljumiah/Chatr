import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "../store/actions";

class MessageForm extends Component {
  state = {
    user: this.props.user,
    channel: this.props.match.params.channelID,
    message: ""
  };

  onTextChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onSubmit = event => {
    console.log(this.state);
    event.preventDefault();
    this.props.postMessage(this.state, this.props.match.params.channelID);
  };

  render() {
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.onSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="message"
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
    postMessage: (message, channelID) =>
      dispatch(actionCreators.postMessage(message, channelID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageForm);

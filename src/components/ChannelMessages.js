import React, { Component } from "react";

// Components

import Loading from "./Loading";

import { connect } from "react-redux";

import * as actionCreators from "../store/actions";
import Message from "./Message";
import MessageForm from "./MessageForm";

import Counter from "./Counter";

import defaultBack from "../assets/images/back.jpg";

class ChannelMessages extends Component {
  interval = setInterval(() => {
    this.props.getChannel(this.props.match.params.channelID);
  }, 3000);

  componentDidMount() {
    this.props.getChannel(this.props.match.params.channelID);
  }

  componentDidUpdate(prevState) {
    if (
      prevState.match.params.channelID !== this.props.match.params.channelID
    ) {
      this.props.getChannel(this.props.match.params.channelID);
    }
  }

  componentWillUpdate(prevState) {
    if (
      this.props.user === prevState.user ||
      prevState.match.params.channelID === this.props.match.params.channelID
    ) {
      return this.interval;
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  channel() {
    return this.props.channel.map((message, idx) => (
      <Message
        key={message.id + idx}
        message={message}
        user={this.props.user}
      />
    ));
  }

  render() {
    if (this.props.user) {
      if (this.props.loading) {
        return <Loading />;
      } else {
        //--------------------adding pictures to the background ------------------------
        const channelID = this.props.match.params.channelID;
        const chatBackGround =
          this.props.channels.find(channel => channel.id === +channelID) || {};

        return (
          <div
            className="col-12 chatbox"
            style={{
              background: "white",
              borderRadius: 20
            }}
          >
            <div className=" col-12 chat_overflow">
              <div id="bottom" className="col-12">
                {this.channel()}
              </div>
            </div>

            <div className="">
              <MessageForm channelID={this.props.match.params.channelID} />
              <Counter numberOfMessages={this.props.longOfText} />
            </div>
          </div>
        );
      }
    } else {
      return <h1>You need to sign in to see the messages</h1>;
    }
  }
}
const mapStateToProps = state => {
  return {
    channel: state.rootChannel.channel,
    channels: state.rootChannels.channels,
    loading: state.rootChannel.loading,
    longOfText: state.rootChannel.longOfText,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getChannel: channelID =>
      dispatch(actionCreators.fetchChannelMessages(channelID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelMessages);

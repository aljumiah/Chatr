import React, { Component } from "react";

// Components

import Loading from "./Loading";

import { connect } from "react-redux";

import * as actionCreators from "../store/actions";
import Message from "./Message";

class ChannelMessages extends Component {
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

  render() {
    if (this.props.user) {
      if (this.props.loading) {
        return <Loading />;
      } else {
        const channel = this.props.channel.map((message, idx) => (
          <Message key={message.id + idx} message={message} />
        ));
        console.log(channel);

        return <div>{channel}</div>;
      }
    } else {
      return <h1>You need to sign in to see the channel's messages</h1>;
    }
  }
}

const mapStateToProps = state => {
  return {
    channel: state.rootChannel.channel,
    loading: state.rootChannel.loading,
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

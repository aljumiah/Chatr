import React, { Component } from "react";

// Components

import Loading from "./Loading";

import { connect } from "react-redux";

import * as actionCreators from "../store/actions";
import Message from "./Message";
import MessageForm from "./MessageForm";

class ChannelMessages extends Component {
  componentDidMount() {
    this.props.getChannel(this.props.match.params.channelID);

    // setInterval(
    //   () => this.props.getChannel(this.props.match.params.channelID),
    //   3000
    // );

    //TimeStamp

    this.scrollToBottom();
  }

  componentDidUpdate(prevState) {
    if (
      prevState.match.params.channelID !== this.props.match.params.channelID
    ) {
      this.props.getChannel(this.props.match.params.channelID);
    }
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  render() {
    if (this.props.user) {
      if (this.props.loading) {
        return <Loading />;
      } else {
        //--------------------adding pictures to the background ------------------------
        const channelID = this.props.match.params.channelID;
        const chatBackGround =
          this.props.channels.find(channel => channel.id === +channelID) || {};
        //--------------------------------------now we can use it in the return --------
        const channel = this.props.channel.map((message, idx) => (
          <Message
            key={message.id + idx}
            message={message}
            user={this.props.user}
          />
        ));

        return (
          <div
            className="content_chat image_style"
            style={{
              backgroundImage: ` url(${chatBackGround.image_url})`,
              position: "fixed",

              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              filter: "alpha((opacity = 50))"
            }}
          >
            {/* -----------------^^-----the Start--& end^^------------------------- */}
            <div className="coverBack" />
            <div className="chat_overflow">
              <div className="col-12">{channel}</div>
            </div>
            <div className="backgroundInput">
              <MessageForm channelID={this.props.match.params.channelID} />
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

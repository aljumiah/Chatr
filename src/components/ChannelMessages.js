import React, { Component } from "react";

// Components

import Loading from "./Loading";

import { connect } from "react-redux";

import * as actionCreators from "../store/actions";
import Message from "./Message";
import MessageForm from "./MessageForm";
import Counter from "./Counter";

class ChannelMessages extends Component {
  interval = setInterval(() => {
    this.props.getChannel(this.props.match.params.channelID);
  }, 3000);

  componentDidMount() {
    this.props.getChannel(this.props.match.params.channelID);

    // this.setState({ numberOfMessages: this.props.channel.length });
    // console.log(this.props.channel.length);
  }

  componentDidUpdate(prevState) {
    if (
      prevState.match.params.channelID !== this.props.match.params.channelID
    ) {
      this.props.getChannel(this.props.match.params.channelID);
    }

    // this.scrollToBottom();
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

  scrollToBottom = () => {
    const bottom = document.getElementById("bottom");

    if (bottom) bottom.scrollIntoView({ behavior: "smooth" });
  };

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
        //--------------------------------------now we can use it in the return --------
        // console.log(this.channel().length);
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
              <div className="col-12">
                {this.channel()}

                <div id="bottom" />
              </div>
            </div>

            <div className="backgroundInput">
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

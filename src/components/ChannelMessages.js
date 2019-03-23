import React, { Component } from "react";

// Components

import Loading from "./Loading";

import { connect } from "react-redux";

import * as actionCreators from "../store/actions";
import Message from "./Message";
import MessageForm from "./MessageForm";

import down from "../assets/images/down.png";


import Counter from "./Counter";

import defaultBack from "../assets/images/back.jpg";



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

//         const channel = this.props.channel.map((message, idx) => (
//           <Message
//             key={message.id + idx}
//             message={message}
//             user={this.props.user}
//           />
//         ));
//         // backgroundImage: chatBackGround.image_url
//         // ? ` url(${chatBackGround.image_url})`
//         // : `url(${defaultBack})`,

        // console.log(this.channel().length);

        return (
          <div
            className="col-12 chatbox"
            style={{
              background: "white",
              borderRadius: 20
            }}
          >
            {/* -----------------^^-----the Start--& end^^------------------------- */}


            <div className=" col-12 chat_overflow">
              <div className="col-12">
          
         // {channel}
          
                         {this.channel()}

             
          </div>
            </div>
            <div
              id="bottom"
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

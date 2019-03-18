import React, { Component } from "react";

// Components

import Loading from "./Loading";

import { connect } from "react-redux";

import * as actionCreators from "../store/actions";

class Meassage extends Component {
  render() {
    const message = this.props.message;
    return (
      <div>
        <div className="messageLabel">
          <span className="messageuser">{message.username}</span>
          <span className="messagedate">
            {message.timestamp.substring(0, 10)}
          </span>
        </div>
        <li className="message_circle list-group-item">
          <div className="row ">
            {/* <div className="col-7">{message.username}</div> */}
            <div className="col-7">{message.message}</div>
            {/* <div className="col-7">{message.timestamp}</div> */}
            {/* <div className="col-7">{message.channel}</div> */}
            <div className="col-5" />
          </div>
        </li>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(Meassage);

import React, { Component } from "react";

// Components

import Loading from "./Loading";

import { connect } from "react-redux";

import * as actionCreators from "../store/actions";

class Meassage extends Component {
  render() {
    const message = this.props.message;
    return (
      <>
        {message.username === this.props.user.username ? (
          <div style={{ marginBottom: 50 }}>
            <div className="messageLabel " style={{ textAlign: "right" }}>
              <span className="messagedate ">
                {message.timestamp.substring(0, 10)}
              </span>
              <span className="messageuser ">{message.username}</span>
            </div>
            <li
              className=" message_circle2 list-group-item "
              style={{ marginRight: 10 }}
            >
              <div className="row ">
                <div className="col-7">{message.message}</div>
                <div className="col-5" />
              </div>
            </li>
          </div>
        ) : (
          <>
            <div className="messageLabel">
              <span className="messageuser">{message.username}</span>
              <span className="messagedate">
                {message.timestamp.substring(0, 10)}
              </span>
            </div>
            <li className="message_circle list-group-item">
              <div className="row ">
                <div className="col-7">{message.message}</div>
                <div className="col-5" />
              </div>
            </li>
          </>
        )}
      </>
    );
  }
}

export default connect(
  null,
  null
)(Meassage);

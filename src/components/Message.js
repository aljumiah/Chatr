import React, { Component } from "react";

// Components

import Loading from "./Loading";

import { connect } from "react-redux";

import * as actionCreators from "../store/actions";
//import imgLoading from "../assets/images/Ellipsis.gif";

class Meassage extends Component {
  render() {
    const message = this.props.message;

    return (
      <>
        {message.username === this.props.user.username ? (
          <div className="col-12" style={{ marginBottom: 50 }}>
            <div className=" messageLabel">
              <p className="circleUSerImg1 messageuser">
                YOU
                <span className="messagedate">
                  {message.timestamp.substring(0, 10)}
                </span>
              </p>
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
            <div className="col-12 messageLabel">
              <p className="circleUSerImg messageuser">
                {message.username}
                <span className="messagedate">
                  {message.timestamp.substring(0, 10)}
                </span>
              </p>
            </div>
            <li className="message_circle list-group-item">
              <div className="row ">
                <div className="col-12">{message.message}</div>
                <div className="col-12" />
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

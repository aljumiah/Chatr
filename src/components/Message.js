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
            <div className=" ">
              <p className="">
                YOU
                <span className="">{message.timestamp.substring(0, 10)}</span>
              </p>
            </div>
            <li className="" style={{}}>
              <div className="">
                <div className="col-7">{message.message}</div>
                <div className="col-5" />
              </div>
            </li>
          </div>
        ) : (
          <>
            <div className="col-12 ">
              <p className=" ">
                {message.username}
                <span className="">{message.timestamp.substring(0, 10)}</span>
              </p>
            </div>
            <li className="">
              <div className="">
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

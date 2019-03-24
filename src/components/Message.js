import React, { Component } from "react";

// Components

import Loading from "./Loading";

import { connect } from "react-redux";

import * as actionCreators from "../store/actions";
//import imgLoading from "../assets/images/Ellipsis.gif";
import peopleImg from "../assets/images/anou.jpg";
import usereImg from "../assets/images/userimg.png";

class Meassage extends Component {
  render() {
    const message = this.props.message;

    return (
      <>
        {message.username === this.props.user.username ? (
          <div className="col-12 " style={{ marginTop: 20 }}>
            <div className="col-10">
              <div className="col-12 divMessageLebelUser ">
                <div
                  className="col-6"
                  style={{
                    float: "right",
                    textAlign: "right",
                    color: "#b4b5ba"
                  }}
                >
                  {message.timestamp.substring(0, 10)}
                  {"   "}
                  {message.timestamp.substring(11, 16)}
                </div>
              </div>
              <div className="col-12 " style={{}}>
                <div
                  style={{ float: "right", textAlign: "right" }}
                  className="col-8 divMessageUser animated fadeInUp text-break"
                >
                  {message.message}
                </div>
              </div>
            </div>
            <div
              className="col-2 animated fadeInRight"
              style={{ paddingRight: 20 }}
            >
              <img
                className="col-12 "
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  float: "right",
                  textAlign: "right",
                  border: "1px solid #df4a6b",
                  padding: 2
                }}
                src={usereImg}
                alt="usereImg"
              />
              <div
                style={{ float: "right", textAlign: "right", paddingRight: 10 }}
                className="col-12"
              >
                {" "}
                YOU{" "}
              </div>
            </div>
          </div>
        ) : (
          <div className="col-12 " style={{ marginTop: 20 }}>
            <div
              className="col-2 imgbubble animated fadeInLeft"
              style={{ paddingLeft: 20 }}
            >
              <img
                className="col-12"
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  border: "1px solid #df4a6b",
                  padding: 2
                }}
                src={peopleImg}
                alt="peopleImg"
              />
              <div className="col-12" style={{ paddingLeft: 0 }}>
                {" "}
                {message.username.substring(0, 7)}
              </div>
            </div>
            <div className="col-10 bubble">
              <div className="col-12 divMessageLebelPeople">
                <div className="col-6" style={{ color: "#b4b5ba" }}>
                  {message.timestamp.substring(0, 10)}
                  {"       "}
                  {message.timestamp.substring(11, 16)}
                </div>
              </div>

              <div className="col-8">
                <div className="col-12 divMessagePeople animated fadeInUp text-break">
                  {message.message}
                </div>
              </div>
              <div
                className="col-4"
                style={{ color: "#b4b5ba", paddingTop: 10 }}
              />
            </div>
          </div>
        )}
      </>
    );
  }
}

export default connect(
  null,
  null
)(Meassage);

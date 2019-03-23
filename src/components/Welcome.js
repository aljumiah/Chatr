import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactPlayer from "react-player";

class Welcome extends Component {
  render() {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          width: "98%",
          marginLeft: "1%",
          marginTop: 100
        }}
        className="masthead d-flex col-12"
      >
        {!this.props.user ? (
          <div
            className="container text-center my-auto z-1"
            style={{ paddingTop: 20, paddingBottom: 20 }}
          >
            <h1 className="mb-1">WELCOME TO CHATR</h1>

            <h3 className="mb-5" style={{ paddingTop: 20, color: "#65b2e5" }}>
              <em>You're gonna need to login to see the messages</em>
            </h3>
            <Link
              to="/login"
              className="btn btn-primary btn-lg"
              style={{ width: "100%", borderRadius: 20, marginBottom: 10 }}
            >
              Login
            </Link>
          </div>
        ) : (
          <div
            className="container text-center my-auto z-1 animated zoomIn delay-2s"
            style={{ color: "#65b2e5", paddingTop: 20, paddingBottom: 20 }}
          >
            <h1 className="mb-1">WELCOME</h1>

            <ReactPlayer
              className="react-player"
              url="https://www.youtube.com/watch?v=yAl48Tk0Sno"
              width=" 100%"
              height="250px"
              playing
            />
          </div>
        )}
        <div className="overlay z-0" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  null
)(Welcome);

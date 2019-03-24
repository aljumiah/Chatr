import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import logout from "../../assets/images/logout.png";
class AuthButton extends Component {
  render() {
    let user;
    {
      this.props.user ? (user = this.props.user) : (user = null);
    }

    let buttons = (
      <div
        style={{ float: "right", paddingRight: 20, textAlign: "right" }}
        onClick={() => this.props.logout(this.props.history)}
        className="col-12"
      >
        <a className=" myColor">
          <img style={{ width: 50, height: 50 }} src={logout} alt="" />
        </a>
      </div>
    );

    if (!user) {
      buttons = [
        <div style={{ marginRight: 10 }} key="loginButton" className="col-4">
          <Link
            style={{ color: "#fff", float: "right" }}
            to="/login"
            className=" myColor"
          >
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Link>
        </div>,
        <div key="signupButton" className="col-6">
          <Link style={{ color: "#fff" }} to="/signup" className="myColor">
            <FontAwesomeIcon icon={faUserPlus} /> Signup
          </Link>
        </div>
      ];
    }

    return (
      <div className="col-12">
        <div
          style={{ color: "#fff", paddingTop: 15, paddingLeft: 20 }}
          className="myusername col-6 navbar-text"
        >
          {user && user.username}
        </div>
        <div className="col-6">{buttons}</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: history => dispatch(actionCreators.logout(history))
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthButton);

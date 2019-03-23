import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

// Actions
import * as actionCreators from "../store/actions";

class RegistationForm extends Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e, type) => {
    e.preventDefault();

    type === "login"
      ? this.props.login(this.state, this.props.history, () =>
          this.props.fetchChannels()
        )
      : this.props.signup(this.state, this.props.history, () =>
          this.props.fetchChannels()
        );
  };

  render() {
    const type = this.props.match.url.substring(1);
    //const errors = this.props.errors;
    return (
      <>
        {!this.props.user && (
          <div
            className="card col-12  margin_top"
            style={{
              borderRadius: 20,
              width: "98%",
              marginLeft: "1%"
            }}
          >
            <div className="card-body" style={{ textAlign: "center" }}>
              <h5 className="card-title mb-4">
                {type === "login"
                  ? "Login to send messages"
                  : "Register an account"}
              </h5>
              <form onSubmit={event => this.submitHandler(event, type)}>
                <div className="form-group">
                  <input
                    style={{ borderRadius: 20 }}
                    className="form-control"
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={this.changeHandler}
                  />
                </div>
                <div className="form-group">
                  <input
                    style={{ borderRadius: 20 }}
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.changeHandler}
                  />
                </div>
                <input
                  style={{ borderRadius: 20, width: "100%" }}
                  className="btn btn-primary"
                  type="submit"
                  value={type.replace(/^\w/, c => c.toUpperCase())}
                />
              </form>
            </div>
            <div className="card-footer" style={{ textAlign: "center" }}>
              <Link
                to={type === "login" ? "/signup" : "/login"}
                className="btn btn-small btn-link"
              >
                {type === "login"
                  ? "register an account"
                  : "login with an existing account"}
              </Link>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signup: (userData, history, fetch) =>
    dispatch(actionCreators.signup(userData, history, fetch)),
  login: (userData, history, fetch) =>
    dispatch(actionCreators.login(userData, history, fetch)),
  fetchChannels: () => dispatch(actionCreators.fetchChannels())
});
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    errors: state.auth.errors
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistationForm);

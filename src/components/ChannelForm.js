import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "../store/actions";

class ChannelForm extends Component {
  state = {
    name: "",
    owner: this.props.user,
    image_url: ""
  };

  componentWillUnmount() {
    if (this.props.errors.length) this.props.setErrors();
  }

  submitChannel = event => {
    event.preventDefault();
    this.props.postChannel(
      this.state,
      this.resetForm,
      this.props.history,
      this.props.close
    );
  };

  resetForm = () => this.setState({ name: "", image_url: "" });

  onTextchange = event =>
    this.setState({ [event.target.name]: event.target.value });

  render() {
    /* --here I add the errors -- + ComponentWillUnMount--- + mapDispatchToProps+ MapStateToProps ---*/
    const errors = this.props.errors;
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitChannel}>
          {!!errors.length && (
            <div className="alert alert-danger animated shake" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}

          {/* ----------------------------------------- end ----------------------------------------*/}

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">User Name</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="name"
              value={this.state.name}
              onChange={this.onTextchange}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Image URL</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="image_url"
              onChange={this.onTextchange}
            />
          </div>
          <button
            style={{ borderRadius: 20, width: "100%" }}
            className="btn btn-success"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postChannel: (newChannel, reset, history, close) =>
      dispatch(actionCreators.postChannel(newChannel, reset, history, close)),
    setErrors: () => dispatch(actionCreators.setErrors({}))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelForm);

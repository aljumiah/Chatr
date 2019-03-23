import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

import * as actionCreators from "../store/actions";

class SearchBar extends Component {
  render() {
    return (
      <div style={{ paddingLeft: 10 }} className="form-group">
        <div
          style={{ marginBottom: 0, padding: 0, color: "white" }}
          className="input-group my-3"
        >
          {this.props.user && (
            <input
              placeholder="Search"
              className="form-control SearchStyle"
              type="text"
              onChange={event => this.props.filterChannels(event.target.value)}
            />
          )}
          <div className="input-group-append" />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    filterChannels: query => dispatch(actionCreators.filterChannels(query))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

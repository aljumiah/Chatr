import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";

import * as actionCreators from "../store/actions";

class SearchBar extends Component {
  render() {
    return (
      <div className="form-group col-lg-12 col-12 mx-auto">
        <div className="input-group my-3">
          <input
            placeholder="Search"
            className="form-control"
            type="text"
            onChange={event => this.props.filterChannels(event.target.value)}
          />
          <div className="input-group-append" />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    filterChannels: query => dispatch(actionCreators.filterChannels(query))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(SearchBar);

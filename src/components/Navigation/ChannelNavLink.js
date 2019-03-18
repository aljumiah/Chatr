import React, { Component } from "react";
import { NavLink } from "react-router-dom";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

class ChannelNavLink extends Component {
  render() {
    const { channel } = this.props;
    return (
      <li
        className="nav-item"
        data-toggle="tooltip"
        data-placement="right"
        title={channel.name}
      >
        <NavLink className="nav-link" to={`/channels/${channel.id}`}>
          {/* <FontAwesomeIcon icon={faHashtag} /> */}
          <img
            className="rounded-circle rounded-circle_border"
            src={channel.image_url}
            style={{ width: "50px", height: "50px" }}
          />
          <span className="nav-link-text"> {channel.name}</span>
        </NavLink>
      </li>
    );
  }
}

export default ChannelNavLink;

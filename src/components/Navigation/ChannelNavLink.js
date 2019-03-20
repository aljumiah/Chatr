import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// FontAwesome
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import tv from "../../assets/images/television.png";

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
        <NavLink
          key={channel.name}
          className="nav-link"
          to={`/channels/${channel.id}`}
        >
          <img
            className="rounded-circle rounded-circle_border"
            src={
              channel.image_url
                ? channel.image_url
                : "https://cdn.pixabay.com/photo/2017/08/12/10/13/background-2633962_960_720.jpg"
            }
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />

          <span className="nav-link-text"> {channel.name}</span>
        </NavLink>
      </li>
    );
  }
}

export default withRouter(
  connect(
    null,
    null
  )(ChannelNavLink)
);

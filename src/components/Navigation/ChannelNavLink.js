import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

// FontAwesome
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import tv from "../../assets/images/television.png";

class ChannelNavLink extends Component {
  state = {
    active: false
  };
  // showthis = id => {
  //   let path = this.props.history.location.pathname;
  //   if (this.props.history.location.pathname === `/channels/${id}`) {
  //     this.setState({ active: true });
  //   }
  // };

  render() {
    const { channel } = this.props;
    return (
      <li
        style={{
          textAlign: "center",
          margin: 5
        }}
        className="col-2 text-break"
        title={channel.name}
      >
        <NavLink
          key={channel.name}
          className="col-12"
          to={`/channels/${channel.id}`}
          //onClick={() => this.showthis(channel.id)}
          style={{}}
        >
          <img
            className="col-122 rounded-circle rounded-circle_border"
            src={
              channel.image_url
                ? channel.image_url
                : "https://cdn.pixabay.com/photo/2017/08/12/10/13/background-2633962_960_720.jpg"
            }
            style={{
              width: "70px",
              height: "70px",
              objectFit: "cover",
              textAlign: "center",
              margin: 5,
              display: "block",
              marginLeft: 5,
              marginRight: 15
            }}
          />

          <span className="col-12" style={{ margin: 5 }}>
            {" "}
            {channel.name}
          </span>
        </NavLink>
      </li>
    );
  }
}

export default withRouter(ChannelNavLink);

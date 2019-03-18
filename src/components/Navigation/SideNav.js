import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";
import SearchBar from "../SearchBar";

class SideNav extends React.Component {
  state = { collapsed: false };

  render() {
    const channelLinks = this.props.filteredChannels.map(channel => (
      <ChannelNavLink
        className="divStyle"
        key={channel.name}
        channel={channel}
      />
    ));

    return (
      <div>
        <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
          <li className="nav-item" data-toggle="tooltip" data-placement="right">
            <Link className="nav-link heading" to="/createChannel">
              <span className="nav-link-text mr-2">Channels</span>
              {this.props.user && <FontAwesomeIcon icon={faPlusCircle} />}
            </Link>
          </li>
          <li>
            <SearchBar />
          </li>
          {this.props.user && <>{channelLinks}</>}
        </ul>
        <ul className="navbar-nav sidenav-toggler">
          <li className="nav-item">
            <span
              className="nav-link text-center"
              id="sidenavToggler"
              onClick={() =>
                this.setState(prevState => ({
                  collapsed: !prevState.collapsed
                }))
              }
            >
              <FontAwesomeIcon
                icon={this.state.collapsed ? faAngleRight : faAngleLeft}
              />
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    channels: state.rootChannels.channels,
    filteredChannels: state.rootChannels.filteredChannels
  };
};

export default connect(mapStateToProps)(SideNav);

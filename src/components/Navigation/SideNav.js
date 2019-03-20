import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-responsive-modal";
import ChannelForm from "../ChannelForm";

// Components
import ChannelNavLink from "./ChannelNavLink";
import SearchBar from "../SearchBar";
//import imgLoading from "../../assets/images/Ellipsis.gif";

class SideNav extends React.Component {
  state = { collapsed: false, open: false };

  onOpenModal = () => this.setState({ open: true });

  onCloseModal = () => this.setState({ open: false });

  render() {
    //console.log(this.props.match.params.channelID);
    const { open } = this.state;
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
          <li
            style={{ position: "fixed", background: "#fff" }}
            className="nav-item "
            data-toggle="tooltip"
            data-placement="right"
          >
            <Link
              style={{ color: "#2ed265" }}
              onClick={this.onOpenModal}
              className="nav-link heading"
              to=""
            >
              <span className="nav-link-text mr-2">Channels</span>
              {this.props.user && <FontAwesomeIcon icon={faPlusCircle} />}
            </Link>
            <SearchBar />
          </li>
        </ul>
        <ul
          style={{ marginTop: 130 }}
          className="navbar-nav navbar-sidenav"
          id="exampleAccordion"
        >
          {this.props.user ? <>{channelLinks}</> : <div />}
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
        <Modal open={open} onClose={this.onCloseModal} center>
          <ChannelForm close={this.onCloseModal} />
        </Modal>
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

export default withRouter(connect(mapStateToProps)(SideNav));

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
import add_icone from "../../assets/images/add.png";
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
      <ChannelNavLink className="" key={channel.name} channel={channel} />
    ));

    return (
      <div>
        <ul style={{ margin: 0, padding: 0 }} className="" id="">
          <li
            style={{ position: "", background: "#" }}
            className=""
            data-toggle="tooltip"
            data-placement="right"
          >
            <div className="col-10">
              <SearchBar />
            </div>
            <div className="col-2">
              <Link
                style={{ color: "#2ed265" }}
                onClick={this.onOpenModal}
                className=""
                to=""
              >
                <div>
                  {this.props.user && (
                    <img
                      style={{
                        width: 70,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 20
                      }}
                      src={add_icone}
                      alt=""
                    />
                  )}
                </div>
              </Link>
            </div>
          </li>
        </ul>
        {this.props.user && (
          <ul style={{}} className="ulChats col-12" id="exampleAccordion">
            {this.props.user && <>{channelLinks}</>}
          </ul>
        )}
        {/* <ul className="">
          <li className="">
            <span
              className=""
              id=""
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
        </ul> */}
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

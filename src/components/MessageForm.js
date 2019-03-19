import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "../store/actions";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import SendIcone from "../assets/images/send-button.png";
import emojiIcone from "../assets/images/happy.png";

class MessageForm extends Component {
  state = {
    user: this.props.user,
    channel: this.props.channelID,
    message: ""
  };
  resetForm = () => {
    console.log("test reset");
    this.setState({ message: "" });
  };
  onTextChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onSubmit = event => {
    console.log(this.state);
    event.preventDefault();
    this.props.postMessage(this.state, this.resetForm, this.props.channelID);
  };

  render() {
    return (
      <div className="col-12">
        <form onSubmit={this.onSubmit}>
          <div className="col-12">
            <table style={{ marginBottom: 20 }}>
              <tr>
                <td>
                  <button
                    type="submit"
                    value="Add Message"
                    style={{ border: "none", background: "none", fontSize: 20 }}
                  >
                    <img style={{ width: 35 }} src={emojiIcone} alt="" />
                  </button>
                </td>
                <td className="col-12">
                  <input
                    type="text"
                    className="form-control messageStyleInput"
                    name="message"
                    value={this.state.message}
                    onChange={this.onTextChange}
                    placeholder="Type somthing to send .."
                  />
                </td>

                <td>
                  <button
                    type="submit"
                    value="Add Message"
                    style={{
                      border: "none",
                      background: "none",
                      fontSize: 20,
                      paddingLeft: 20
                    }}
                  >
                    <img src={SendIcone} alt="" />
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    channels: state.rootChannels.channels,
    channel: state.rootChannel.channel,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postMessage: (message, reset, channelID) =>
      dispatch(actionCreators.postMessage(message, reset, channelID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageForm);

import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

// Scripts
import main from "./assets/js/main";
import "./assets/css/custom.css";
// Components
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import ChannelMessages from "./components/ChannelMessages";

import { connect } from "react-redux";

// Actions
import * as actionCreators from "./store/actions";
import AddChannelCard from "./components/AddChannelCard";
import ChannelForm from "./components/ChannelForm";
import MessageForm from "./components/MessageForm";

class App extends Component {
  componentDidMount() {
    main();
    this.props.checkForExpiredToken();
    this.props.fetchChannels();
  }

  render() {
    return (
      <div className="content-wrapper">
        <NavBar history={this.props.history} />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/createChannel" component={ChannelForm} />
          <Route path="/channels/:channelID/send/" component={MessageForm} />
          <Route path="/channels/:channelID" component={ChannelMessages} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <PrivateRoute path="/private" component={SuperSecretPage} />
          <Redirect to="/welcome" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    channels: state.rootChannels.channels,
    loading: state.rootChannels.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: () => dispatch(actionCreators.fetchChannels()),
    checkForExpiredToken: () => dispatch(actionCreators.checkForExpiredToken())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

// Components
import SideNav from "./SideNav";
import AuthButton from "./AuthButton";
import user from "../../assets/images/user.png";
class NavBar extends Component {
  render() {
    return (
      <nav style={{ marginTop: 10 }} className="color_nav col-12" id="mainNav">
        <Link className="col-2" to="/welcome">
          <img
            style={{
              width: 60,
              height: 60,
              border: " solid white",
              borderRadius: 50,
              paddingTop: 5,
              marginLeft: 40
            }}
            src={user}
            alt=""
          />
        </Link>
        <div className="col-10">
          <AuthButton history={this.props.history} />
        </div>
        {/* <button
          className="navbar-toggler navbar-toggler-right myColor"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon myColor" />
        </button> */}
        <div className="col-12" id="navbarResponsive">
          <SideNav />
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);

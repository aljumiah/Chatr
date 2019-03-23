import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => (
  <div
    className="spinner mx-auto text-center col-12"
    style={{ marginTop: 100 }}
  >
    <FontAwesomeIcon
      icon={faSpinner}
      spin
      size="4x"
      style={{ color: "#fff" }}
    />
  </div>
);

export default Loading;

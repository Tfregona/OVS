import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <div className="col-sm-4 py-2">
      <img
        src={spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading"
      />
    </div>
  );
};

export default Spinner;

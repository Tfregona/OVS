import React from "react";
import QSN from "../components/Homepage/QSN";
import Explain from "../components/Homepage/ExplainOVS";
import Quote from "../components/Homepage/Quote";

import HomeBackground from "../components/Weather/HomeBackground";

function home() {
  return (
    
    <div>
      <HomeBackground />
      <Explain />
      <Quote />
      <QSN />
    </div>
  );
}

export default home;

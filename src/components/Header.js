import React from "react";
import Tabs from "./Tabs";
import {Link} from "react-router-dom";

function Header({userInfo}) {
  return (
    <div className="container">
      <div className="nav">
        <div className="logo"><Link to="/home">Conduit</Link></div>
        <Tabs userInfo={userInfo} />
      </div>
    </div>
  );
}

export default Header;

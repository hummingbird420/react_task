import React from "react";
import { Col } from "reactstrap";
import ForgotPassword from "./ForgotPassword";
import logo from "../../assets/img/Tuso-New-Blue.png";
import { Link } from "react-router-dom";

function ForgotPass() {
  return (
    <div>
      <div className="position-md-absolute pt-4 ps-5">
        <Link to="/login">
          <img src={logo} alt="tuso logo" style={{ width: "200px" }} />
        </Link>
      </div>
      <Col lg={6} className="mt-md-0 mt-4">
        <ForgotPassword />
      </Col>
    </div>
  );
}

export default ForgotPass;

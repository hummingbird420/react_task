import React from "react";
import classes from "./spinner.module.scss";

function Spinner() {
  return (
    <div className="d-flex justify-content-center">
      <div className={classes.lds_ellipsis}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default Spinner;

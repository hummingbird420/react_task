import React from "react";
import { useSelector } from "react-redux";
import MenuItem from "./MenuItem";

function MenuItemWrapper() {
  const loggedInuser = useSelector((state) => state.login.data);

  return (
    <div
      className={`${
        loggedInuser?.role === "Administrator" ? "d-lg-flex" : ""
      } d-none`}
    >
      <MenuItem />
    </div>
  );
}

export default MenuItemWrapper;

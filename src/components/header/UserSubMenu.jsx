import React from "react";
import { Nav } from "react-bootstrap";
import { Circle } from "react-feather";
import { NavLink } from "react-router-dom";
import ChangePasswordModal from "./ChangePasswordModal";

function AdvanceNested({ user }) {
  const [open, setOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("modulePermission");
    window.location.href = "/login";
  };

  return (
    <div className=" bg-white py-2">
      <Nav.Item className="dropdown-hover rounded px-3 py-2">
        <NavLink
          to={`/user/view/${user?.oid}`}
          className="text-muted text-decoration-none py-3"
        >
          <Circle height={14} className="mb-1 me-1" />
          My Settings
        </NavLink>
      </Nav.Item>
      <Nav.Item className="dropdown-hover rounded px-3 py-2">
        <NavLink
          onClick={() => setOpen(true)}
          className="text-muted text-decoration-none py-3"
        >
          <Circle height={14} className="mb-1 me-1" />
          Change Password
        </NavLink>
      </Nav.Item>
      <Nav.Item className="dropdown-hover rounded px-3 py-2">
        <NavLink
          onClick={handleLogout}
          className="text-muted text-decoration-none py-3"
        >
          <Circle height={14} className="mb-1 me-1" />
          Logout
        </NavLink>
      </Nav.Item>
      <ChangePasswordModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default AdvanceNested;

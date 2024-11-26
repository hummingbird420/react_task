import React from "react";
import { Nav, Navbar, Offcanvas, Collapse, Button } from "react-bootstrap";
import {
  BsHouseFill,
  BsWalletFill,
  BsPeopleFill,
  BsGearFill,
} from "react-icons/bs";
import { ChevronDown, ChevronRight } from "react-feather";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/Tuso-New-Blue.png";

import SideMenu from "../menu/SideMenuMobile";
import { useSelector } from "react-redux";
import useMainMenuActive from "../../customHooks/useMainMenuActive";

function NavOffCanvas() {
  // const [active, setActive] = React.useState({
  //   dashBoard: false,
  //   ticket: false,
  //   user: false,
  //   configure: false,
  //   notification: false,
  // });
  // const location = useLocation();
  // const curretPath = location.pathname;
  const [show, setShow] = React.useState(false);
  const loggedInUser = useSelector((state) => state.login.data);
  const active = useMainMenuActive();

  // React.useEffect(() => {
  //   if (curretPath === "/") {
  //     setActive((prev) => ({
  //       ...prev,
  //       dashBoard: true,
  //       ticket: false,
  //       user: false,
  //       configure: false,
  //       notification: false,
  //     }));
  //   } else if (curretPath.startsWith("/ticket")) {
  //     setActive((prev) => ({
  //       ...prev,
  //       dashBoard: false,
  //       ticket: true,
  //       user: false,
  //       configure: false,
  //       notification: false,
  //     }));
  //   } else if (curretPath.startsWith("/config/")) {
  //     setActive((prev) => ({
  //       ...prev,
  //       dashBoard: false,
  //       ticket: false,
  //       user: false,
  //       configure: true,
  //       notification: false,
  //     }));
  //   } else if (curretPath.startsWith("/notification/")) {
  //     setActive((prev) => ({
  //       ...prev,
  //       dashBoard: false,
  //       ticket: false,
  //       user: false,
  //       configure: false,
  //       notification: true,
  //     }));
  //   } else if (curretPath.startsWith("/user/")) {
  //     setActive((prev) => ({
  //       ...prev,
  //       dashBoard: false,
  //       ticket: false,
  //       user: true,
  //       configure: false,
  //       notification: false,
  //     }));
  //   }
  // }, [curretPath]);
  return (
    <>
      <Navbar.Offcanvas
        id="nav-offcanvas"
        aria-labelledby="nav-offcanvas"
        placement="start"
        className={`${
          loggedInUser.role === "Administrator" ? "d-block" : "d-none"
        } d-lg-none w-75`}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="nav-offcanvas">
            <img src={logo} alt="" style={{ width: "100px" }} />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Link
              className={`text-decoration-none font-fallback default-fz py-2 ps-3  ${
                active.dashBoard
                  ? "orange-500 hover-orange-500"
                  : "text-black hover-black"
              }`}
              to={"/"}
            >
              <BsHouseFill
                size={18}
                className={`me-2 ${active.dashBoard ? "orange-500" : ""}`}
              />
              Home
            </Link>
            <Link
              className={`text-decoration-none font-fallback default-fz py-2 ps-3  ${
                active.ticket
                  ? "orange-500 hover-orange-500"
                  : "text-black hover-black"
              }`}
              to={`/ticket/${loggedInUser?.role?.toLowerCase()}/list`}
            >
              <BsWalletFill
                size={18}
                className={`me-2 ${
                  active.ticket ? "orange-500" : "text-black"
                }`}
              />
              Ticket
            </Link>
            <Link
              className={`text-decoration-none font-fallback default-fz py-2 ps-3 ${
                active.user
                  ? "orange-500 hover-orange-500"
                  : "text-black hover-black"
              }`}
              to={"/user/list"}
            >
              <BsPeopleFill
                size={18}
                className={`me-2 ${active.user ? "orange-500" : ""}`}
              />
              User
            </Link>
            <div>
              <Button
                onClick={() => {
                  setShow(!show);
                }}
                aria-controls="example-collapse-text"
                aria-expanded={show}
                className={`d-flex justify-content-between w-100 text-left bg-white border-0 font-fallback text-decoration-none font-fallback default-fz ps-3 my-2 text-black`}
              >
                <p className={`mb-0 ${active.configure ? "orange-500" : ""}`}>
                  <BsGearFill size={18} className={"me-2"} />
                  Settings
                </p>
                <p className={`mb-0 ${active.configure ? "orange-500" : ""}`}>
                  {show ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronRight size={20} className="" />
                  )}
                </p>
              </Button>
              <Collapse in={show}>
                <div id="example-collapse-text" className="">
                  <SideMenu />
                </div>
              </Collapse>
            </div>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </>
  );
}

export default NavOffCanvas;

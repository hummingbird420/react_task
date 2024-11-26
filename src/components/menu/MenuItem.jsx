import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BsHouseFill,
  BsWalletFill,
  BsPeopleFill,
  BsGearFill,
} from "react-icons/bs";
import useMainMenuActive from "../../customHooks/useMainMenuActive";

function MenuItem() {
  // const [active, setActive] = React.useState({
  //   dashBoard: false,
  //   ticket: false,
  //   user: false,
  //   configure: false,
  //   notification: false,
  // });
  // const location = useLocation();
  // const curretPath = location.pathname;
  const loggedInuser = useSelector((state) => state.login.data);
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
      <Link
        className="d-flex flex-column py-2 px-lg-3 mx-lg-3 text-decoration-none text-black text-center font-fallback text-muted default-fz"
        to="/"
      >
        <p className="mb-0">
          <BsHouseFill
            size={28}
            className={active.dashBoard ? "orange-500" : ""}
          />
        </p>
        <p className={`mb-0 ${active.dashBoard ? "orange-500" : ""} `}>Home</p>
      </Link>
      <Link
        className="d-flex flex-column py-2 default-fz px-lg-3 mx-lg-3 text-decoration-none text-black text-center font-fallback text-muted"
        to={`/ticket/${loggedInuser?.role?.toLowerCase()}/list`}
      >
        <p className={`mb-0`}>
          <BsWalletFill
            size={28}
            className={active.ticket ? "orange-500" : ""}
          />
        </p>
        <p className={`mb-0 ${active.ticket ? "orange-500" : ""} `}>Ticket</p>
      </Link>
      <Link
        className="d-flex flex-column py-2 default-fz px-lg-3 mx-lg-3 text-decoration-none text-black text-center font-fallback text-muted"
        to={"/user/list"}
      >
        <p className="mb-0 menu-user-icon">
          <BsPeopleFill size={28} className={active.user ? "orange-500" : ""} />
        </p>
        <p className={`mb-0 ${active.user ? "orange-500" : ""} `}>User</p>
      </Link>
      <Link
        className="d-flex flex-column py-2 default-fz px-lg-3 px-md-2 mx-lg-3 text-decoration-none text-black text-center font-fallback text-muted"
        to="/config/g/country"
      >
        <p className="mb-0 ">
          <BsGearFill
            size={28}
            className={active.configure ? "orange-500" : ""}
          />
        </p>
        <p className={`mb-0 ${active.configure ? "orange-500" : ""} `}>
          Settings
        </p>
      </Link>
    </>
  );
}

export default MenuItem;

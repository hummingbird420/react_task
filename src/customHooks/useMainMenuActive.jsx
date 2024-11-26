import React from "react";
import { useLocation } from "react-router-dom";

function useMainMenuActive() {
  const [active, setActive] = React.useState({
    dashBoard: false,
    ticket: false,
    user: false,
    configure: false,
    notification: false,
  });

  const location = useLocation();
  const curretPath = location.pathname;

  React.useEffect(() => {
    if (curretPath === "/") {
      setActive((prev) => ({
        ...prev,
        dashBoard: true,
        ticket: false,
        user: false,
        configure: false,
        notification: false,
      }));
    } else if (curretPath.startsWith("/ticket")) {
      setActive((prev) => ({
        ...prev,
        dashBoard: false,
        ticket: true,
        user: false,
        configure: false,
        notification: false,
      }));
    } else if (curretPath.startsWith("/config/")) {
      setActive((prev) => ({
        ...prev,
        dashBoard: false,
        ticket: false,
        user: false,
        configure: true,
        notification: false,
      }));
    } else if (curretPath.startsWith("/notification/")) {
      setActive((prev) => ({
        ...prev,
        dashBoard: false,
        ticket: false,
        user: false,
        configure: false,
        notification: true,
      }));
    } else if (curretPath.startsWith("/user/")) {
      setActive((prev) => ({
        ...prev,
        dashBoard: false,
        ticket: false,
        user: true,
        configure: false,
        notification: false,
      }));
    }
  }, [curretPath]);

  return active;
}

export default useMainMenuActive;

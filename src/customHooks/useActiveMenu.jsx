import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function useActiveMenu() {
  const [activeSide, setActiveSide] = useState({
    geography: false,
    category: false,
    role: false,
    team: false,
    module: false,
    priority: false,
    system: false,
    recovery: false,
  });

  // ! hooks are declared here
  const location = useLocation();
  const curretPath = location.pathname;

  useEffect(() => {
    if (curretPath.startsWith("/config/g/")) {
      setActiveSide((prev) => ({ ...prev, geography: true }));
    } else if (curretPath.startsWith("/config/a/category")) {
      setActiveSide((prev) => ({ ...prev, category: true }));
    } else if (curretPath.startsWith("/config/a/role")) {
      setActiveSide((prev) => ({ ...prev, role: true }));
    } else if (curretPath.startsWith("/config/a/team")) {
      setActiveSide((prev) => ({ ...prev, team: true }));
    } else if (curretPath.startsWith("/config/a/module")) {
      setActiveSide((prev) => ({ ...prev, module: true }));
    } else if (curretPath.startsWith("/config/a/priority")) {
      setActiveSide((prev) => ({ ...prev, priority: true }));
    } else if (curretPath.startsWith("/config/a/project")) {
      setActiveSide((prev) => ({ ...prev, system: true }));
    } else if (curretPath.startsWith("/config/a/admin/recovery")) {
      setActiveSide((prev) => ({ ...prev, recovery: true }));
    }
  }, [curretPath]);

  return activeSide;
}

export default useActiveMenu;

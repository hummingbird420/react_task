import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { getUserFromLocal } from "../pages/login/store";
import { getModuleFromLoacl } from "../pages/module/store";

function PrivateRouter({ pageId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);
  const approvedModules = useSelector((state) => state.module.modulePermission);
  const location = useLocation();

  const isModuleApproved = approvedModules?.find(
    (module) =>
      module.modules?.moduleName.toLowerCase() === pageId.toLowerCase()
  );

  useEffect(() => {
    dispatch(getModuleFromLoacl());
    dispatch(getUserFromLocal());
  }, [dispatch]);

  return isModuleApproved ? (
    <Outlet />
  ) : user.isLoggedIn ? (
    <Navigate to="/notpermit" state={{ from: location }} />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}

export default PrivateRouter;

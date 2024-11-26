import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userphoto from "../../assets/img/User-Icon.png";
import { API_URL } from "../../config";
import { getUerImage } from "../../pages/user/store";
import UserSubMenu from "../header/UserSubMenu";

function UserInfoCard({ user }) {
  // ! hooks are initialized here
  const dispatch = useDispatch();

  // ! get data from store
  const userImg = useSelector((state) => state.user.loginUserImage);

  // ! useEffects are declared here
  useEffect(() => {
    dispatch(getUerImage(user?.oid));
  }, [user, dispatch]);

  return (
    <div className="user-menu-card user-menu-hover position-absolute bg-white px-2 py-3 rounded-2 shadow-sm">
      <div className="d-flex align-items-center px-2">
        <img
          src={
            userImg
              ? `${API_URL}/tuso-api/profile-picture/key/${user?.oid}`
              : userphoto
          }
          alt=""
          className="rounded-circle me-4"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
        <div>
          <p className="mb-0 font-fallback default-fz fw-bold">{user.name}</p>
          <p className="mb-0 font-fallback font-size-16">{user.role}</p>
        </div>
      </div>
      <hr />
      <UserSubMenu user={user} />
    </div>
  );
}

export default UserInfoCard;

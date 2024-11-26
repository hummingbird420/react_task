import React from "react";

import userphoto from "../../assets/img/User-Icon.png";
import logo from "../../assets/img/Tuso-New-Blue.png";
import { Nav, Navbar } from "react-bootstrap";
import NavOffCanvas from "./NavOffCanvas";

import { useDispatch, useSelector } from "react-redux";
import MenuItemWrapper from "../menu/MenuItemWrapper";
import UserInfoCard from "../menu/UserInfoCard";
import { useEffect } from "react";
import { getUerImage } from "../../pages/user/store";
import { useReducer } from "react";
import { API_URL } from "../../config";

function TopNav() {
  // ! get data from store
  const user = useSelector((state) => state.login.data);
  const userImg = useSelector((state) => state.user.loginUserImage);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const { uploadImageSuccess } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUerImage(user?.oid));
  }, [user, dispatch]);

  useEffect(() => {
    if (uploadImageSuccess) {
      dispatch(getUerImage(user?.oid));
      forceUpdate();
    }
  }, [uploadImageSuccess, dispatch, user]);

  return (
    <Navbar bg="white" expand="lg" className="justify-content-between py-0">
      <Navbar.Toggle aria-controls="nav-offcanvas" />
      <div className="d-lg-block d-none">
        <Navbar.Brand href="#home">
          <img src={logo} alt="app logo" style={{ width: "150px" }} />
        </Navbar.Brand>
      </div>

      <div className="d-flex align-items-center">
        <MenuItemWrapper />

        <Nav.Link className="mx-3 px-3 show-nested position-relative py-3">
          <div>
            <img
              src={
                userImg
                  ? `${API_URL}/tuso-api/profile-picture/key/${user?.oid}`
                  : userphoto
              }
              alt="user photos"
              className="custom-user"
            />
          </div>
          <UserInfoCard user={user} />
        </Nav.Link>
      </div>
      <NavOffCanvas />
    </Navbar>
  );
}

export default TopNav;

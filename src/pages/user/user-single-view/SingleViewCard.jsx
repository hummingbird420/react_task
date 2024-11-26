import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { ArrowLeftCircle } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import userImage from "../../../assets/img/User-Icon.png";
import { API_URL } from "../../../config";

import { getUerImage, uploadProfileImg } from "../store";

function SingleViewCard() {
  // ! states are declared here
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  // ! hooks are initialized here
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { id } = useParams();
  const imagRef = useRef();

  // ! get data from redux store
  const user = useSelector((state) => state.user.selectedUser);
  const loggedInUser = useSelector((state) => state.login.data);
  const userImg = useSelector((state) => state.user.loginUserImage);
  const { uploadImageSuccess, uploadImageError } = useSelector(
    (state) => state.user
  );

  // ! handler functions are declared here
  const handleBackClick = () => {
    navigate(`/ticket/${loggedInUser?.role}/list`);
  };

  const hanldeImagUpload = (e) => {
    e.preventDefault();

    const formDta = new FormData();
    formDta.append("Ffile", file);

    const data = {
      id: user?.oid,
      image: formDta,
    };

    dispatch(uploadProfileImg(data));
  };

  // ! useEffects are declared here
  useEffect(() => {
    dispatch(getUerImage(loggedInUser?.oid));
  }, [loggedInUser, dispatch]);

  useEffect(() => {
    if (uploadImageSuccess) {
      dispatch(getUerImage(loggedInUser?.oid));
      imagRef.current.value = "";
      setImagePreviewUrl("");
      setFile(null);
    }
  }, [uploadImageSuccess, uploadImageError, dispatch, loggedInUser]);

  return (
    <>
      <Card className="shadow pb-5 mt-5">
        <CardHeader className="border-0 d-flex justify-content-between">
          <div className="mb-0">Profile Info</div>
          <div>
            <Button outline color="secondary" onClick={handleBackClick}>
              <ArrowLeftCircle size={18} className="mb-1" />
              &nbsp;Back to Ticket
            </Button>
          </div>
        </CardHeader>
        <CardBody className="px-5 py-3">
          <Row className="justify-content-between">
            <Col
              md={12}
              className="d-flex align-items-center position-relative"
            >
              <div>
                <label htmlFor="userProfilePic" style={{ cursor: "pointer" }}>
                  <img
                    className="single-user-view rounded-circle me-3"
                    src={
                      imagePreviewUrl
                        ? imagePreviewUrl
                        : userImg
                        ? `${API_URL}/tuso-api/profile-picture/key/${user?.oid}`
                        : userImage
                    }
                    alt="Img"
                  />
                </label>
                <input
                  id="userProfilePic"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="invisible opacity-0"
                  ref={imagRef}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setImagePreviewUrl(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </div>
              <div className="user-single-text position-absolute ">
                <h4 className="mb-0 text-capitalize default-fz">{`${user?.name} ${user?.surname}`}</h4>
                <p className="mb-0 default-fz">{user?.email}</p>
              </div>
            </Col>
            {imagePreviewUrl ? (
              <Col md={12} className="d-flex mt-3">
                <Button
                  color="info"
                  outline
                  className=""
                  onClick={hanldeImagUpload}
                >
                  Save
                </Button>
              </Col>
            ) : null}
          </Row>
          <Row className="mt-5">
            <Col md={6}>
              <h6 className="mb-0 default-fz">Full Name </h6>
              <p className="mb-0 text-capitalize default-fz">{`${user.name} ${user.surname}`}</p>
            </Col>

            <Col md={6}>
              <h6 className="mb-0 default-fz">Username </h6>
              <p className="mb-0 text-capitalize default-fz">{user.username}</p>
            </Col>
          </Row>
          <Row className="mt-5 default-fz">
            <Col md={6}>
              <h6 className="mb-0">Phone Number </h6>
              <p className="mb-0">{`${user.countryCode}${user.cellphone}`}</p>
            </Col>
            <Col md={6}>
              <h6 className="mb-0">Country</h6>
              <p className="mb-0 text-capitalize">Bangladesh</p>
            </Col>
          </Row>
          <Row className="mt-5 default-fz">
            <Col md={6}>
              <h6 className="mb-0">Role </h6>
              <p className="mb-0">{`${user.roles?.roleName}`}</p>
            </Col>
            <Col md={6}>
              <h6 className="mb-0">Status </h6>
              <p
                className={`mb-0 text-capitalize fw-bold ${
                  user.isAccountActive ? "text-info" : "text-danger"
                }`}
              >
                {user.isAccountActive ? "Active" : "Inactive"}
              </p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
}

export default SingleViewCard;

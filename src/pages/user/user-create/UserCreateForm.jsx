import React, { useEffect } from "react";

import { addUserData, checkUniqueUsername } from "../store";
import { getRoleData } from "../../role/store";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircle, CheckCircle } from "react-feather";
import { useState } from "react";
import createUserValidator from "../../../validator/createUserValidator";

function UserCreateForm() {
  // ! states are declared here
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [roleID, setRoleID] = useState("");
  const [username, setUsername] = useState("");
  const [validationResult, setValidationResult] = useState({});

  // ! hooks are initialized here
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ! get data from redux store
  const roles = useSelector((state) => state.role.data);
  const { uniqueUsername } = useSelector((state) => state.user);

  // ! handler functions are declared here
  useEffect(() => {
    dispatch(getRoleData());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const newIncident = {
      name: name,
      surname: surname,
      username: username,
      email: email,
      password: password,
      roleID: roleID,
      cellphone: cellphone,
      countryCode: countryCode,
      isAccountActive: true,
    };

    const validation = createUserValidator(newIncident);
    const filterObj = { roleID: 0, start: 0, limit: 10 };
    if (validation.isValid) {
      dispatch(addUserData({ newIncident, filterObj }));
      navigate("/user/list");
    } else {
      setValidationResult(validation);
    }
  };

  const handleReset = () => {
    navigate(-1);
  };

  // ! handle functions are started here
  const handleCountryChange = (e) => {
    const re = /^[+\d]?(?:[\d-.\s()]*)$/;
    if (
      (e.target.value === "" || re.test(e.target.value)) &&
      e.target.value.length <= 4
    ) {
      setCountryCode(e.target.value);
    }
  };

  const handleCellPhone = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setCellphone(e.target.value);
    }
  };

  const handleUserNameChange = (e) => {
    if (username?.length > 1) {
      dispatch(checkUniqueUsername(e?.target?.value));
    }
  };
  return (
    <Card className="border-0 shadow pt-4 pb-5">
      <CardBody className="px-md-5">
        <h2 className="display-6 font-fallback">Create User</h2>
        <hr className="pt-4" />
        <div className="text-center mb-2">
          All fields marked by <span className="orange-700">(*)</span> are
          mandatory
        </div>
        <Form onSubmit={onSubmit}>
          <Row className="gy-4">
            <Col md={12}>
              <div className="mb-1">
                <div className="d-flex justify-content-between align-items-center">
                  <Label className="form-label" for="name">
                    Name<span className="orange-700">*</span>
                  </Label>
                  {validationResult?.error?.name && (
                    <p className="text-danger">{validationResult.error.name}</p>
                  )}
                </div>
                <Input
                  name="name"
                  id="name"
                  type="text"
                  style={{ height: "50px" }}
                  placeholder="Enter name"
                  className={validationResult?.error?.name ? "is-invalid" : ""}
                  value={name}
                  onChange={(e) => {
                    const re = /^[a-zA-Z ]*$/;
                    if (e.target.value === "" || re.test(e.target.value)) {
                      setName(e.target.value);
                    }
                  }}
                />
              </div>
            </Col>
            <Col md={12}>
              <div className="mb-1">
                <div className="d-flex justify-content-between align-items-center">
                  <Label className="form-label" for="surname">
                    Surname<span className="orange-700">*</span>
                  </Label>
                  {validationResult?.error?.surname && (
                    <p className="text-danger">
                      {validationResult.error.surname}
                    </p>
                  )}
                </div>
                <Input
                  name="surname"
                  type="text"
                  id="surname"
                  style={{ height: "50px" }}
                  placeholder="Enter surname"
                  className={
                    validationResult?.error?.surname ? "is-invalid" : ""
                  }
                  value={surname}
                  onChange={(e) => {
                    const re = /^[a-zA-Z ]*$/;
                    if (e.target.value === "" || re.test(e.target.value)) {
                      setSurname(e.target.value);
                    }
                  }}
                />
              </div>
            </Col>

            <Col md={12}>
              <div className="mb-1">
                <div className="d-flex justify-content-between align-items-center">
                  <Label className="form-label" for="email">
                    Email
                  </Label>
                  {validationResult?.error?.email && (
                    <p className="text-danger">
                      {validationResult.error.email}
                    </p>
                  )}
                </div>
                <Input
                  placeholder="Enter email"
                  name="email"
                  type="email"
                  id="email"
                  style={{ height: "50px" }}
                  className={validationResult?.error?.email ? "is-invalid" : ""}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </Col>
            <Row className="align-items-center justify-content-center pe-0 mt-3">
              <div className="d-flex justify-content-between align-items-center">
                <Label className="form-label" for="cellphone">
                  Phone number<span className="orange-700">*</span>
                </Label>
                {(validationResult?.error?.cellphone ||
                  validationResult?.error?.countryCode) && (
                  <p className="text-danger">Required!</p>
                )}
              </div>
              <Col sm={3} xs={4} className="">
                <div className="mb-1">
                  <Input
                    placeholder="+260"
                    type="text"
                    name="countryCode"
                    id="countryCode"
                    style={{ height: "50px" }}
                    className={
                      validationResult?.error?.countryCode ? "is-invalid" : ""
                    }
                    value={countryCode}
                    onChange={handleCountryChange}
                  />
                </div>
              </Col>
              <Col sm={9} xs={8} className="pe-0">
                <div className="mb-1">
                  <Input
                    placeholder="Enter phone number"
                    type="text"
                    name="cellphone"
                    id="cellphone"
                    style={{ height: "50px" }}
                    className={
                      validationResult?.error?.cellphone ? "is-invalid" : ""
                    }
                    value={cellphone}
                    onChange={handleCellPhone}
                  />
                </div>
              </Col>
            </Row>
            <Col md={12}>
              <div className="mb-1">
                <div className="d-flex justify-content-between align-items-center">
                  <Label className="form-label" for="role">
                    Role<span className="orange-700">*</span>
                  </Label>
                  {validationResult?.error?.roleID && (
                    <p className="text-danger">
                      {validationResult.error.roleID}
                    </p>
                  )}
                </div>
                <Input
                  placeholder="Enter country"
                  type="select"
                  name="name"
                  id="role"
                  style={{ height: "50px" }}
                  className={
                    validationResult?.error?.roleID ? "is-invalid" : ""
                  }
                  value={roleID}
                  onChange={(e) => setRoleID(e.target.value)}
                >
                  <option value="">Select role</option>
                  {roles &&
                    roles.map((role) => (
                      <option key={role.oid} value={role.oid}>
                        {role.roleName}
                      </option>
                    ))}
                </Input>
              </div>
            </Col>
            <Col md={12}>
              <div className="mb-1">
                <div className="d-flex justify-content-between align-items-center">
                  <Label className="form-label" for="username">
                    Username<span className="orange-700">*</span>
                  </Label>
                  {validationResult?.error?.username && (
                    <p className="text-danger">
                      {validationResult.error.username}
                    </p>
                  )}
                </div>
                <Input
                  placeholder="Enter username"
                  name="username"
                  id="username"
                  type="text"
                  style={{ height: "50px" }}
                  className={
                    validationResult?.error?.username ? "is-invalid" : ""
                  }
                  value={username}
                  onChange={(e) => {
                    const re = /^[a-zA-Z0-9_-]*$/;
                    if (e.target.value === "" || re.test(e.target.value)) {
                      setUsername(e.target.value);
                      handleUserNameChange(e);
                    }
                  }}
                />
                {uniqueUsername && (
                  <p className="text-danger">Username already exists!</p>
                )}
              </div>
            </Col>
            <Col md={12}>
              <div className="mb-1">
                <div className="d-flex justify-content-between align-items-center">
                  <Label className="form-label" for="password">
                    Password<span className="orange-700">*</span>
                  </Label>
                  {validationResult?.error?.password && (
                    <p className="text-danger">
                      {validationResult.error.password}
                    </p>
                  )}
                </div>
                <Input
                  placeholder="Enter password"
                  type="password"
                  name="password"
                  id="password"
                  style={{ height: "50px" }}
                  className={
                    validationResult?.error?.password ? "is-invalid" : ""
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </Col>
          </Row>
          <div className="d-flex justify-content-start mt-4">
            <Button
              className="add-button border-0 px-4"
              type="submit"
              disabled={
                (username?.length < 5 && username?.length > 0) || uniqueUsername
              }
            >
              <CheckCircle size={18} className="me-2" />
              Save
            </Button>
            &nbsp;
            <Button
              outline
              color="secondary"
              className="px-4 default-fz"
              type="reset"
              onClick={handleReset}
            >
              <ArrowLeftCircle size={18} className="me-2" />
              Back
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}

export default UserCreateForm;

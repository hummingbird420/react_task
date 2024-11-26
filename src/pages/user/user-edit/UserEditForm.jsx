import React, { useEffect, useState } from "react";
import { getSingleUserData, updateUserData } from "../store";
import { getRoleData } from "../../role/store";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftCircle, CheckCircle } from "react-feather";
import editUserValidation from "../../../validator/editUserValidation";

function UserEditForm() {
  // ! states are declared here
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [roleID, setRoleID] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [validationResult, setValidationResult] = useState({});

  // ! hooks are initialized here
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // ! get data from redux store
  const currentUser = useSelector((state) => state.user.selectedUser);
  const roles = useSelector((state) => state.role.data);

  // ! useEffects hooks are initialized here
  useEffect(() => {
    dispatch(getRoleData());
    dispatch(getSingleUserData(id));
  }, [dispatch, id]);

  useEffect(() => {
    setName(currentUser.name);
    setSurname(currentUser.surname);
    setEmail(currentUser.email);
    setRoleID(currentUser.roleID);
    setCellphone(currentUser.cellphone);
    setCountryCode(currentUser.countryCode);
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationObj = {
      name: name,
      surname: surname,
      email: email,
      roleID: roleID,
      cellphone: cellphone,
      countryCode: countryCode,
    };

    const validation = editUserValidation(validationObj);
    if (validation.isValid) {
      const updatedUser = {
        ...currentUser,
        name: name,
        surname: surname,
        email: email,
        roleID: roleID,
        cellphone: cellphone,
        countryCode: countryCode,
      };
      console.log("updated user", updatedUser);
      dispatch(updateUserData(updatedUser));
      navigate("/user/list");
    } else {
      setValidationResult(validation);
    }
  };

  const handleReset = () => {
    setName(currentUser.name);
    setSurname(currentUser.surname);
    setEmail(currentUser.email);
    setRoleID(currentUser.roleID);
    setCellphone(currentUser.cellphone);
    setCountryCode(currentUser.countryCode);

    navigate("/user/list");
  };

  // ! handler functions are declared here
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

  return (
    <Layout>
      <Card className="border-0 shadow py-4">
        <CardBody className="px-md-5">
          <div className="display-6 font-fallback">Edit User</div>
          <hr className="py-2" />
          <div className="text-center mb-2">
            All fields marked by <span className="orange-700">(*)</span> are
            mandatory
          </div>
          <Form onSubmit={handleSubmit}>
            <Row className="">
              <Col md={12}>
                <FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="form-label" for="name">
                      Name<span className="orange-700">*</span>
                    </Label>
                    {validationResult?.error?.name && (
                      <p className="text-danger">
                        {validationResult.error.name}
                      </p>
                    )}
                  </div>
                  <Input
                    type="text"
                    id="name"
                    style={{ height: "50px" }}
                    className={validationResult?.error?.name && "is-invalid"}
                    name="name"
                    value={name}
                    onChange={(e) => {
                      const re = /^[a-zA-Z ]*$/;
                      if (e.target.value === "" || re.test(e.target.value)) {
                        setName(e.target.value);
                      }
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
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
                    type="text"
                    id="surname"
                    style={{ height: "50px" }}
                    name="surname"
                    className={validationResult?.error?.surname && "is-invalid"}
                    value={surname}
                    onChange={(e) => {
                      const re = /^[a-zA-Z ]*$/;
                      if (e.target.value === "" || re.test(e.target.value)) {
                        setSurname(e.target.value);
                      }
                    }}
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
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
                    type="text"
                    id="email"
                    name="email"
                    style={{ height: "50px" }}
                    className={validationResult?.error?.email && "is-invalid"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <Label for="exampleSelect">
                      Role<span className="orange-700">*</span>
                    </Label>
                    {validationResult?.error?.roleID && (
                      <p className="text-danger">
                        {validationResult.error.roleID}
                      </p>
                    )}
                  </div>
                  <Input
                    id="exampleSelect"
                    name="roleID"
                    className={validationResult?.error?.roleID && "is-invalid"}
                    type="select"
                    style={{ height: "50px" }}
                    value={roleID}
                    onChange={(e) => setRoleID(e.target.value)}
                  >
                    {roles &&
                      roles.map((role) => (
                        <option key={role.oid} value={role.oid} className=" ">
                          {role.roleName}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
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
                      min="0"
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
            </Row>
            <Row>
              <div className="d-flex mt-4 justify-content-start">
                <Button className="add-button border-0 px-4" type="submit">
                  <CheckCircle size={18} className="me-2" />
                  Save
                </Button>
                &nbsp;
                <Button
                  outline
                  color="secondary"
                  type="reset"
                  className="font-fallback px-4"
                  onClick={handleReset}
                >
                  <ArrowLeftCircle size={18} className="me-2" />
                  Back
                </Button>
              </div>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default UserEditForm;

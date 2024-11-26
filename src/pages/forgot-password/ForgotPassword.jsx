import React, { useState } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
} from "reactstrap";
import useWindowWidth from "../../customHooks/useWindowWidth";
import recoveryValidator from "../../validator/recoveryValidation";
import { clearSuccessAndError, passwordRecovery } from "../login/store";

function ForgotPassword() {
  // ! states are declared here
  const [userName, setUserName] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [validationResult, setValidationResult] = useState({});

  // ! hooks are declared here
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pixel361 = useWindowWidth(393);

  // ! get data from redux store
  const { passwordRecoverySuccess, passwordRecoveryError } = useSelector(
    (state) => state.login
  );

  // ! functions are declared her
  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = recoveryValidator({ userName, cellPhone });

    if (validation.isValid) {
      const data = {
        isDeleted: false,
        cellphoneCountryCode: "str",
        cellphone: cellPhone,
        username: userName,
        dateRequested: new Date().toISOString(),
        isRequestOpen: true,
        userAccountID: 0,
      };
      console.log("data", data);

      dispatch(passwordRecovery(data));
      setCellPhone("");
      setUserName("");
      setValidationResult({});
    } else {
      setValidationResult(validation);
    }
  };

  const dismissAlert = () => {
    dispatch(clearSuccessAndError());
  };

  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Container>
        <Col lg={6} className="mx-auto">
          <Card className="px-4 py-2 border-0 shadow">
            <h1 className="display-6 font-fallback text-center">
              Login Recovery Request
            </h1>
            <hr className="border border-2 border-dark mt-0" />
            <>
              <Alert
                isOpen={!!passwordRecoverySuccess}
                color="success"
                className="font-fallback default-fz"
                toggle={dismissAlert}
              >
                <CheckCircle size={18} className="mb-1 me-1" /> Your request is
                received. Please contact with Administrator
              </Alert>

              <Alert
                isOpen={!!passwordRecoveryError}
                color="danger"
                className="font-fallback default-fz"
                toggle={dismissAlert}
              >
                <XCircle size={18} className="mb-1 me-1" />
                {passwordRecoveryError?.includes("510")
                  ? "No Match Found"
                  : passwordRecoveryError?.includes("500")
                  ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                  : passwordRecoveryError?.includes("409")
                  ? "You have already sent a request.Please contact with the Administrator."
                  : passwordRecovery}
              </Alert>
            </>
            <Card className="">
              <CardHeader className="font-fallback font-size-22">
                Password Recovery
              </CardHeader>
              <CardBody className="py-4">
                <div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="font-fallback mb-0 ms-1 default-fz">
                      Username<span className="orange-700">*</span>
                    </Label>
                    {validationResult?.error?.userName && (
                      <p className="text-danger">
                        {validationResult.error.userName}
                      </p>
                    )}
                  </div>
                  <Input
                    type="text"
                    id="usename"
                    name="username"
                    maxLength={90}
                    className={
                      validationResult?.error?.userName && "is-invalid"
                    }
                    value={userName}
                    placeholder="Please enter username"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="font-fallback mb-0 ms-1 default-fz">
                      Cellphone (With country code)
                      <span className="orange-700">*</span>
                    </Label>
                    {validationResult?.error?.cellPhone && (
                      <p className="text-danger">
                        {validationResult.error.cellPhone}
                      </p>
                    )}
                  </div>
                  <Input
                    type="tel"
                    id="cellPhone"
                    name="cellphone"
                    maxLength={90}
                    className={
                      validationResult?.error?.cellPhone && "is-invalid"
                    }
                    value={cellPhone}
                    placeholder="+260XXXXXXXXX"
                    onChange={(e) => setCellPhone(e.target.value)}
                  />
                </div>
              </CardBody>
            </Card>
            <Card className="mt-4 py-md-3 py-2 text-center border-0">
              <div>
                <Button
                  className="add-button border-0 py-md-2"
                  onClick={handleSubmit}
                >
                  Submit Recovery Request
                </Button>
                &nbsp;
                <Button
                  className={`px-md-5 px-4 font-fallback default-fz py-md-2  ${
                    pixel361 && "recover_back__button__custom"
                  }`}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Back
                </Button>
              </div>
            </Card>
          </Card>
        </Col>
      </Container>
    </div>
  );
}

export default ForgotPassword;

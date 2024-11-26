import React from "react";
import { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/Tuso-New-Blue.png";
import source from "../../assets/img/Tuso-Login-Img.png";
import { clearSuccessAndError, getLoggedIn } from "./store";
import { Eye, EyeOff, XCircle } from "react-feather";
import { Alert, Label } from "reactstrap";
import loginValidator from "../../validator/loginValidator";
import useWindowWidth from "../../customHooks/useWindowWidth";

function Login() {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [validationResult, setValidationResult] = React.useState({});
  const [focus, setFocus] = React.useState(false);
  const [inpurType, setInputType] = React.useState("password");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pixel992 = useWindowWidth(992);
  const pixel576 = useWindowWidth(576);

  const { data, isLoggedIn, loginrequest, error } = useSelector(
    (state) => state.login
  );
  console.log(data, isLoggedIn, loginrequest, error);

  useEffect(() => {
    if (isLoggedIn && data.role === "Administrator") {
      navigate("/");
    } else if (isLoggedIn && data.role === "Supervisor") {
      navigate("/ticket/supervisor/list");
    } else if (isLoggedIn && data.role === "Expert") {
      navigate("/ticket/expert/list");
    } else if (isLoggedIn && data.role === "Agent") {
      navigate("/ticket/agent/list");
    } else if (isLoggedIn && data.role === "Client") {
      navigate("/ticket/client/list");
    } else if (error) {
      navigate("/login");
    }
  }, [isLoggedIn, error, data, navigate, dispatch]);

  /// handler for login
  const handleLogin = (e) => {
    e.preventDefault();

    const validation = loginValidator({ userName, password });

    if (validation.isValid) {
      dispatch(getLoggedIn({ userName, password }));
      setPassword("");
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
    <div className="login-wrapper overflow-hidden">
      <div
        className={`login_page d-flex justify-content-center align-items-center`}
      >
        <div className={`${pixel576 ? "" : ""}`}>
          <Alert
            isOpen={!!error}
            color="danger"
            className={`login__alert-custom font-fallback default-fz position-absolute ${
              pixel576 ? " w-100" : ""
            } `}
            toggle={dismissAlert}
          >
            <XCircle size={18} className="mb-1 me-1" />
            Incorrect Username or Password. Please Try again.
            {/* {addDistrictError} */}
          </Alert>
        </div>

        <Container fluid>
          <Row>
            <div className="app-content content px-0">
              <div className="content-wrapper">
                <div className="content-body">
                  {/* <div className="auth-wrapper auth-cover"> */}
                  <div className={`auth-inner row m-0 w-auto height-100vh`}>
                    <Col md={5} className="pt-3 d-lg-block d-none">
                      <a className="d-lg-inline-block" href="/">
                        <img
                          src={logo}
                          alt="tuso logo"
                          style={{ width: "200px" }}
                        />
                      </a>
                    </Col>

                    <div className="d-none d-lg-flex col-lg-8 align-items-start px-5 pt-5">
                      <div className="w-100 d-lg-flex align-items-center justify-content-center px-5 pt-5">
                        <img
                          className="img-fluid"
                          src={source}
                          alt="Tuso"
                          style={{ width: "1000px" }}
                        />
                      </div>
                    </div>
                    <div
                      className={`d-lg-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5 bg-white ${
                        !pixel992 ? "login__form-custom" : ""
                      }`}
                    >
                      <div className="d-block d-lg-none mt-2">
                        <img
                          src={logo}
                          alt="tuso logo"
                          style={{ width: pixel576 ? "100px" : "200px" }}
                        />
                      </div>
                      <div
                        className={`col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto ${
                          pixel992 ? "position_center" : ""
                        }`}
                      >
                        <h1 className="card-title fw-bold mb-3 text-center orange-500 font-fallback">
                          User Login
                        </h1>
                        <Form onSubmit={handleLogin} className="px-1">
                          <Form.Group className="mb-2">
                            <div className="d-flex justify-content-between align-items-center">
                              <Label
                                className="font-fallback mb-0 ms-1"
                                for="userName"
                              >
                                Username
                              </Label>
                              {validationResult?.error?.userName && (
                                <p className="text-danger">
                                  {validationResult.error.userName}
                                </p>
                              )}
                            </div>
                            <Form.Control
                              type="text"
                              id="userName"
                              className={
                                validationResult?.error?.userName &&
                                "is-invalid"
                              }
                              value={userName}
                              placeholder="Enter Your Username"
                              onChange={(e) => setUserName(e.target.value)}
                            />
                          </Form.Group>

                          {/* password field show hide */}
                          <Form.Group className="mb-2">
                            <div className="d-flex justify-content-between align-items-center">
                              <Label
                                className="font-fallback mb-0 ms-1"
                                for="password"
                              >
                                Password
                              </Label>
                              {validationResult?.error?.password && (
                                <p className="text-danger">
                                  {validationResult.error.password}
                                </p>
                              )}
                            </div>
                            <div
                              className={`d-flex align-items-center border rounded pe-3  ${
                                focus ? "custom_form-control" : ""
                              }`}
                            >
                              <Form.Control
                                type={inpurType}
                                id="passwords"
                                className={`${
                                  validationResult?.error?.password &&
                                  "is-invalid"
                                } border-0 remove_form-control`}
                                value={password}
                                spellCheck="false"
                                placeholder="Enter Your Password"
                                onFocus={() => {
                                  setFocus(true);
                                }}
                                onBlur={() => {
                                  setFocus(false);
                                }}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              {inpurType === "password" ? (
                                <Eye
                                  size={18}
                                  className={`mb-1 me-1 ${
                                    password ? "" : "d-none"
                                  }`}
                                  onClick={() => {
                                    setInputType("text");
                                  }}
                                />
                              ) : (
                                <EyeOff
                                  size={18}
                                  className={`mb-1 me-1 ${
                                    password ? "" : "d-none"
                                  }`}
                                  onClick={() => {
                                    setInputType("password");
                                  }}
                                />
                              )}

                              {/* <Eye size={18} className="" /> */}
                            </div>
                          </Form.Group>

                          <Button
                            type="submit"
                            className="w-100 mb-3 add-button border-0 py-1 mt-2 rounded"
                          >
                            Login
                          </Button>
                          <button
                            variant="outline-info"
                            className="w-100 py-1 rounded add-button-outline"
                            onClick={() => navigate("/forgot-password")}
                          >
                            Forgot password
                          </button>
                        </Form>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default Login;

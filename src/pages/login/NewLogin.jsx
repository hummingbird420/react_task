import React from "react";
import { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/Tuso-New-Blue.png";
import { getLoggedIn } from "./store";

function NewLogin() {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoggedIn, loginrequest, error } = useSelector(
    (state) => state.login
  );
  console.log(data, isLoggedIn, loginrequest, error);

  const makeTost = () => {
    toast.dismiss();
    toast("Invalid Username or Password", {
      icon: "❌",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };
  useEffect(() => {
    if (isLoggedIn && data.role === "Admin") {
      navigate("/");
    } else if (isLoggedIn && data.role === "Manager") {
      navigate("/ticket/manager/list");
    } else if (isLoggedIn && data.role === "Expert") {
      navigate("/ticket/experts/list");
    } else if (isLoggedIn && data.role === "Agent") {
      navigate("/ticket/agent/list");
    } else if (isLoggedIn && data.role === "Client") {
      navigate("/ticket/client/list");
    } else if (error) {
      navigate("/login");
      makeTost();
    }
    console.log("nvaigation done");
  }, [isLoggedIn, error, data, navigate]);

  /// handler for login
  const handleLogin = (e) => {
    e.preventDefault();
    if (userName === "" || password === "") {
      toast.dismiss();
      toast("Please fill all the fields", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      dispatch(getLoggedIn({ userName, password }));
    }
  };

  return (
    <div className="login-wrapper">
      <div className=" bg-white py-3 px-5 shadow-sm">
        <div className="ps-5">
          <img src={logo} alt="" style={{ width: "150px" }} className="" />
        </div>
      </div>
      <div className="login_page d-flex justify-content-center align-items-center ">
        <Container fluid>
          <Row>
            <Col lg={5} md={8} className="offset-lg-4 offset-md-2">
              <Card className="border-0 shadow py-lg-3 px-lg-4">
                <Card.Body>
                  <Card className="px-4 py-lg-4 py-4">
                    <div className="text-center py-4 orange-500">
                      <BsPersonCircle size={150} />
                    </div>
                    <h3 className="text-center mb-4 text-capitalize">
                      user login
                    </h3>

                    <Form onSubmit={handleLogin}>
                      <Form.Group className="mb-3">
                        <Form.Label className="font-fallback">
                          Username
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={userName}
                          placeholder="Enter your username"
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label className="font-fallback">
                          Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          value={password}
                          placeholder="Enter your password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                      <div className="mt-5">
                        <Button
                          type="submit"
                          className="w-100 mb-3 add-button border-0 py-1 rounded"
                        >
                          Login
                        </Button>
                        <button
                          variant="outline-info"
                          className="w-100 py-1 rounded add-button-outline"
                          onClick={() => navigate("/forgot-password")}
                          // onClick={() => navigate("/admin/recovery")}
                        >
                          Forgot password
                        </button>
                      </div>
                    </Form>
                  </Card>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Toaster
            reverseOrder={false}
            containerStyle={{
              position: "absolute",
              top: "20%",
              // left: "10%",
            }}
          />
        </Container>
      </div>
    </div>
  );
}

export default NewLogin;

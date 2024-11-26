import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, clearPasswordchange } from "../../pages/login/store";

// ** Reactstrap Imports
import {
  Card,
  Form,
  Modal,
  Label,
  Input,
  Button,
  CardBody,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { ArrowLeftCircle, CheckCircle } from "react-feather";
import { useState } from "react";
import Swal from "sweetalert2";
import passwordValidator from "../../validator/passwordValidator";

// ** Third Party Components

function ChangePasswordModal({ open, setOpen }) {
  const [isMatch, setIsMatch] = useState(true);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationResult, setValidationResult] = useState({});
  const dispatch = useDispatch();
  const {
    data: loggedInUser,
    changePasswordSuccess,
    changePasswordError,
  } = useSelector((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isMatch) {
      const validation = passwordValidator({
        password,
        newPassword,
        confirmPassword,
      });

      if (validation.isValid) {
        const newIncident = {
          userName: loggedInUser.username,
          password: password,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        };

        console.log("newIncident", newIncident);
        dispatch(changePassword(newIncident));
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setValidationResult({});
      } else {
        setValidationResult(validation);
      }
    }
  };

  const handleReset = () => {
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setValidationResult({});
    setOpen(false);
  };

  useEffect(() => {
    if (changePasswordSuccess) {
      Swal.fire({
        icon: "success",
        title: "Password Changed Successfully",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        dispatch(clearPasswordchange());
        setOpen(false);
        localStorage.removeItem("user");
        localStorage.removeItem("modulePermission");
        window.location.href = "/login";
      });
    } else if (changePasswordError) {
      Swal.fire({
        icon: "error",
        title: "Wrong Current Password",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        dispatch(clearPasswordchange());
      });
    }
  }, [changePasswordSuccess, changePasswordError, dispatch, setOpen]);

  return (
    <>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        className="modal-dialog-centered"
      >
        <ModalHeader className="bg-transparent" toggle={() => setOpen(!open)}>
          <h3 className="text-center mb-1 defaul-fz">Change Your Password</h3>
        </ModalHeader>

        <ModalBody className="">
          <Card className="border-0">
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <div className="mb-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="form-label" for="password">
                      Current Password
                    </Label>
                    {validationResult?.error?.password && (
                      <p className="text-danger">
                        {validationResult?.error?.password}
                      </p>
                    )}
                  </div>
                  <Input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Enter Current Password"
                    className={
                      validationResult?.error?.password && "is-invalid"
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="form-label" for="newPassword">
                      New Password
                    </Label>
                    {validationResult?.error?.newPassword && (
                      <p className="text-danger">
                        {validationResult?.error?.newPassword}
                      </p>
                    )}
                  </div>
                  <Input
                    name="newPassword"
                    id="newPassword"
                    type="password"
                    className={
                      !isMatch || validationResult?.error?.newPassword
                        ? "is-invalid"
                        : ""
                    }
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      // if (confirmPassword !== e.target.value) {
                      //   setIsMatch(false);
                      // } else if (confirmPassword === e.target.value) {
                      //   setIsMatch(true);
                      // }
                    }}
                  />
                </div>
                <div className="mb-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="form-label" for="confirmPassword">
                      Confirm Password
                    </Label>
                    {!isMatch ? (
                      <p className="text-danger">Password doesn't match!</p>
                    ) : validationResult?.error?.confirmPassword ? (
                      <p className="text-danger">
                        {validationResult?.error?.confirmPassword}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <Input
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    className={
                      !isMatch || validationResult?.error?.confirmPassword
                        ? "is-invalid"
                        : ""
                    }
                    placeholder="Enter Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (newPassword !== e.target.value) {
                        setIsMatch(false);
                      } else if (newPassword === e.target.value) {
                        setIsMatch(true);
                      }
                    }}
                  />
                </div>
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
              </Form>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ChangePasswordModal;

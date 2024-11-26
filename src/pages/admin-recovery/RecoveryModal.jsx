import React from "react";
import { useState } from "react";
import { ArrowLeftCircle, CheckCircle } from "react-feather";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
} from "reactstrap";
import recoveryAdminValidator from "../../validator/recoveryAdminValidator";
import { adminRecoveyPassword } from "../login/store";

function RecoveryModal({
  open,
  userId,
  setOpen,
  setIsPasswordMatch,
  recoveryID,
}) {
  // ! states are declared here
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationResult, setValidationResult] = useState({});

  // ! hooks are declared here
  const dispatch = useDispatch();

  // ! get data from redux store

  // ! functions are declared here
  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = recoveryAdminValidator({
      password: newPassword,
      confirmPassword,
    });

    if (validation.isValid) {
      const data = {
        password: newPassword,
        confirmPassword: confirmPassword,
        userAccountID: userId,
        requestID: recoveryID,
      };
      console.log(data);
      dispatch(adminRecoveyPassword(data));
      setIsPasswordMatch(true);
      setNewPassword("");
      setConfirmPassword("");
      setValidationResult({});
      setOpen(!open);
    } else {
      setValidationResult(validation);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setNewPassword("");
    setConfirmPassword("");
    setValidationResult({});
    setOpen(!open);
  };

  return (
    <>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        size="lg"
        className="modal-dialog-centered"
      >
        <ModalBody className="">
          <h3 className="mb-1 font-fallback display-6">Recover Password</h3>
          <hr className="border border-2 border-dark my-4" />
          <Card className="">
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <div className="mb-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="form-label" for="newPassword">
                      New Password<span className="orange-700">*</span>
                    </Label>
                    {validationResult?.error?.password && (
                      <p className="text-danger">
                        {validationResult?.error?.password}
                      </p>
                    )}
                  </div>
                  <Input
                    placeholder="Enter New Password"
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    className={
                      validationResult?.error?.password ? "is-invalid" : ""
                    }
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mb-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="form-label" for="confirmPassword">
                      Confirm Password<span className="orange-700">*</span>
                    </Label>
                    {validationResult?.error?.confirmPassword && (
                      <p className="text-danger">
                        {validationResult?.error?.confirmPassword}
                      </p>
                    )}
                  </div>
                  <Input
                    placeholder="Enter Confirm Password"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={
                      validationResult?.error?.confirmPassword
                        ? "is-invalid"
                        : ""
                    }
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-start mt-4">
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

export default RecoveryModal;

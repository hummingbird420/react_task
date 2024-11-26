import React from "react";
import { ArrowLeftCircle, CheckCircle } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import { addSystemPermissionData } from "../../system-permission/store";

function SystemPermissionModal({ open, setOpen }) {
  // ! states are declared here
  const [systemID, setSystemID] = React.useState("");
  const [emptySystemID, setEmptySystemID] = React.useState(false);

  // ! hooks are declared here
  const dispatch = useDispatch();

  // ! get data from the redux store
  const projects = useSelector((state) => state.project.data);
  const selectedUser = useSelector((state) => state.user.selectedUser);

  // ! handler functions are declared here
  const handleSubmit = (e) => {
    e.preventDefault();
    if (systemID === "") {
      setEmptySystemID(true);
    } else {
      const data = {
        userAccountID: selectedUser?.oid,
        systemID,
        isDeleted: false,
      };
      console.log("data", data);
      dispatch(addSystemPermissionData(data));
      setSystemID("");
      setEmptySystemID(false);
      setOpen(false);
    }
  };

  const handleReset = () => {
    setSystemID("");
    setEmptySystemID(false);
    setOpen(false);
  };
  return (
    <>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        size="lg"
        className="modal-dialog-centered"
      >
        <ModalBody className="pb-4">
          <p className="mb-1 font-fallback display-6">System Permission</p>
          <hr className="border border-2 border-dark my-4" />
          <Card className="">
            <CardBody>
              <Row>
                <Col md="5" sm="6" className="font-fallback font-size-20">
                  Name
                </Col>
                <Col md="7" sm="6" className="font-fallback font-size-20">
                  {selectedUser && selectedUser.name}
                </Col>
              </Row>
              <div className="mt-3">
                <FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <Label
                      for="moduleID"
                      className="font-fallback default-fz mb-0 ms-1"
                    >
                      System
                    </Label>
                    {emptySystemID && (
                      <p className="text-danger">Please select an option!</p>
                    )}
                  </div>
                  <Input
                    type="select"
                    value={systemID}
                    name="moduleID"
                    className={emptySystemID ? "is-invalid" : ""}
                    id="moduleID"
                    onChange={(e) => setSystemID(e.target.value)}
                  >
                    <option value="">Select System</option>
                    {projects &&
                      projects.map((item) => (
                        <option key={item.oid} value={item.oid}>
                          {item.title}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
              </div>
              <div className="d-flex justify-content-start">
                <Button
                  className=" add-button border-0 px-4"
                  type="submit"
                  onClick={handleSubmit}
                >
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
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
}

export default SystemPermissionModal;

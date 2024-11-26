/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { Fragment } from "react";
import {
  Modal,
  Button,
  ModalBody,
  Label,
  Input,
  Col,
  Row,
  ModalHeader,
} from "reactstrap";
import { ArrowLeftCircle, CheckCircle } from "react-feather";

const AssignToModal = ({ open, setOpen }) => {
  const toggle = () => {
    setOpen(!open);
  };

  const handleReset = () => {
    toggle();
  };

  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        className="modal-dialog-centered p-0"
      >
        <ModalHeader toggle={toggle} className="font-fallback default-fz">
          Assign to
        </ModalHeader>
        <ModalBody className="py-5">
          <div>
            <Row>
              <Col md={12} className="d-flex mb-3 align-items-center">
                <Label for="teamID">Team</Label>
                <span className="w-100 px-3 ms-4">
                  <Input type="text" id="teamID" />
                </span>
              </Col>
              <Col md={12} className="d-flex align-items-center">
                <Label for="memberID">Member</Label>
                <span className="w-100 px-3">
                  <Input type="select" id="memberID">
                    <option>Team 1</option>
                    <option>Team 2</option>
                    <option>Team 3</option>
                  </Input>
                </span>
              </Col>
            </Row>
          </div>
          <div className="d-flex mt-4 justify-content-end pe-3">
            <Button
              outline
              color="secondary"
              className="font-fallback px-4"
              onClick={handleReset}
            >
              <ArrowLeftCircle size={18} className="me-2" />
              Back
            </Button>
            <Button className="ms-4 add-button border-0 px-4" type="submit">
              <CheckCircle size={18} className="me-2" />
              Save
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default AssignToModal;

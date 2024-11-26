/* eslint-disable comma-dangle */
/* eslint-disable semi */

import { Fragment } from "react";
import { updatePriorityData } from "./store";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Form,
  Modal,
  Label,
  Input,
  Button,
  CardBody,
  ModalBody,
} from "reactstrap";
import { ArrowLeftCircle, CheckCircle } from "react-feather";
import { useState } from "react";
import { useEffect } from "react";

const EditPriorityModal = ({ open, setOpen }) => {
  // ! state are declared here
  const [priorityName, setPriorityName] = useState("");
  const [emptyField, setEmptyField] = useState(false);

  // ! hooks are declared here
  const dispatch = useDispatch();

  // ! get data from the redux store
  const { selectedPriority } = useSelector((state) => state.priority);

  const handleReset = () => {
    setPriorityName("");
    setEmptyField(false);
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (priorityName !== "") {
      const newIncident = {
        ...selectedPriority,
        priority: priorityName,
      };

      dispatch(updatePriorityData(newIncident));
      handleReset();
    } else {
      setEmptyField(true);
    }
  };

  useEffect(() => {
    if (selectedPriority) {
      setPriorityName(selectedPriority.priority);
    }
  }, [selectedPriority]);

  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        className="modal-dialog-centered"
        size="lg"
      >
        <ModalBody className="">
          <h3 className="font-fallback display-6">Edit Priority</h3>
          <hr className="border border-2 border-dark my-4" />
          <Card className="">
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <div className="mb-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="form-label" for="priorityName">
                      Priority <span className="orange-700">*</span>
                    </Label>
                    {emptyField && <p className="text-danger">Required!</p>}
                  </div>

                  <Input
                    placeholder="Enter priority"
                    id="priorityName"
                    name="priorityName"
                    maxLength={90}
                    className={emptyField ? "is-invalid" : ""}
                    value={priorityName}
                    onChange={(e) => setPriorityName(e.target.value)}
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
                    onClick={() => handleReset()}
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
    </Fragment>
  );
};

export default EditPriorityModal;

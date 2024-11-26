/* eslint-disable comma-dangle */
/* eslint-disable semi */

import { Fragment } from "react";
import { updateProjectData } from "./store";
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
import editProjectValidator from "../../validator/editProjectValidaton";

const EditProjectModal = ({ open, setOpen }) => {
  // ! state are declared here
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [validationResult, setValidationResult] = useState({});

  // ! hooks are declared here
  const dispatch = useDispatch();

  // ! get data from the redux store
  const { selectedProject } = useSelector((state) => state.project);

  const handleReset = () => {
    setProjectName("");
    setDescription("");
    setValidationResult({});
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = editProjectValidator({ projectName, description });

    if (validation.isValid) {
      const newIncident = {
        ...selectedProject,
        title: projectName,
        description: description,
      };

      dispatch(updateProjectData(newIncident));
      handleReset();
    } else {
      setValidationResult(validation);
    }
  };

  useEffect(() => {
    if (selectedProject) {
      setProjectName(selectedProject.title);
      setDescription(selectedProject.description);
    }
  }, [selectedProject]);

  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        className="modal-dialog-centered"
        size="lg"
      >
        <ModalBody className="">
          <h4 className="mb-1 font-fallback display-6">Edit System</h4>
          <hr className="border border-2 border-dark my-4" />
          <Card className="">
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <div className="mb-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="form-label" for="title">
                      System <span className="orange-700">*</span>
                    </Label>
                    {validationResult?.error?.projectName && (
                      <p className="text-danger">
                        {validationResult?.error?.projectName}
                      </p>
                    )}
                  </div>
                  <Input
                    placeholder="Edit system"
                    id="title"
                    name="title"
                    type="text"
                    maxLength={90}
                    className={
                      validationResult?.error?.projectName ? "is-invalid" : ""
                    }
                    value={projectName}
                    onChange={(e) => {
                      setProjectName(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="form-label" for="description">
                      Description <span className="orange-700">*</span>
                    </Label>
                    {validationResult?.error?.description && (
                      <p className="text-danger">
                        {validationResult?.error?.description}
                      </p>
                    )}
                  </div>
                  <Input
                    placeholder="Description"
                    id="description"
                    name="description"
                    type="textarea"
                    maxLength={250}
                    className={
                      validationResult?.error?.description ? "is-invalid" : ""
                    }
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
                    onClick={() => {
                      handleReset();
                    }}
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

export default EditProjectModal;

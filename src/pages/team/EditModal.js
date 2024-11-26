/* eslint-disable comma-dangle */
/* eslint-disable semi */
// ** React Imports
import { Fragment } from "react";
import { updateTeamData } from "./store";
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
import editTeamValidator from "../../validator/editTeamValidator";

const EditTeamModal = ({ open, setOpen }) => {
  // ! state are declared here
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [validationResult, setValidationResult] = useState({});

  // ! hooks are declared here
  const dispatch = useDispatch();

  // ! get data from the redux store
  const selectedTeam = useSelector((state) => state.team.selectedTeam);

  const handleReset = () => {
    setTeamName("");
    setDescription("");
    setValidationResult({});
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = editTeamValidator({ teamName, description });

    if (validation.isValid) {
      const newIncident = {
        ...selectedTeam,
        title: teamName,
        description: description,
      };
      dispatch(updateTeamData(newIncident));
      handleReset();

      setOpen(false);
    } else {
      setValidationResult(validation);
    }
  };

  useEffect(() => {
    if (selectedTeam) {
      setTeamName(selectedTeam.title);
      setDescription(selectedTeam.description);
    }
  }, [selectedTeam]);

  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        className="modal-dialog-centered"
        size="lg"
      >
        {/* <ModalBody className="px-sm-5 mx-50 pb"> */}
        <ModalBody className="">
          <h3 className="mb-1 font-fallback display-6">Edit Team</h3>
          <hr className="border border-2 border-dark my-4" />
          <Card className="">
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <div className="mb-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="form-label" for="title">
                      Team <span className="orange-700">*</span>
                    </Label>
                    {validationResult?.error?.teamName && (
                      <p className="text-danger">
                        {validationResult?.error?.teamName}
                      </p>
                    )}
                  </div>
                  <Input
                    placeholder="Enter team name"
                    value={teamName}
                    maxLength={90}
                    id="title"
                    name="title"
                    className={
                      validationResult?.error?.teamName ? "is-invalid" : ""
                    }
                    onChange={(e) => setTeamName(e.target.value)}
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
                    className={
                      validationResult?.error?.description ? "is-invalid" : ""
                    }
                    type="textarea"
                    maxLength={250}
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

export default EditTeamModal;

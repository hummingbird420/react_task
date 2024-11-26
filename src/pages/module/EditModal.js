/* eslint-disable comma-dangle */
/* eslint-disable semi */
// ** React Imports
import { Fragment } from "react";
import { updateModuleData } from "./store";
import { useDispatch, useSelector } from "react-redux";

// ** form dependencies
import { useForm, Controller } from "react-hook-form";

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
import { useEffect } from "react";

// ** Third Party Components

const EditModuleModal = ({ open, setOpen }) => {
  const [moduleName, setModuleName] = useState("");
  const [description, setDescription] = useState("");
  const { selectedModule } = useSelector((state) => state.module);
  const dispatch = useDispatch();
  // ** Hooks for form
  const handleReset = () => {
    setModuleName("");
    setDescription("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIncident = {
      ...selectedModule,
      moduleName: moduleName,
      description: description,
    };

    dispatch(updateModuleData(newIncident));
    handleReset();
    setOpen(false);
  };

  useEffect(() => {
    if (selectedModule) {
      setModuleName(selectedModule.moduleName);
      setDescription(selectedModule.description);
    }
  }, [selectedModule]);
  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        className="modal-dialog-centered"
        size="lg"
      >
        {/* <ModalHeader
          className="bg-transparent"
          toggle={() => setOpen(!open)}
        ></ModalHeader> */}
        {/* <ModalBody className="px-sm-5 mx-50 pb"> */}
        <ModalBody className="">
          <h3 className="mb-1 font-fallback display-4">Edit Module</h3>
          <hr className="border border-2 border-dark my-4" />
          <Card className="">
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <div className="mb-1">
                  <Label className="form-label" for="moduleName">
                    Module
                  </Label>
                  <Input
                    placeholder="Module"
                    name="moduleName"
                    id="moduleName"
                    maxLength={90}
                    value={moduleName}
                    onChange={(e) => setModuleName(e.target.value)}
                  />
                </div>
                <div className="mb-1">
                  <Label className="form-label" for="description">
                    Description
                  </Label>
                  <Input
                    placeholder="Description"
                    id="description"
                    name="description"
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
                      setOpen(false);
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

export default EditModuleModal;

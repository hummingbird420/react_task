/* eslint-disable comma-dangle */
/* eslint-disable semi */
// ** React Imports
import { Fragment } from "react";
import { addTeamData } from "./store";
import { useDispatch } from "react-redux";

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

// ** Third Party Components

const AddTeamModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  // ** Hooks for form
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      const newIncident = {
        title: data.title,
        description: data.description,
      };

      dispatch(addTeamData(newIncident));
      reset();
      setOpen(false);
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  const handleReset = () => {
    reset({
      title: "",
      description: "",
    });
    setOpen(false);
  };

  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        size="lg"
        className="modal-dialog-centered"
      >
        {/* <ModalHeader
          className="bg-transparent"
          toggle={() => setOpen(!open)}
        ></ModalHeader> */}
        {/* <ModalBody className="px-sm-5 mx-50 pb"> */}
        <ModalBody className="">
          <h3 className="mb-1 font-fallback display-6">Add Team</h3>
          <hr className="border border-2 border-dark my-4" />
          <Card className="">
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-1">
                  <Label className="form-label" for="title">
                    Team Name
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="title"
                    name="title"
                    render={({ field }) => (
                      <Input
                        placeholder="Enter Team Name"
                        maxLength={90}
                        invalid={errors.title && true}
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="mb-1">
                  <Label className="form-label" for="description">
                    Description
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="description"
                    name="description"
                    render={({ field }) => (
                      <Input
                        placeholder="Description"
                        type="textarea"
                        maxLength={250}
                        invalid={errors.description && true}
                        {...field}
                      />
                    )}
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
    </Fragment>
  );
};

export default AddTeamModal;

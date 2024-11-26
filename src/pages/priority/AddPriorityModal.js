/* eslint-disable comma-dangle */
/* eslint-disable semi */

import { Fragment } from "react";
import { addPriorityData } from "./store";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
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

const AddPriorityModal = ({ open, setOpen }) => {
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
        priority: data.priority,
      };

      dispatch(addPriorityData(newIncident));
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
      priority: "",
    });
    setOpen(false);
  };

  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        className="modal-dialog-centered"
        size="lg"
      >
        <ModalBody className="">
          <h3 className="mb-1 font-fallback display-6">Add Priority</h3>
          <hr className="border border-2 border-dark my-4" />
          <Card className="">
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-1">
                  <Label className="form-label" for="priority">
                    Priority
                  </Label>
                  <Controller
                    defaultValue=""
                    control={control}
                    id="priority"
                    name="priority"
                    render={({ field }) => (
                      <Input
                        placeholder="Enter priority"
                        maxLength={90}
                        invalid={errors.priority && true}
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

export default AddPriorityModal;

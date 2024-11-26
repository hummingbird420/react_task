/* eslint-disable comma-dangle */
/* eslint-disable semi */
// ** React Imports
import { Fragment } from "react";
import { updateCountryData } from "./store";
import { useDispatch, useSelector } from "react-redux";

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
} from "reactstrap";
import { ArrowLeftCircle, CheckCircle } from "react-feather";
import { useState } from "react";
import { useEffect } from "react";

// ** Third Party Components

const EditCountryModal = ({ open, setOpen }) => {
  const [countryName, setCountryName] = useState("");
  const [emptyField, setEmptyField] = useState(false);

  const dispatch = useDispatch();

  const selectedCountry = useSelector((state) => state.country.selectedCountry);
  // ** Hooks for form

  const handleSubmit = (e) => {
    e.preventDefault();

    if (countryName === "") {
      setEmptyField(true);
    } else {
      const newIncident = {
        ...selectedCountry,
        countryName: countryName,
      };
      dispatch(updateCountryData(newIncident));
      setEmptyField(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      setCountryName(selectedCountry.countryName);
    }
  }, [selectedCountry]);

  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        className="modal-dialog-centered"
        size="lg"
      >
        <ModalBody className="">
          <div className="display-6 font-fallback">Edit Country </div>
          <hr className="border border-2 border-dark my-4" />
          <Card className="border-0">
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <div className="mb-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="form-label" for="countryName">
                      Country <span className="orange-700">*</span>
                    </Label>
                    {emptyField && <p className="text-danger">Required!</p>}
                  </div>
                  <Input
                    placeholder="Country Name"
                    id="countryName"
                    name="countryName"
                    maxLength={90}
                    className={emptyField ? "is-invalid" : ""}
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
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
                    onClick={() => {
                      setEmptyField(false);
                      setOpen(false);
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

export default EditCountryModal;

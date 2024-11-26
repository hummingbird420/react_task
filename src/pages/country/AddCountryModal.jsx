/* eslint-disable comma-dangle */
/* eslint-disable semi */
// ** React Imports
import { Fragment } from "react";
import { addCountryData } from "./store";
import { useDispatch } from "react-redux";

// ** Reactstrap Imports
import {
  Card,
  Modal,
  Label,
  Input,
  Button,
  CardBody,
  ModalBody,
  Row,
  Col,
} from "reactstrap";
import { ArrowLeftCircle, CheckCircle } from "react-feather";
import { useState } from "react";

const AddCountryModal = ({ open, setOpen }) => {
  // ! states are declared here
  const [countryName, setCountryName] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  // ! hooks are declared here
  const dispatch = useDispatch();

  // ! functions are declared here
  const onSubmit = () => {
    if (!countryName) {
      setIsEmpty(true);
    } else {
      const newIncident = {
        countryName: countryName,
      };
      dispatch(addCountryData(newIncident));
      setCountryName("");
      setIsEmpty(false);
      setOpen(false);
    }
  };

  const handleReset = () => {
    setCountryName("");
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
          <div className="display-6 font-fallback">Add Country </div>
          <hr className="border border-2 border-dark my-4" />
          <Card className="">
            <CardBody>
              <Row>
                <Col className="font-fallback default-fz">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="form-label" for="name">
                      Country Name <span className="orange-700">*</span>
                    </Label>
                    {isEmpty && <p className="text-danger">Required!</p>}
                  </div>
                  <Input
                    id="facilityName"
                    type="text"
                    value={countryName}
                    maxLength={90}
                    autoFocus={true}
                    className={isEmpty ? "is-invalid" : ""}
                    onChange={(e) => setCountryName(e.target.value)}
                  />
                </Col>
              </Row>
              <div className="d-flex justify-content-start my-2">
                <Button
                  className="me-2 add-button border-0 px-4"
                  onClick={onSubmit}
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
    </Fragment>
  );
};

export default AddCountryModal;

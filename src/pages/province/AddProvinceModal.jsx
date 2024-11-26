/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { Fragment } from "react";
import { addProvinceData } from "./store";
import { useDispatch, useSelector } from "react-redux";

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

const AddProvinceModal = ({ open, setOpen }) => {
  // ! states are declared here
  const [provinceName, setProvinceName] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  // ! hooks are declared here
  const dispatch = useDispatch();

  // ! get data from redux store
  const country = useSelector((state) => state.country.selectedCountry);

  // ! handler functions are declared here
  const onSubmit = () => {
    if (!provinceName) {
      setIsEmpty(true);
    } else {
      const newIncident = {
        provinceName: provinceName,
        countryID: country.oid,
      };

      dispatch(addProvinceData(newIncident));
      setProvinceName("");
      setIsEmpty(false);
      setOpen(false);
    }
  };

  const handleReset = () => {
    setProvinceName("");
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
          <div className="display-6 font-fallback">Add Province</div>
          <hr className="border border-2 border-dark my-4" />
          <Card className="">
            <CardBody>
              <Row className="my-3">
                <Col md={5} className="font-fallback default-fz">
                  Country Name
                </Col>
                <Col md={7} className="font-fallback default-fz">
                  {country?.countryName}
                </Col>
              </Row>
              <Row>
                <Col className="font-fallback default-fz">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="form-label" for="name">
                      Province Name
                    </Label>
                    {isEmpty && <p className="text-danger">Required!</p>}
                  </div>
                  <Input
                    id="facilityName"
                    maxLength={90}
                    type="text"
                    value={provinceName}
                    className={isEmpty ? "is-invalid" : ""}
                    onChange={(e) => setProvinceName(e.target.value)}
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

export default AddProvinceModal;

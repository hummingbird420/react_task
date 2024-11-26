/* eslint-disable comma-dangle */
/* eslint-disable semi */
// ** React Imports
import { Fragment } from "react";
import { addFacilityData } from "./store";
import { useDispatch, useSelector } from "react-redux";
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

const AddFacilityModal = ({ open, setOpen }) => {
  // ! states are declared here
  const [facilityName, setFacilityName] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  // ! hooks are declared here
  const dispatch = useDispatch();

  // ! get data from redux store
  const country = useSelector((state) => state.country.selectedCountry);
  const province = useSelector((state) => state.province.selectedProvince);
  const district = useSelector((state) => state.district.selectedDistrict);

  // ** Hooks for form

  const onSubmit = () => {
    if (!facilityName) {
      console.log("empty");
      setIsEmpty(true);
    } else {
      const newIncident = {
        facilityName: facilityName,
        districtID: district.oid,
      };
      console.log("newIncident", newIncident);
      dispatch(addFacilityData(newIncident));
      setFacilityName("");
      setIsEmpty(false);
      setOpen(false);
    }
  };

  const handleReset = () => {
    setFacilityName("");
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
          <div className="display-6 font-fallback">Add Facility</div>
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
              <Row className="my-3">
                <Col md={5} className="font-fallback default-fz">
                  Province Name
                </Col>
                <Col md={7} className="font-fallback default-fz">
                  {province?.provinceName}
                </Col>
              </Row>
              <Row className="my-3">
                <Col md={5} className="font-fallback default-fz">
                  District Name
                </Col>
                <Col md={7} className="font-fallback default-fz">
                  {district?.districtName}
                </Col>
              </Row>
              <Row>
                <Col className="font-fallback default-fz">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="form-label" for="name">
                      Facility Name
                    </Label>
                    {isEmpty && <p className="text-danger">Required!</p>}
                  </div>
                  <Input
                    id="facilityName"
                    type="text"
                    maxLength={90}
                    value={facilityName}
                    className={isEmpty ? "is-invalid" : ""}
                    onChange={(e) => setFacilityName(e.target.value)}
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

export default AddFacilityModal;

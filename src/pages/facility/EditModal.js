/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { Fragment } from "react";
import { updateFacilityData } from "./store";
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
  Row,
  Col,
} from "reactstrap";
import { ArrowLeftCircle, CheckCircle } from "react-feather";
import { useState, useEffect } from "react";

const EditFacilityModal = ({ open, setOpen }) => {
  // ! state are declared here
  const [facilityName, setFacilityName] = useState("");
  const [districtID, setDistrictID] = useState("");
  const [emptyField, setEmptyField] = useState(false);

  // ! hooks are declared here
  const dispatch = useDispatch();

  // ! get data from the redux store
  const selectedFacility = useSelector(
    (state) => state.facility.selectedFacility
  );
  const selectedDistrict = useSelector(
    (state) => state.district.selectedDistrict
  );
  const selectedProvince = useSelector(
    (state) => state.province.selectedProvince
  );
  const selectedCountry = useSelector((state) => state.country.selectedCountry);

  // ! handler functions are declared here
  const handleSubmit = (e) => {
    e.preventDefault();
    if (facilityName === "") {
      setEmptyField(true);
    } else {
      const newIncident = {
        ...selectedFacility,
        facilityName: facilityName,
        districtID: districtID,
      };

      dispatch(updateFacilityData(newIncident));
      setEmptyField(false);
      setOpen(false);
    }
  };

  // ! useEffect hooks are declared here
  useEffect(() => {
    if (selectedFacility) {
      setFacilityName(selectedFacility.facilityName);
      setDistrictID(selectedFacility.districtID);
    }
  }, [selectedFacility]);

  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        className="modal-dialog-centered"
        size="lg"
      >
        <ModalBody className="">
          <h3 className="display-6 font-fallback">Edit Facility</h3>
          <hr className="border border-2 border-dark my-4" />
          <Card className="border-0">
            <CardBody>
              <Row className="my-3">
                <Col md={5} className="font-fallback default-fz">
                  Country Name
                </Col>
                <Col md={7} className="font-fallback default-fz">
                  {selectedCountry?.countryName}
                </Col>
              </Row>
              <Row className="my-3">
                <Col md={5} className="font-fallback default-fz">
                  Province Name
                </Col>
                <Col md={7} className="font-fallback default-fz">
                  {selectedProvince?.provinceName}
                </Col>
              </Row>
              <Row className="my-3">
                <Col md={5} className="font-fallback default-fz">
                  District Name
                </Col>
                <Col md={7} className="font-fallback default-fz">
                  {selectedDistrict?.districtName}
                </Col>
              </Row>
              <Form onSubmit={handleSubmit}>
                <div className="mb-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="form-label" for="name">
                      Facility <span className="orange-700">*</span>
                    </Label>
                    {emptyField && <p className="text-danger">Required!</p>}
                  </div>
                  <Input
                    placeholder="Facility Name"
                    type="text"
                    id="facilityName"
                    maxLength={90}
                    name="facilityName"
                    className={emptyField ? "is-invalid" : ""}
                    value={facilityName}
                    onChange={(e) => setFacilityName(e.target.value)}
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

export default EditFacilityModal;

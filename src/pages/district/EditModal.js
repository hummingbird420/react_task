/* eslint-disable comma-dangle */
/* eslint-disable semi */
// ** React Imports
import { Fragment } from "react";
import { updateDistrictData } from "./store";
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
import { useState } from "react";
import { useEffect } from "react";

const EditDistrictModal = ({ open, setOpen }) => {
  // ! state are declared here
  const [districtName, setDistrictName] = useState("");
  const [provinceID, setProvinceID] = useState("");
  const [emptyField, setEmptyField] = useState(false);

  // ! hooks are declared here
  const dispatch = useDispatch();

  // ! get data from the redux store
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
    if (districtName === "") {
      setEmptyField(true);
    } else {
      const newIncident = {
        ...selectedDistrict,
        districtName: districtName,
        provinceID: provinceID,
      };

      dispatch(updateDistrictData(newIncident));
      setEmptyField(false);
      setOpen(false);
    }
  };

  // ! useEffect hooks are declared here
  useEffect(() => {
    if (selectedDistrict) {
      setDistrictName(selectedDistrict.districtName);
      setProvinceID(selectedDistrict.provinceID);
    }
  }, [selectedDistrict]);

  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        className="modal-dialog-centered"
        size="lg"
      >
        <ModalBody className="">
          <h3 className="display-6 font-fallback">Edit District</h3>
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
              <Form onSubmit={handleSubmit}>
                <div className="mb-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="form-label" for="name">
                      District <span className="orange-700">*</span>
                    </Label>
                    {emptyField && <p className="text-danger">Required!</p>}
                  </div>
                  <Input
                    placeholder="District Name"
                    type="text"
                    id="districtName"
                    name="districtName"
                    maxLength={90}
                    className={emptyField ? "is-invalid" : ""}
                    value={districtName}
                    onChange={(e) => setDistrictName(e.target.value)}
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

export default EditDistrictModal;

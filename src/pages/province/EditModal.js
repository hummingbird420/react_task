/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { Fragment } from "react";
import { updateProvinceData } from "./store";
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

const EditProvinceModal = ({ open, setOpen }) => {
  // ! state are declared here
  const [provinceName, setProvinceName] = useState(null);
  const [countryID, setCountryID] = useState(null);
  const [emptyField, setEmptyField] = useState(false);

  // ! hooks are initialize here
  const dispatch = useDispatch();

  // ! get data from the redux store
  const selectedProvince = useSelector(
    (state) => state.province.selectedProvince
  );
  const selectedCountry = useSelector((state) => state.country.selectedCountry);

  // ! handler functions are declared here
  const handleSubmit = (e) => {
    e.preventDefault();
    if (provinceName === "") {
      setEmptyField(true);
    } else {
      const newIncident = {
        ...selectedProvince,
        provinceName: provinceName,
        countryID: countryID,
      };

      dispatch(updateProvinceData(newIncident));
      setEmptyField(false);
      setOpen(false);
    }
  };

  // ! useEffect hooks are declared here
  useEffect(() => {
    if (selectedProvince) {
      setProvinceName(selectedProvince.provinceName);
      setCountryID(selectedProvince.countryID);
    }
  }, [selectedProvince, dispatch]);

  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        className="modal-dialog-centered"
        size="lg"
      >
        <ModalBody className="">
          <h3 className="display-6 font-fallback">Edit Province</h3>
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
              <Form onSubmit={handleSubmit}>
                <div className="mb-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="form-label" for="name">
                      Province <span className="orange-700">*</span>
                    </Label>
                    {emptyField && <p className="text-danger">Required!</p>}
                  </div>
                  <Input
                    placeholder="Province"
                    value={provinceName}
                    maxLength={90}
                    name="provinceName"
                    id="provinceName"
                    className={emptyField ? "is-invalid" : ""}
                    onChange={(e) => {
                      setProvinceName(e.target.value);
                    }}
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

export default EditProvinceModal;

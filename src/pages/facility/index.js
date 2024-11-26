/* eslint-disable semi */
import { useEffect } from "react";
import { clearSuccessAndError } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button, Alert } from "reactstrap";
// import { getDistrictData } from "../district/store";
import Layout from "../../components/layout/Layout";
import FacilityTable from "./FacilityTable";
import {
  ArrowLeftCircle,
  CheckCircle,
  PlusCircle,
  XCircle,
} from "react-feather";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddFacilityModal from "./AddFacilityModal";
import CustomAlert from "../../components/alert/CustomAlert";

// ** Demo Components

function CountryInformation() {
  // ! states are declared here
  const [open, setOpen] = useState(false);

  // ! hooks are declared here
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ! get from the redux store

  const {
    updateFacilitySuccess,
    addFacilitySuccess,
    deleteFacilitySuccess,
    deleteFacilityError,
    updateFacilityError,
    addFacilityError,
  } = useSelector((state) => state.facility);

  useEffect(() => {
    // dispatch(getDistrictData());
    dispatch(clearSuccessAndError());
  }, [dispatch]);

  // ! handler functions are declared here
  const dismissAlert = () => {
    dispatch(clearSuccessAndError());
  };

  return (
    <Layout>
      <Row>
        <Col sm="12">
          <div className="display-6 font-fallback">Facility</div>
          <hr className="border border-2 border-dark my-4" />
          {/* <>
            <Alert
              isOpen={!!addFacilitySuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record saved
              successfully
            </Alert>
            <Alert
              isOpen={!!updateFacilitySuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record updated
              successfully
            </Alert>
            <Alert
              isOpen={!!deleteFacilitySuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record deleted
              successfully
            </Alert>
            <Alert
              isOpen={!!deleteFacilityError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              Something went wrong, please try after sometimes! If you are
              experiencing similar frequently, please report it to helpdesk.
            </Alert>
            <Alert
              isOpen={!!addFacilityError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              {addFacilityError?.includes("409")
                ? "Duplicate data found"
                : addFacilityError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
            <Alert
              isOpen={!!updateFacilityError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              {updateFacilityError?.includes("409")
                ? "Duplicate data found"
                : updateFacilityError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
          </> */}
          <CustomAlert
            addSuccess={addFacilitySuccess}
            addError={addFacilityError}
            updateSuccess={updateFacilitySuccess}
            updateError={updateFacilityError}
            deleteSuccess={deleteFacilitySuccess}
            deleteError={deleteFacilityError}
            dismissAlert={dismissAlert}
          />

          <Card className="px-4 py-4 border-0 shadow overflow-auto">
            <div className="mb-3 d-flex justify-content-between align-items-center responsive_table_class">
              <Button
                className="add-button border-0 font-fallback default-fz"
                onClick={() => setOpen(!open)}
              >
                <PlusCircle size={20} className="me-1 mb-1" /> Add Facility
              </Button>
              <Button
                outline
                color="secondary"
                className="font-fallback default-fz px-3"
                onClick={() => navigate(-1)}
              >
                <ArrowLeftCircle size={20} className="me-1 mb-1" /> Back
              </Button>
            </div>
            <FacilityTable />
          </Card>
        </Col>
        <AddFacilityModal open={open} setOpen={setOpen} />
      </Row>
    </Layout>
  );
}

export default CountryInformation;

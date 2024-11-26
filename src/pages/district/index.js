/* eslint-disable semi */
import { useEffect } from "react";
import { clearSuccessAndError } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button, Alert } from "reactstrap";
// import { getProvinceData } from "../province/store";
import Layout from "../../components/layout/Layout";
import DistrictTable from "./DistrictTable";
import {
  ArrowLeftCircle,
  CheckCircle,
  PlusCircle,
  XCircle,
} from "react-feather";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddDistrictModal from "./AddDistrictModal";
import CustomAlert from "../../components/alert/CustomAlert";

function CountryInformation() {
  // ! states are declared here
  const [open, setOpen] = useState(false);

  //! hooks are declared here
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    deleteDistrictSuccess,
    deleteDistrictError,
    addDistrictSuccess,
    updateDistrictSuccess,
    addDistrictError,
    updateDistrictError,
  } = useSelector((state) => state.district);

  useEffect(() => {
    // dispatch(getProvinceData());
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
          <div className="display-6 font-fallback">District</div>
          <hr className="border border-2 border-dark my-4" />

          {/* <>
            <Alert
              isOpen={!!addDistrictSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record saved
              successfully
            </Alert>
            <Alert
              isOpen={!!updateDistrictSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record updated
              successfully
            </Alert>
            <Alert
              isOpen={!!deleteDistrictSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record deleted
              successfully
            </Alert>
            <Alert
              isOpen={!!deleteDistrictError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              {deleteDistrictError?.includes("405")
                ? "This record cannot be deleted. It is already in use."
                : deleteDistrictError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
            <Alert
              isOpen={!!addDistrictError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              {addDistrictError?.includes("409")
                ? "Duplicate data found"
                : addDistrictError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
            <Alert
              isOpen={!!updateDistrictError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              {updateDistrictError?.includes("409")
                ? "Duplicate data found"
                : updateDistrictError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
          </> */}
          <CustomAlert
            addSuccess={addDistrictSuccess}
            addError={addDistrictError}
            deleteSuccess={deleteDistrictSuccess}
            deleteError={deleteDistrictError}
            updateSuccess={updateDistrictSuccess}
            updateError={updateDistrictError}
            dismissAlert={dismissAlert}
          />
          <Card className="px-4 py-4 border-0 shadow overflow-auto">
            <div className="mb-3 d-flex justify-content-between align-items-center responsive_table_class">
              <Button
                className="add-button border-0 font-fallback default-fz"
                onClick={() => setOpen(!open)}
              >
                <PlusCircle size={20} className="me-1 mb-1" /> Add District
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
            <DistrictTable />
          </Card>
        </Col>
        <AddDistrictModal open={open} setOpen={setOpen} />
      </Row>
    </Layout>
  );
}

export default CountryInformation;

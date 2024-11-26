/* eslint-disable semi */
import { useEffect } from "react";
import { clearSuccessAndError } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button, Alert } from "reactstrap";
// import { getCountryData } from "../country/store";
import Layout from "../../components/layout/Layout";
import ProvinceTable from "./ProvinceTable";
import {
  ArrowLeftCircle,
  CheckCircle,
  PlusCircle,
  XCircle,
} from "react-feather";
import { useState } from "react";
import AddProvinceModal from "./AddProvinceModal";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../../components/alert/CustomAlert";

function CountryInformation() {
  // ! state are declared here
  const [open, setOpen] = useState(false);

  //! hooks are declared here
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ! get data from the redux store

  const {
    updateProvinceSuccess,
    addProvinceSuccess,
    deleteProvinceSuccess,
    deleteProvinceError,
    updateProvinceError,
    addProvinceError,
  } = useSelector((state) => state.province);

  useEffect(() => {
    // dispatch(getProvinceData());
    // dispatch(getCountryData());
    dispatch(clearSuccessAndError());
  }, [dispatch]);
  // ! handler functions are declared here
  const dismissAlert = () => {
    dispatch(clearSuccessAndError());
  };

  return (
    <Layout>
      <Row>
        <div>
          <div className="display-6 font-fallback">Province</div>
          <hr className="border border-2 border-dark my-4" />

          {/* <>
            <Alert
              isOpen={!!addProvinceSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record saved
              successfully
            </Alert>
            <Alert
              isOpen={!!updateProvinceSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record updated
              successfully
            </Alert>
            <Alert
              isOpen={!!deleteProvinceSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record deleted
              successfully
            </Alert>
            <Alert
              isOpen={!!deleteProvinceError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              {deleteProvinceError?.includes("405")
                ? "This record cannot be deleted. It is already in use."
                : deleteProvinceError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
            <Alert
              isOpen={!!addProvinceError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              {addProvinceError?.includes("409")
                ? "Duplicate data found"
                : addProvinceError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
            <Alert
              isOpen={!!updateProvinceError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              {updateProvinceError?.includes("409")
                ? "Duplicate data found"
                : updateProvinceError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
          </> */}
          <CustomAlert
            addSuccess={addProvinceSuccess}
            addError={addProvinceError}
            updateSuccess={updateProvinceSuccess}
            updateError={updateProvinceError}
            deleteSuccess={deleteProvinceSuccess}
            deleteError={deleteProvinceError}
            dismissAlert={dismissAlert}
          />

          <Col sm="12">
            <Card className="px-4 py-4 border-0 shadow overflow-auto">
              <div className="mb-3 d-flex justify-content-between align-items-center responsive_table_class">
                <Button
                  className="add-button border-0 font-fallback default-fz"
                  onClick={() => setOpen(!open)}
                >
                  <PlusCircle size={20} className=" me-1 mb-1" /> Add Province
                </Button>
                <Button
                  outline
                  color="secondary"
                  className="font-fallback default-fz px-3"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeftCircle size={20} className=" me-1 mb-1" /> Back
                </Button>
              </div>
              <ProvinceTable />
            </Card>
          </Col>
        </div>
      </Row>
      <AddProvinceModal open={open} setOpen={setOpen} />
    </Layout>
  );
}

export default CountryInformation;

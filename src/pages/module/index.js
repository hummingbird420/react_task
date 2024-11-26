/* eslint-disable semi */
// ** React Imports
// import { useContext } from "react";
import { useEffect } from "react";
import { clearSuccessAndError, getModuleData } from "./store";
import { useSelector, useDispatch } from "react-redux";

// ** Reactstrap Imports
import { Row, Col, Card, Alert } from "reactstrap";

import Layout from "../../components/layout/Layout";

import { CheckCircle, XCircle } from "react-feather";
import ModuleTable from "./ModuleTable";
import CustomAlert from "../../components/alert/CustomAlert";

function CountryInformation() {
  // const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    updateModuleSuccess,
    addModuleSuccess,
    deleteModuleSuccess,
    deleteModuleError,
    updateModuleError,
    addModuleError,
  } = useSelector((state) => state.module);

  useEffect(() => {
    dispatch(getModuleData());
    dispatch(clearSuccessAndError());
  }, [dispatch]);

  const dismissAlert = () => {
    dispatch(clearSuccessAndError());
  };

  return (
    <Layout>
      <Row>
        <Col sm="12">
          <div className="display-6 font-fallback">Module</div>
          <hr className="border border-2 border-dark my-4" />
          {/* <>
            <Alert
              isOpen={!!addModuleSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record saved
              successfully
            </Alert>
            <Alert
              isOpen={!!updateModuleSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record updated
              successfully
            </Alert>
            <Alert
              isOpen={!!deleteModuleSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record deleted
              successfully
            </Alert>
            <Alert
              isOpen={!!deleteModuleError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              {deleteModuleError}
            </Alert>
            <Alert
              isOpen={!!addModuleError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" /> {addModuleError}
            </Alert>
            <Alert
              isOpen={!!updateModuleError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              {updateModuleError}
            </Alert>
          </> */}
          <CustomAlert
            addSuccess={addModuleSuccess}
            addError={addModuleError}
            updateSuccess={updateModuleSuccess}
            updateError={updateModuleError}
            deleteSuccess={deleteModuleSuccess}
            deleteError={deleteModuleError}
            dismissAlert={dismissAlert}
          />
          <Card className="px-4 py-4 border-0 shadow">
            <div className="mb-3 d-flex justify-content-between align-items-center"></div>
            <ModuleTable />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default CountryInformation;

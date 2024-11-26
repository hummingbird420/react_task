/* eslint-disable semi */

import { useEffect } from "react";
import { clearSuccessAndError, getProjectData } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button, Alert } from "reactstrap";
import Layout from "../../components/layout/Layout";
import ProjectTable from "./ProjectTable";
import { CheckCircle, PlusCircle, XCircle } from "react-feather";
import { useState } from "react";
import AddProjectModal from "./AddProjectModal";
import CustomAlert from "../../components/alert/CustomAlert";

function CountryInformation() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    deleteProjectSuccess,
    deleteProjectError,
    updateProjectError,
    addProjectError,
    updateProjectSuccess,
    addProjectSuccess,
  } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(getProjectData());
    dispatch(clearSuccessAndError());
  }, [dispatch]);

  // ! alert handler
  const dismissAlert = () => {
    dispatch(clearSuccessAndError());
  };

  return (
    <Layout>
      <Row>
        <Col sm="12">
          <div className="display-6 font-fallback">System</div>
          <hr className="border border-2 border-dark my-4" />

          {/* <>
            <Alert
              isOpen={!!addProjectSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record saved
              successfully
            </Alert>
            <Alert
              isOpen={!!updateProjectSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record updated
              successfully
            </Alert>
            <Alert
              isOpen={!!deleteProjectSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record deleted
              successfully
            </Alert>
            <Alert
              isOpen={!!deleteProjectError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              Something went wrong, please try after sometimes! If you are
              experiencing similar frequently, please report it to helpdesk.
            </Alert>
            <Alert
              isOpen={!!addProjectError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              {addProjectError?.includes("409")
                ? "Duplicate data found"
                : addProjectError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
            <Alert
              isOpen={!!updateProjectError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              {updateProjectError?.includes("409")
                ? "Duplicate data found"
                : updateProjectError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
          </> */}

          <CustomAlert
            addSuccess={addProjectSuccess}
            addError={addProjectError}
            updateSuccess={updateProjectSuccess}
            updateError={updateProjectError}
            deleteSuccess={deleteProjectSuccess}
            deleteError={deleteProjectError}
            dismissAlert={dismissAlert}
          />
          <Card className="px-4 py-4 border-0 shadow mb-5 overflow-auto">
            <div className="mb-3 d-flex justify-content-between align-items-center responsive_table_class">
              <Button
                className="add-button border-0 font-fallback default-fz"
                onClick={() => setOpen(!open)}
              >
                <PlusCircle size={20} className=" mb-1" />
                &nbsp;Add System
              </Button>
            </div>
            <ProjectTable />
          </Card>
        </Col>
        <AddProjectModal open={open} setOpen={setOpen} />
      </Row>
    </Layout>
  );
}

export default CountryInformation;

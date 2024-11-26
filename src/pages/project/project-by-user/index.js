import React from "react";
import { useEffect } from "react";
import {
  ArrowLeftCircle,
  CheckCircle,
  PlusCircle,
  XCircle,
} from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card, Col, Row } from "reactstrap";
import Layout from "../../../components/layout/Layout";
import { clearSuccessAndError } from "../../system-permission/store";
import { getProjectData, getSystemPermissionByRoleId } from "../store";
import ProjectByUserTable from "./ProjectByUserTable";
import SystemPermissionModal from "./SystemPermissionModal";

function SystemByRole() {
  // ! state are declared here
  const [open, setOpen] = React.useState(false);

  //! hooks are declared here
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // ! get data from the redux store
  const {
    deleteSystemPermissionError,
    deleteSystemPermissionSuccess,
    addSystemPermissionError,
    addSystemPermissionSuccess,
  } = useSelector((state) => state.systemPermission);

  // ! handler functions are declared here
  const dismissAlert = () => {
    dispatch(clearSuccessAndError());
  };

  // ! handle useEffect here
  useEffect(() => {
    dispatch(getSystemPermissionByRoleId(id));
    dispatch(getProjectData());
  }, [dispatch, id]);

  return (
    <Layout>
      <Row>
        <Col md="12">
          <>
            <Alert
              isOpen={!!addSystemPermissionSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record saved
              successfully
            </Alert>

            <Alert
              isOpen={!!deleteSystemPermissionSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record deleted
              successfully
            </Alert>
            <Alert
              isOpen={!!deleteSystemPermissionError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              {deleteSystemPermissionError?.includes("405")
                ? "This record cannot be deleted. It is already in use."
                : deleteSystemPermissionError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
            <Alert
              isOpen={!!addSystemPermissionError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              {addSystemPermissionError?.includes("409")
                ? "Duplicate data found"
                : addSystemPermissionError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
          </>
          <Card className="px-4 py-4 border-0 shadow">
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <Button
                className="add-button border-0 font-fallback default-fz"
                onClick={() => setOpen(!open)}
              >
                <PlusCircle size={20} className=" mb-1" />
                &nbsp;Add System
              </Button>
              <Button
                outline
                color="secondary"
                className="font-fallback default-fz px-3"
                onClick={() => navigate(-1)}
              >
                <ArrowLeftCircle size={20} className=" me-1" /> Back
              </Button>
            </div>
            <ProjectByUserTable />
          </Card>
        </Col>
        <SystemPermissionModal open={open} setOpen={setOpen} />
      </Row>
    </Layout>
  );
}

export default SystemByRole;

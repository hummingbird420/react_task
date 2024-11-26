import React, { useEffect, useState } from "react";
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
import {
  clearSuccessAndError,
  getModuleData,
  getModulePermissionByRoleId,
} from "../../module/store";
import { getSingleRoleData } from "../store";

import ModulePermissionModal from "./ModulePermissionModal";
import ModuleTable from "./ModuleTable";

function ModuleByRole() {
  // ! state are declared here
  const [open, setOpen] = useState(false);
  //! hooks are declared here
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // ! get data from the redux store
  const {
    deleteModulePermissionError,
    addModulePermissionError,
    deleteModulePermissionSuccess,
    addModulePermissionSuccess,
  } = useSelector((state) => state.module);

  // ! handler functions are declared here
  const dismissAlert = () => {
    dispatch(clearSuccessAndError());
  };

  // ! handle useEffect here
  useEffect(() => {
    dispatch(getSingleRoleData(id));
    dispatch(getModulePermissionByRoleId(id));
    dispatch(getModuleData());
    dispatch(clearSuccessAndError());
  }, [dispatch, id]);

  return (
    <Layout>
      <Row>
        <Col md={12}>
          <div className="display-6 font-fallback ">Module</div>
          <hr className="border border-2 border-dark my-4" />

          {/* alet */}
          <>
            <Alert
              isOpen={!!addModulePermissionSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record saved
              successfully
            </Alert>
            <Alert
              isOpen={!!deleteModulePermissionSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record deleted
              successfully
            </Alert>
            <Alert
              isOpen={!!deleteModulePermissionError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              {deleteModulePermissionError?.includes("405")
                ? "This record cannot be deleted. It is already in use."
                : deleteModulePermissionError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
            <Alert
              isOpen={!!addModulePermissionError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              {addModulePermissionError?.includes("409")
                ? "Duplicate data found"
                : addModulePermissionError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
          </>
          <Card className="px-4 py-4 border-0 shadow overflow-auto">
            <div className="mb-3 d-flex justify-content-between align-items-center responsive_table_class">
              <Button
                className="add-button border-0 font-fallback default-fz"
                onClick={() => setOpen(!open)}
              >
                <PlusCircle size={20} className="mb-1 mb-1" /> Create Permission
              </Button>
              <Button
                outline
                color="secondary"
                className="font-fallback default-fz px-4"
                onClick={() => navigate(-1)}
              >
                <ArrowLeftCircle size={20} className=" me-1 mb-1" /> Back
              </Button>
            </div>
            <ModuleTable />
          </Card>
        </Col>
        <ModulePermissionModal open={open} setOpen={setOpen} />
      </Row>
    </Layout>
  );
}

export default ModuleByRole;

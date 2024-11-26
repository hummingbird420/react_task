/* eslint-disable semi */

import { useEffect } from "react";
import { clearSuccessAndError, getRoleData } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Alert } from "reactstrap";
import Layout from "../../components/layout/Layout";
import RoleTable from "./RoleTable";
import { CheckCircle, XCircle } from "react-feather";
import CustomAlert from "../../components/alert/CustomAlert";

function CountryInformation() {
  const dispatch = useDispatch();

  const {
    updateRoleSuccess,
    addRoleSuccess,
    deleteRoleSuccess,
    deleteRoleError,
    updateRoleError,
    addRoleError,
  } = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(getRoleData());
    dispatch(clearSuccessAndError());
  }, [dispatch]);

  const dismissAlert = () => {
    dispatch(clearSuccessAndError());
  };

  return (
    <Layout>
      <Row>
        <Col sm="12">
          <div className="display-6 font-fallback ">Role</div>
          <hr className="border border-2 border-dark my-4" />

          {/* <>
            <Alert
              isOpen={!!addRoleSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record saved
              successfully
            </Alert>
            <Alert
              isOpen={!!updateRoleSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record updated
              successfully
            </Alert>
            <Alert
              isOpen={!!deleteRoleSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record deleted
              successfully
            </Alert>
            <Alert
              isOpen={!!deleteRoleError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />{" "}
              {deleteRoleError?.includes("405")
                ? "This record cannot be deleted. It is already in use."
                : deleteRoleError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
            <Alert
              isOpen={!!addRoleError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              Something went wrong, please try after sometimes! If you are
              experiencing similar frequently, please report it to helpdesk.
            </Alert>
            <Alert
              isOpen={!!updateRoleError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              {updateRoleError?.includes("409")
                ? "Duplicate data found"
                : updateRoleError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
          </> */}

          <CustomAlert
            addSuccess={addRoleSuccess}
            addError={addRoleError}
            updateSuccess={updateRoleSuccess}
            updateError={updateRoleError}
            deleteSuccess={deleteRoleSuccess}
            deleteError={deleteRoleError}
            dismissAlert={dismissAlert}
          />
          <Card className="px-4 py-4 border-0 shadow">
            <div className="mb-3 d-flex justify-content-between align-items-center"></div>
            <RoleTable />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default CountryInformation;

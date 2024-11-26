import React from "react";
import { useState } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Card, Col, Container, Table } from "reactstrap";
import { clearSuccessAndError } from "../login/store";
import AdminRecoveryTableRow from "./AdminRecoveryTableRow";
import RecoveryModal from "./RecoveryModal";

function AdminRecovery() {
  // ! states are declared here
  const [open, setOpen] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [userId, setUserId] = useState(null);
  const [recoveryID, setRecoveryID] = useState(null);

  // ! hooks are declared here
  const dispatch = useDispatch();

  // ! get data from redux store
  const recoveryList = useSelector((state) => state?.login.recoveryList);
  const { adminRecoveyPasswordError, adminRecoveyPasswordSuccess } =
    useSelector((state) => state?.login);

  // ! functions are declared here
  const handleReset = (id, oid) => {
    setUserId(id);
    setRecoveryID(oid);
    setOpen(!open);
  };

  const dismissAlert = () => {
    setIsPasswordMatch(true);
    dispatch(clearSuccessAndError());
  };

  return (
    <div className="d-flex align-items-center">
      <Container>
        <Col className="mx-auto">
          <h1 className="font-fallback display-6 text-start">
            Password Recovery
          </h1>
          <hr className="border border-2 border-dark my-4" />
          <Alert
            isOpen={!isPasswordMatch}
            color="danger"
            className="font-fallback default-fz"
            toggle={dismissAlert}
          >
            <XCircle size={18} className="mb-1 me-1" /> Passwords do not match
          </Alert>
          <Alert
            isOpen={!!adminRecoveyPasswordSuccess}
            color="success"
            className="font-fallback default-fz"
            toggle={dismissAlert}
          >
            <CheckCircle size={18} className="mb-1 me-1" />
            &nbsp;Passwords Reset Successfully.
          </Alert>
          <Alert
            isOpen={!!adminRecoveyPasswordError}
            color="danger"
            className="font-fallback default-fz"
            toggle={dismissAlert}
          >
            <XCircle size={18} className="mb-1 me-1" />
            &nbsp;Something went wrong, please try after sometimes! If you are
            experiencing similar frequently, please report it to helpdesk.
          </Alert>

          <Card className="px-4 py-4 mt-4">
            <Table responsive={true}>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Cellphone</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="">
                {recoveryList &&
                  recoveryList.map((item) => (
                    <AdminRecoveryTableRow
                      key={item.oid}
                      item={item}
                      handleReset={handleReset}
                    />
                  ))}
              </tbody>
            </Table>
          </Card>
        </Col>
        <RecoveryModal
          open={open}
          setOpen={setOpen}
          userId={userId}
          recoveryID={recoveryID}
          isPasswordMatch={isPasswordMatch}
          setIsPasswordMatch={setIsPasswordMatch}
        />
      </Container>
    </div>
  );
}

export default AdminRecovery;

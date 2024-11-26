/* eslint-disable semi */

import { useEffect } from "react";
import { clearSuccessAndError, getTeamData } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button, Alert } from "reactstrap";
import Layout from "../../components/layout/Layout";
import TeamTable from "./TeamTable";
import { CheckCircle, PlusCircle, XCircle } from "react-feather";
import { useState } from "react";
import AddTeamModal from "./AddTeamModal";
import CustomAlert from "../../components/alert/CustomAlert";

function CountryInformation() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const teamData = useSelector((state) => state.team.data);

  const {
    addTeamSuccess,
    updateTeamSuccess,
    deleteTeamSuccess,
    deleteTeamError,
    updateTeamError,
    addTeamError,
  } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(getTeamData());
    dispatch(clearSuccessAndError());
  }, [dispatch]);

  console.log(teamData);
  const dismissAlert = () => {
    dispatch(clearSuccessAndError());
  };

  return (
    <Layout>
      <Row>
        <Col sm="12">
          <div className="display-6 font-fallback ">Team</div>
          <hr className="border border-2 border-dark my-4" />
          {/* <>
            <Alert
              isOpen={!!addTeamSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record saved
              successfully
            </Alert>
            <Alert
              isOpen={!!updateTeamSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record updated
              successfully
            </Alert>
            <Alert
              isOpen={!!deleteTeamSuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record deleted
              successfully
            </Alert>
            <Alert
              isOpen={!!deleteTeamError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />{" "}
              {deleteTeamError?.includes("405")
                ? "This record cannot be deleted. It is already in use."
                : deleteTeamError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
            <Alert
              isOpen={!!addTeamError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              {addTeamError?.includes("409")
                ? "Duplicate data found"
                : addTeamError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
            <Alert
              isOpen={!!updateTeamError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" />
              {updateTeamError?.includes("409")
                ? "Duplicate data found"
                : updateTeamError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
          </> */}
          <CustomAlert
            addSuccess={addTeamSuccess}
            addError={addTeamError}
            updateSuccess={updateTeamSuccess}
            updateError={updateTeamError}
            deleteSuccess={deleteTeamSuccess}
            deleteError={deleteTeamError}
            dismissAlert={dismissAlert}
          />
          <Card className="px-4 py-4 border-0 shadow overflow-auto">
            <div className="mb-3 d-flex justify-content-between align-items-center responsive_table_class">
              <Button
                className="add-button border-0 font-fallback default-fz"
                onClick={() => setOpen(!open)}
              >
                <PlusCircle size={20} className=" mb-1" />
                &nbsp;Add Team
              </Button>
            </div>
            <TeamTable />
          </Card>
        </Col>
        <AddTeamModal open={open} setOpen={setOpen} />
      </Row>
    </Layout>
  );
}

export default CountryInformation;

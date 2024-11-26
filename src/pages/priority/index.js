/* eslint-disable semi */
import { useEffect, useState } from "react";
import { clearSuccessAndError, getPriorityData } from "./store";
import { useSelector, useDispatch } from "react-redux";

import { Row, Col, Card, Button, Alert } from "reactstrap";
import Layout from "../../components/layout/Layout";
import PriorityTable from "./PriorityTable";
import { CheckCircle, PlusCircle, XCircle } from "react-feather";
import AddPriorityModal from "./AddPriorityModal";
import CustomAlert from "../../components/alert/CustomAlert";

function CountryInformation() {
  // ! states are declared here
  const [open, setOpen] = useState(false);

  // ! hooks are declared here
  const dispatch = useDispatch();

  const {
    deletePrioritySuccess,
    deletePriorityError,
    updatePriorityError,
    addPriorityError,
    updatePrioritySuccess,
    addPrioritySuccess,
  } = useSelector((state) => state.priority);

  useEffect(() => {
    dispatch(getPriorityData());
    dispatch(clearSuccessAndError());
  }, [dispatch]);

  // ! handler functions are declard here
  const dismissAlert = () => {
    dispatch(clearSuccessAndError());
  };

  return (
    <Layout>
      <Row>
        <Col sm="12">
          <div className="display-6 font-fallback">Priority</div>
          <hr className="border border-2 border-dark my-4" />

          {/* <>
            <Alert
              isOpen={!!addPrioritySuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record saved
              successfully
            </Alert>
            <Alert
              isOpen={!!updatePrioritySuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record updated
              successfully
            </Alert>
            <Alert
              isOpen={!!deletePrioritySuccess}
              color="success"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <CheckCircle size={18} className="mb-1 me-1" /> Record deleted
              successfully
            </Alert>
            <Alert
              isOpen={!!deletePriorityError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              Something went wrong, please try after sometimes! If you are
              experiencing similar frequently, please report it to helpdesk.
            </Alert>
            <Alert
              isOpen={!!addPriorityError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />{" "}
              {addPriorityError?.includes("409")
                ? "Duplicate data found"
                : addPriorityError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
            <Alert
              isOpen={!!updatePriorityError}
              color="danger"
              className="font-fallback default-fz"
              toggle={dismissAlert}
            >
              <XCircle size={18} className="mb-1 me-1" />
              {updatePriorityError?.includes("409")
                ? "Duplicate data found"
                : updatePriorityError?.includes("500")
                ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                : ""}
            </Alert>
          </> */}

          <CustomAlert
            addSuccess={addPrioritySuccess}
            addError={addPriorityError}
            updateSuccess={updatePrioritySuccess}
            updateError={updatePriorityError}
            deleteSuccess={deletePrioritySuccess}
            deleteError={deletePriorityError}
            dismissAlert={dismissAlert}
          />

          <Card className="px-4 py-4 border-0 shadow overflow-auto">
            <div className="mb-3 d-flex justify-content-between align-items-center responsive_table_class">
              <Button
                className="add-button border-0 font-fallback default-fz"
                onClick={() => setOpen(!open)}
              >
                <PlusCircle size={20} className=" mb-1" />
                &nbsp;Add Priority
              </Button>
            </div>
            <PriorityTable />
          </Card>
        </Col>
        <AddPriorityModal open={open} setOpen={setOpen} />
      </Row>
    </Layout>
  );
}

export default CountryInformation;

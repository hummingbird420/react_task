import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  ArrowLeftCircle,
  CheckCircle,
  PlusCircle,
  XCircle,
} from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Col, Row } from "reactstrap";
import CustomAlert from "../../../components/alert/CustomAlert";
import Layout from "../../../components/layout/Layout";
import { clearSuccessAndError } from "../store";
import AddModal from "./AddModal";
import FirstLevelTable from "./ThirdLevelTable";

function FirstLevelCategory() {
  // ! state are declared here
  const [open, setOpen] = useState(false);

  // ! hooks are declared here
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ! get data from the redux store
  const {
    addCategorySuccess,
    addCategoryError,
    updateCategorySuccess,
    updateCategoryError,
    deleteCategorySuccess,
    deleteCategoryError,
  } = useSelector((state) => state.incidentCategory);

  // ! handle side effects
  useEffect(() => {
    // dispatch(getIncidentCategoryData());
    dispatch(clearSuccessAndError());
  }, [dispatch]);

  // ! handler funcition are defined here
  const dismissAlert = () => {
    dispatch(clearSuccessAndError());
  };

  return (
    <Layout>
      <Row className="">
        <Col sm="12">
          <div>
            <div className="display-6 font-fallback">Third Level Category</div>
            <hr className="border border-2 border-dark my-4" />
            {/*** Alert messages box */}
            {/* <>
              <Alert
                isOpen={!!addCategorySuccess}
                color="success"
                className="font-fallback default-fz"
                toggle={dismissAlert}
              >
                <CheckCircle size={18} className="mb-1 me-1" /> Record saved
                successfully
              </Alert>
              <Alert
                isOpen={!!updateCategorySuccess}
                color="success"
                className="font-fallback default-fz"
                toggle={dismissAlert}
              >
                <CheckCircle size={18} className="mb-1 me-1" /> Record updated
                successfully
              </Alert>
              <Alert
                isOpen={!!deleteCategorySuccess}
                color="success"
                className="font-fallback default-fz"
                toggle={dismissAlert}
              >
                <CheckCircle size={18} className="mb-1 me-1" /> Record deleted
                successfully
              </Alert>
              <Alert
                isOpen={!!deleteCategoryError}
                color="danger"
                className="font-fallback default-fz"
                toggle={dismissAlert}
              >
                <XCircle size={18} className="mb-1 me-1" />{" "}
                {deleteCategoryError?.includes("405")
                  ? "This record cannot be deleted. It is already in use."
                  : deleteCategoryError?.includes("500")
                  ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                  : ""}
              </Alert>
              <Alert
                isOpen={!!addCategoryError}
                color="danger"
                className="font-fallback default-fz"
                toggle={dismissAlert}
              >
                <XCircle size={18} className="mb-1 me-1" />{" "}
                {addCategoryError?.includes("409")
                  ? "Duplicate data found"
                  : addCategoryError?.includes("500")
                  ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                  : ""}
              </Alert>
              <Alert
                isOpen={!!updateCategoryError}
                color="danger"
                className="font-fallback default-fz"
                toggle={dismissAlert}
              >
                <XCircle size={18} className="mb-1 me-1" />
                {updateCategoryError?.includes("409")
                  ? "Duplicate data found"
                  : updateCategoryError?.includes("500")
                  ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                  : ""}
              </Alert>
            </> */}

            <CustomAlert
              addSuccess={addCategorySuccess}
              addError={addCategoryError}
              updateSuccess={updateCategorySuccess}
              updateError={updateCategoryError}
              deleteSuccess={deleteCategorySuccess}
              deleteError={deleteCategoryError}
              dismissAlert={dismissAlert}
            />
            <Card className="px-4 py-4 border-0 shadow overflow-auto">
              <div className="mb-3 d-flex justify-content-between align-items-center responsive_table_class">
                <Button
                  className="add-button border-0 font-fallback default-fz"
                  onClick={() => setOpen(!open)}
                >
                  <PlusCircle size={20} className=" me-1" /> Add Third Level
                  Category
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
              <FirstLevelTable />
            </Card>
          </div>
        </Col>
        <AddModal open={open} setOpen={setOpen} />
      </Row>
    </Layout>
  );
}

export default FirstLevelCategory;

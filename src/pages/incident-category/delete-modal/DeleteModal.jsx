import React, { useState } from "react";
import { getIncidentCategoryByParent, deleteIncidentCategory } from "../store";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Card,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeftCircle, CheckCircle } from "react-feather";
import toast, { Toaster } from "react-hot-toast";

const AddModal = ({ modal, toggle, firstLevel }) => {
  const dispatch = useDispatch();
  const [firstLevelId, setFirstLevelId] = useState("");
  const [secondLevelId, setSecondLevelId] = useState("");
  const [thirdLevelId, setThirdLevelId] = useState("");

  const makeTost = () => {
    toast.dismiss();
    toast("Please choose an option to delete!", {
      icon: "❌",
      style: {
        borderRadius: "5px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  // ** get data from store
  const secondLevelData = useSelector(
    (state) => state.incidentCategory.parentCategory
  );

  // ** handler

  // ** handler
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!firstLevelId && !secondLevelId && !thirdLevelId) {
      makeTost();
    } else {
      const parentID = thirdLevelId
        ? thirdLevelId
        : secondLevelId
        ? secondLevelId
        : firstLevelId;

      dispatch(deleteIncidentCategory(parentID));
      console.log("data", parentID);
    }
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        size="md"
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={toggle}>Delete Incident Category</ModalHeader>
        <ModalBody>
          <Card className="px-3 py-3 border-0">
            <Form onSubmit={handleFormSubmit}>
              <Row>
                <Col md={12} className="">
                  <FormGroup>
                    <Label for="firstLevelId">First level category</Label>
                    <Input
                      className=""
                      name="firstLevelId"
                      id="firstLevelId"
                      type="select"
                      onChange={(e) => {
                        setSecondLevelId("");
                        setThirdLevelId("");
                        setFirstLevelId(e.target.value);
                        dispatch(getIncidentCategoryByParent(e.target.value));
                      }}
                    >
                      <option>Select first level category</option>
                      {firstLevel &&
                        firstLevel.map((level) => (
                          <option key={level.oid} value={level.oid}>
                            {level.incidentCategorys}
                          </option>
                        ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={12} className="">
                  <FormGroup>
                    <Label for="secondLevelId">Second level category</Label>
                    <Input
                      className=""
                      name="secondLevelId"
                      id="secondLevelId"
                      type="select"
                      onChange={(e) => {
                        setThirdLevelId("");
                        setSecondLevelId(e.target.value);
                        dispatch(getIncidentCategoryByParent(e.target.value));
                      }}
                    >
                      <option>Select second level category</option>
                      {secondLevelData &&
                        secondLevelData.map((level) => (
                          <option key={level.oid} value={level.oid}>
                            {level.incidentCategorys}
                          </option>
                        ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={12} className="">
                  <FormGroup>
                    <Label for="thirdLevel">Third level category</Label>
                    <Input
                      className=""
                      name="thirdLevel"
                      id="thirdLevel"
                      type="select"
                      onChange={(e) => {
                        setThirdLevelId(e.target.value);
                      }}
                    >
                      <option>Select third level category</option>
                      {secondLevelData &&
                        secondLevelData.map((level) => (
                          <option key={level.oid} value={level.oid}>
                            {level.incidentCategorys}
                          </option>
                        ))}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <div className="d-flex justify-content-end mt-4">
                  <Button
                    outline
                    color="secondary"
                    type="reset"
                    className="font-fallback px-4"
                    onClick={() => {
                      toggle();
                    }}
                  >
                    <ArrowLeftCircle size={18} className="me-2" />
                    Back
                  </Button>
                  <Button
                    className="ms-4 add-button border-0 px-4"
                    type="submit"
                  >
                    <CheckCircle size={18} className="me-2" />
                    Delete
                  </Button>
                </div>
              </Row>
            </Form>
          </Card>
        </ModalBody>
        <Toaster
          position="top-center"
          reverseOrder={false}
          containerStyle={{
            top: "30%",
          }}
        />
      </Modal>
    </div>
  );
};

export default AddModal;

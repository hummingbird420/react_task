import React, { useState } from "react";
import {
  getIncidentCategoryByParent,
  getSingleIncidentCategoryData,
  updateIncidentCategoryData,
} from "../store";
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
import { useEffect } from "react";
import { ArrowLeftCircle, CheckCircle } from "react-feather";
import editIncidentCategoryValidator from "../../../validator/editIncidentCategory";

const AddModal = ({ modal, toggle, firstLevel }) => {
  const dispatch = useDispatch();
  const [firstLevelId, setFirstLevelId] = useState("");
  const [secondLevelId, setSecondLevelId] = useState("");
  const [thirdLevelId, setThirdLevelId] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [validateResult, setValidateResult] = useState({});

  // ** get data from store
  const secondLevelData = useSelector(
    (state) => state.incidentCategory.parentCategory
  );

  const singleIncidentCategoryData = useSelector(
    (state) => state.incidentCategory.selectedIncidentCategory
  );

  // ** handler

  const parentID = thirdLevelId
    ? thirdLevelId
    : secondLevelId
    ? secondLevelId
    : firstLevelId;

  // ** handler
  const handleReset = () => {
    setFirstLevelId("");
    setSecondLevelId("");
    setThirdLevelId("");
    setDescription("");
    setCategoryName("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...singleIncidentCategoryData,
      incidentCategorys: categoryName,
      description,
      parentID: singleIncidentCategoryData.parentID,
      isDeleted: false,
    };

    const validateResult = editIncidentCategoryValidator(data);
    if (validateResult.isValid) {
      dispatch(updateIncidentCategoryData(data));
      handleReset();
      toggle();
    } else {
      setValidateResult(validateResult);
    }
  };

  useEffect(() => {
    dispatch(getSingleIncidentCategoryData(parentID));
  }, [dispatch, parentID]);

  useEffect(() => {
    if (singleIncidentCategoryData) {
      setCategoryName(singleIncidentCategoryData.incidentCategorys);
      setDescription(singleIncidentCategoryData.description);
    }
  }, [singleIncidentCategoryData]);

  console.log("parentID", parentID);

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        size="md"
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={toggle}>Edit Incident Category</ModalHeader>
        <ModalBody>
          <Card className="px-3 py-3 border-0">
            <Form onSubmit={handleFormSubmit}>
              <Row>
                <Col md={12} className="">
                  <FormGroup>
                    <Label>First level category</Label>
                    <Input
                      className=""
                      type="select"
                      onChange={(e) => {
                        setSecondLevelId("");
                        setThirdLevelId("");
                        setFirstLevelId(e.target.value);
                        dispatch(getIncidentCategoryByParent(e.target.value));
                        setCategoryName(
                          singleIncidentCategoryData.incidentCategorys
                        );
                        setDescription(singleIncidentCategoryData.description);
                      }}
                    >
                      <option value={""}>Select first level category</option>
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
                    <Label>Second level category</Label>
                    <Input
                      className=""
                      type="select"
                      onChange={(e) => {
                        setThirdLevelId("");
                        setSecondLevelId(e.target.value);
                        dispatch(getIncidentCategoryByParent(e.target.value));
                        setCategoryName(
                          singleIncidentCategoryData.incidentCategorys
                        );
                        setDescription(singleIncidentCategoryData.description);
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
                    <Label>Third level category</Label>
                    <Input
                      className=""
                      type="select"
                      onChange={(e) => {
                        setThirdLevelId(e.target.value);
                        setCategoryName(
                          singleIncidentCategoryData.incidentCategorys
                        );
                        setDescription(singleIncidentCategoryData.description);
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
                <Col md={12} className="">
                  <FormGroup>
                    <div className="d-flex justify-content-between">
                      <Label for="categoryName">New item</Label>
                      {validateResult?.error?.incidentCategorys && (
                        <div className="text-danger">Required!</div>
                      )}
                    </div>
                    <Input
                      className={
                        validateResult?.error?.incidentCategorys
                          ? "is-invalid"
                          : ""
                      }
                      type="text"
                      id="categoryName"
                      value={categoryName}
                      placeholder="Enter category"
                      onChange={(e) => {
                        setCategoryName(e.target.value);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={12} className="">
                  <FormGroup>
                    <Label>Description</Label>
                    <Input
                      className=""
                      placeholder="Description"
                      type="textarea"
                      value={description}
                      maxLength={250}
                      onChange={(e) => setDescription(e.target.value)}
                    />
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
                      handleReset();
                      toggle();
                    }}
                  >
                    <ArrowLeftCircle size={18} className="me-2" />
                    Back
                  </Button>
                  <Button
                    className="ms-4 add-button border-0 px-4"
                    type="submit"
                    disabled={parentID ? false : true}
                  >
                    <CheckCircle size={18} className="me-2" />
                    Save
                  </Button>
                </div>
              </Row>
            </Form>
          </Card>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AddModal;

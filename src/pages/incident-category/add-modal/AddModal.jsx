import React, { useState } from "react";
import { getIncidentCategoryByParent, addIncidentCategoryData } from "../store";
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
import addIncidentCategoryValidator from "../../../validator/addIncidentCategory";

const AddModal = ({ modal, toggle, firstLevel }) => {
  const dispatch = useDispatch();
  const [firstLevelId, setFirstLevelId] = useState("");
  const [secondLevelId, setSecondLevelId] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [validateResult, setValidateResult] = useState({});

  // ** get data from store
  const secondLevelData = useSelector(
    (state) => state.incidentCategory.parentCategory
  );

  // ** handler
  const handleReset = () => {
    setFirstLevelId("");
    setSecondLevelId("");
    setDescription("");
    setCategoryName("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setValidateResult({});

    const parentID =
      firstLevelId && secondLevelId
        ? secondLevelId
        : firstLevelId
        ? firstLevelId
        : 0;

    const data = {
      incidentCategorys: categoryName,
      description,
      parentID,
      isDeleted: false,
    };
    console.log("data", data);

    const validationResult = addIncidentCategoryValidator(data);
    if (validationResult.isValid) {
      dispatch(addIncidentCategoryData(data));
      handleReset();
      toggle();
    } else {
      setValidateResult(validationResult);
    }
  };

  console.log("validateResult", validateResult);

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        size="md"
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={toggle}>Add Incident Category</ModalHeader>
        <ModalBody>
          <Card className="px-3 py-3 border-0">
            <Form onSubmit={handleFormSubmit}>
              <Row>
                <Col md={12} className="">
                  <FormGroup>
                    <Label for="firstLevelId">First level category</Label>
                    <Input
                      className=""
                      type="select"
                      name="firstLevelId"
                      id="firstLevelId"
                      value={firstLevelId}
                      onChange={(e) => {
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
                      type="select"
                      name="secondLevelId"
                      id="secondLevelId"
                      value={secondLevelId}
                      onChange={(e) => setSecondLevelId(e.target.value)}
                    >
                      <option>Select seconf level category</option>
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
                      className={`${
                        validateResult?.error?.incidentCategorys && "is-invalid"
                      }`}
                      placeholder="Enter category"
                      id="categoryName"
                      type="text"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={12} className="">
                  <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                      className=""
                      placeholder="Enter description"
                      id="description"
                      type="textarea"
                      maxLength={250}
                      value={description}
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

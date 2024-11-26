import React, { useEffect } from "react";
import { addTicketData } from "../../store";
import { getProjectData } from "../../../project/store";
import { getFacilityData } from "../../../facility/store";
import { getUserData } from "../../../user/store";
import { getTeamData } from "../../../team/store";
import { getPriorityData } from "../../../priority/store";
import { getIncidentCategoryData } from "../../../incident-category/store";
import { getProvinceData } from "../../../province/store";
import { getMessageData } from "../../../message/store";
import { getDistrictByProvince } from "../../../province/store";
import { getFacilityByDistrict } from "../../../district/store";

import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeftCircle, CheckCircle } from "react-feather";
import agentCreateTicketValidation from "../../../../validator/agentCreateTicketValidation";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AttachmentContext from "../../../../context/AttachMent";

function ClientTicketCreateForm() {
  // ! states are declared here
  const [systemID, setSystemID] = React.useState(null);
  const [facilityID, setFacilityID] = React.useState(null);
  const [dateReported, setDateReported] = React.useState(null);
  const [description, setDescription] = React.useState("");
  const [provinceID, setProvinceID] = React.useState(null);
  const [districtID, setDistrictID] = React.useState(null);
  const [priorityID, setPriorityID] = React.useState(null);
  const [firstLevelCategoryID, SetFirstLevelCategoryID] = React.useState(null);
  const [validationResult, setValidationResult] = React.useState(null);
  const [isValidImg, setIsvalidImg] = React.useState(true);

  // ! hooks are initialized here
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgRef = React.useRef(null);
  const { setAttacehMent } = useContext(AttachmentContext);

  // ! get data from redux store
  const projects = useSelector((state) => state.project.data);
  const provinces = useSelector((state) => state.province.data);
  const logedInuser = useSelector((state) => state.login.data);
  const priorities = useSelector((state) => state.priority.data);
  const districts = useSelector((state) => state.province.district);
  const facilities = useSelector((state) => state.district.facility);
  const incidentCategories = useSelector(
    (state) => state.incidentCategory.data
  );

  // ! handler functions are declared here
  const handleReset = () => {
    setSystemID(null);
    setFacilityID(null);
    setDateReported(null);
    setDescription("");
    setProvinceID(null);
    setDistrictID(null);
    setPriorityID(null);
    SetFirstLevelCategoryID(null);

    setTimeout(() => {
      navigate(-1);
    }, 1500);
  };

  // ! submit hanlder
  const onSubmit = (e) => {
    e.preventDefault();
    const validationObj = {
      systemID,
      facilityID,
      dateReported,
      description,
      provinceID,
      districtID,
      priorityID,
      firstLevelCategoryID,
    };
    const validation = agentCreateTicketValidation(validationObj);
    if (validation.isValid) {
      const incidentObject = {
        systemID: systemID,
        facilityID: facilityID,
        dateReported: new Date().toISOString(),
        description: description,
        dateResolved: null,
        isResolved: false,
        isOpen: true,
        projects: null,
        facilities: null,
        reportedBy: logedInuser.oid,
        teamID: null,
        teams: null,
        assignedTo: null,
        firstLevelCategoryID: firstLevelCategoryID,
        secondLevelCategoryID: null,
        thirdLevelCategoryID: null,
        incidentCategory: null,
        priorityID: priorityID,
        incidentPriority: null,
        messages: null,
        dateOfIncident: dateReported,
        dateCreated: new Date().toISOString(),
        createdBy: null,
        dateModified: null,
        modifiedBy: null,
        isDeleted: false,
      };

      dispatch(addTicketData(incidentObject));
      handleReset();
    } else {
      setValidationResult(validation);
    }
  };

  // ! useEffects are declared here
  useEffect(() => {
    dispatch(getProjectData());
    dispatch(getFacilityData());
    dispatch(getUserData());
    dispatch(getTeamData());
    dispatch(getPriorityData());
    dispatch(getIncidentCategoryData());
    dispatch(getProvinceData());
    dispatch(getMessageData());
  }, [dispatch]);

  return (
    <Card className="border-0 shadow px-md-4 py-md-3 py-2">
      <CardBody className="px-5">
        <div className="display-6 font-fallback">Create Ticket</div>
        <hr className="py-2" />
        <Form>
          <Row>
            <Col md={12}>
              <FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  <Label for="systemID">
                    System<span className="orange-700">*</span>
                  </Label>
                  {validationResult?.error?.systemID && (
                    <p className="text-danger">
                      {validationResult.error.systemID}
                    </p>
                  )}
                </div>
                <Input
                  id="systemID"
                  name="systemID"
                  style={{ height: "50px" }}
                  type="select"
                  value={systemID}
                  className={validationResult?.error?.systemID && "is-invalid"}
                  onChange={(e) => setSystemID(+e.target.value)}
                >
                  <option>Select Project</option>
                  {projects &&
                    projects.map((project) => (
                      <option key={project.oid} value={project.oid}>
                        {project.title}
                      </option>
                    ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  <Label for="provinceID">
                    Province<span className="orange-700">*</span>
                  </Label>
                  {validationResult?.error?.provinceID && (
                    <p className="text-danger">
                      {validationResult.error.provinceID}
                    </p>
                  )}
                </div>
                <Input
                  id="provinceID"
                  name="provinceID"
                  style={{ height: "50px" }}
                  type="select"
                  value={provinceID}
                  className={
                    validationResult?.error?.provinceID && "is-invalid"
                  }
                  onChange={(e) => {
                    setProvinceID(e.target.value);
                    dispatch(getDistrictByProvince(e.target.value));
                  }}
                >
                  <option>Select Province</option>
                  {provinces &&
                    provinces.map((province) => (
                      <option key={province.oid} value={province.oid}>
                        {province.provinceName}
                      </option>
                    ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  <Label for="districtID">
                    District<span className="orange-700">*</span>
                  </Label>
                  {validationResult?.error?.districtID && (
                    <p className="text-danger">
                      {validationResult.error.districtID}
                    </p>
                  )}
                </div>
                <Input
                  id="districtID"
                  name="districtID"
                  style={{ height: "50px" }}
                  type="select"
                  value={districtID}
                  className={
                    validationResult?.error?.districtID && "is-invalid"
                  }
                  onChange={(e) => {
                    setDistrictID(e.target.value);
                    dispatch(getFacilityByDistrict(e.target.value));
                  }}
                >
                  <option>Select District</option>
                  {districts &&
                    districts.map((district) => (
                      <option key={district.oid} value={district.oid}>
                        {district.districtName}
                      </option>
                    ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  <Label for="facilityID">
                    Facility<span className="orange-700">*</span>
                  </Label>
                  {validationResult?.error?.facilityID && (
                    <p className="text-danger">
                      {validationResult.error.facilityID}
                    </p>
                  )}
                </div>
                <Input
                  id="facilityID"
                  name="facilityID"
                  style={{ height: "50px" }}
                  type="select"
                  value={facilityID}
                  className={
                    validationResult?.error?.facilityID && "is-invalid"
                  }
                  onChange={(e) => {
                    setFacilityID(+e.target.value);
                  }}
                >
                  <option>Select Facility</option>
                  {facilities &&
                    facilities.map((facility) => (
                      <option key={facility.oid} value={facility.oid}>
                        {facility.facilityName}
                      </option>
                    ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  <Label for="dateReported">
                    Date of Incident<span className="orange-700">*</span>
                  </Label>
                  {validationResult?.error?.dateReported && (
                    <p className="text-danger">
                      {validationResult.error.dateReported}
                    </p>
                  )}
                </div>
                <Input
                  id="dateReported"
                  name="dateReported"
                  style={{ height: "50px" }}
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  className={`${
                    validationResult?.error?.dateReported && "is-invalid"
                  }`}
                  onChange={(e) => {
                    setDateReported(e.target.value);
                  }}
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  <Label for="description">
                    Incident<span className="orange-700">*</span>
                  </Label>
                  {validationResult?.error?.description && (
                    <p className="text-danger">
                      {validationResult.error.description}
                    </p>
                  )}
                </div>
                <Input
                  id="description"
                  name="description"
                  style={{ height: "150px" }}
                  maxLength={500}
                  type="textarea"
                  className={`${
                    validationResult?.error?.description && "is-invalid"
                  }`}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  <Label for="priorityID">
                    Priority<span className="orange-700">*</span>
                  </Label>
                  {validationResult?.error?.priorityID && (
                    <p className="text-danger">
                      {validationResult.error.priorityID}
                    </p>
                  )}
                </div>
                <Input
                  id="priorityID"
                  name="priorityID"
                  style={{ height: "50px" }}
                  type="select"
                  className={`${
                    validationResult?.error?.priorityID && "is-invalid"
                  }`}
                  value={priorityID}
                  onChange={(e) => {
                    setPriorityID(+e.target.value);
                  }}
                >
                  <option>Select Priority</option>
                  {priorities &&
                    priorities.map((priority) => (
                      <option key={priority.oid} value={priority.oid}>
                        {priority.priority}
                      </option>
                    ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  <Label for="firstLevelCategoryID">
                    First level category<span className="orange-700">*</span>
                  </Label>
                  {validationResult?.error?.firstLevelCategoryID && (
                    <p className="text-danger">
                      {validationResult.error.firstLevelCategoryID}
                    </p>
                  )}
                </div>
                <Input
                  id="firstLevelCategoryID"
                  name="firstLevelCategoryID"
                  style={{ height: "50px" }}
                  type="select"
                  className={`${
                    validationResult?.error?.firstLevelCategoryID &&
                    "is-invalid"
                  }`}
                  onChange={(e) => {
                    SetFirstLevelCategoryID(+e.target.value);
                  }}
                >
                  <option>Select first level category</option>
                  {incidentCategories &&
                    incidentCategories.map((category) => (
                      <option key={category.oid} value={category.oid}>
                        {category.incidentCategorys}
                      </option>
                    ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  <Label for="screenshot">
                    Attached Screenshot<span className="orange-700">*</span>
                  </Label>
                  {!isValidImg && (
                    <p className="text-danger">
                      Please upload a valid image file (jpg, png)
                    </p>
                  )}
                </div>
                <input
                  id="screenshot"
                  className={`form-control font-fallback ${
                    !isValidImg && "is-invalid"
                  }`}
                  name="file"
                  type="file"
                  ref={imgRef}
                  accept="image/*"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    if (e.target.files[0]?.name.includes(".jpg" || ".png")) {
                      setAttacehMent(e.target.files[0]);
                      setIsvalidImg(true);
                    } else {
                      setAttacehMent(null);
                      imgRef.current.value = null;
                      setIsvalidImg(false);
                    }
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className=""></Row>
          <div className="d-flex mt-4 justify-content-start">
            <Button
              className="add-button border-0 px-4"
              type="submit"
              onClick={onSubmit}
            >
              <CheckCircle size={18} className="me-2" />
              Save
            </Button>
            &nbsp;
            <Button
              outline
              color="secondary"
              type="reset"
              className="font-fallback px-4"
              onClick={handleReset}
            >
              <ArrowLeftCircle size={18} className="me-2" />
              Back
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
}

export default ClientTicketCreateForm;

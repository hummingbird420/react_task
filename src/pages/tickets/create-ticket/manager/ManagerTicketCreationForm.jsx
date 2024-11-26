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
import { getIncidentCategoryByParent } from "../../../incident-category/store";

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
import managerCreateTicketValidation from "../../../../validator/managerCreateTicketValidation";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AttachmentContext from "../../../../context/AttachMent";
import { useRef } from "react";

function ManagerTicketCreationForm() {
  // ! states are declared here
  const [systemID, setSystemID] = React.useState(null);
  const [facilityID, setFacilityID] = React.useState(null);
  const [dateReported, setDateReported] = React.useState(null);
  const [description, setDescription] = React.useState("");
  const [provinceID, setProvinceID] = React.useState(null);
  const [districtID, setDistrictID] = React.useState(null);
  const [priorityID, setPriorityID] = React.useState(null);
  const [firstLevelCategoryID, SetFirstLevelCategoryID] = React.useState(null);
  const [secondLevelCategoryID, SetSecondLevelCategoryID] =
    React.useState(null);
  const [teamID, setTeamID] = React.useState(null);
  const [validationResult, setValidationResult] = React.useState(null);
  const [isValidImg, setIsValidImg] = React.useState(true);

  // ! hooks are initialized here
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgRef = useRef(null);
  const { setAttacehMent } = useContext(AttachmentContext);

  // ! get data from redux store
  const projects = useSelector((state) => state.project.data);
  const provinces = useSelector((state) => state.province.data);
  const logedInuser = useSelector((state) => state.login.data);
  const teams = useSelector((state) => state.team.data);
  const priorities = useSelector((state) => state.priority.data);
  const districts = useSelector((state) => state.province.district);
  const facilities = useSelector((state) => state.district.facility);
  const incidentCategories = useSelector(
    (state) => state.incidentCategory.data
  );
  const secondLevelCategory = useSelector(
    (state) => state.incidentCategory.parentCategory
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
    SetSecondLevelCategoryID(null);
    setTeamID(null);
    navigate(-1);
  };

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
      secondLevelCategoryID,
      teamID,
    };
    const validation = managerCreateTicketValidation(validationObj);
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
        teamID: teamID,
        teams: null,
        assignedTo: null,
        firstLevelCategoryID: firstLevelCategoryID,
        secondLevelCategoryID: secondLevelCategoryID,
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
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } else {
      setValidationResult(validation);
    }
  };

  // ! useEffect functions are declared here
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

  // useEffect(() => {
  //   if (addTicketSuccess) {
  //     const formData = new FormData();
  //     formData.append("Ffile", screenshot);

  //     const data = {
  //       id: newCreatedTicket?.oid,
  //       img: formData,
  //     };
  //     dispatch(uploadScreenShot(data));
  //   }
  // }, [screenshot, dispatch, newCreatedTicket, addTicketSuccess]);

  return (
    <Card className="border-0 shadow">
      <CardBody className="px-md-5">
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
                  className={`${
                    validationResult?.error?.systemID && "is-invalid"
                  }`}
                  value={systemID}
                  onChange={(e) => setSystemID(+e.target.value)}
                >
                  <option>Select project</option>
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
                  className={`${
                    validationResult?.error?.provinceID && "is-invalid"
                  }`}
                  value={provinceID}
                  onChange={(e) => {
                    setProvinceID(e.target.value);
                    dispatch(getDistrictByProvince(e.target.value));
                  }}
                >
                  <option>Select province</option>
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
                  className={`${
                    validationResult?.error?.districtID && "is-invalid"
                  }`}
                  value={districtID}
                  onChange={(e) => {
                    setDistrictID(e.target.value);
                    dispatch(getFacilityByDistrict(e.target.value));
                  }}
                >
                  <option>Select district</option>
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
                  className={`${
                    validationResult?.error?.facilityID && "is-invalid"
                  }`}
                  value={facilityID}
                  onChange={(e) => {
                    setFacilityID(+e.target.value);
                  }}
                >
                  <option>Select facility</option>
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
                    Date of incident<span className="orange-700">*</span>
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
                  value={dateReported}
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
                  type="textarea"
                  className={`${
                    validationResult?.error?.description && "is-invalid"
                  }`}
                  style={{ height: "150px" }}
                  maxLength={500}
                  value={description}
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
                  <option>Select priority</option>
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
                  value={firstLevelCategoryID}
                  onChange={(e) => {
                    SetFirstLevelCategoryID(+e.target.value);
                    dispatch(getIncidentCategoryByParent(e.target.value));
                  }}
                >
                  <option value="">Select first level category</option>
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
                  <Label for="secondLevelCategoryID">
                    Second level category<span className="orange-700">*</span>
                  </Label>
                  {validationResult?.error?.secondLevelCategoryID && (
                    <p className="text-danger">
                      {validationResult.error.secondLevelCategoryID}
                    </p>
                  )}
                </div>
                <Input
                  id="secondLevelCategoryID"
                  name="secondLevelCategoryID"
                  style={{ height: "50px" }}
                  type="select"
                  className={`${
                    validationResult?.error?.secondLevelCategoryID &&
                    "is-invalid"
                  }`}
                  onChange={(e) => {
                    SetSecondLevelCategoryID(+e.target.value);
                  }}
                >
                  <option>Select second level category</option>
                  {secondLevelCategory &&
                    secondLevelCategory.map((category) => (
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
                  <Label for="teamID">
                    Assign to team<span className="orange-700">*</span>
                  </Label>
                  {validationResult?.error?.teamID && (
                    <p className="text-danger">
                      {validationResult.error.teamID}
                    </p>
                  )}
                </div>
                <Input
                  id="teamID"
                  name="teamID"
                  style={{ height: "50px" }}
                  type="select"
                  className={`${
                    validationResult?.error?.teamID && "is-invalid"
                  }`}
                  onChange={(e) => {
                    setTeamID(+e.target.value);
                  }}
                >
                  <option>Select team</option>
                  {teams &&
                    teams.map((team) => (
                      <option key={team.oid} value={team.oid}>
                        {team.title}
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
                      setIsValidImg(true);
                    } else {
                      setAttacehMent(null);
                      imgRef.current.value = null;
                      setIsValidImg(false);
                    }
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="">
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
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
}

export default ManagerTicketCreationForm;

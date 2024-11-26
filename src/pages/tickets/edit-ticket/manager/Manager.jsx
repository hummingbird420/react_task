import React, { useEffect } from "react";
import { updateTicketData } from "../../store";
import { getProjectData } from "../../../project/store";
import {
  getFacilityData,
  getSingleFacilityData,
} from "../../../facility/store";
import { getUserData } from "../../../user/store";
import { getTeamData } from "../../../team/store";
import { getPriorityData } from "../../../priority/store";
import { getIncidentCategoryData } from "../../../incident-category/store";
import { getProvinceData } from "../../../province/store";
import { getMessageData } from "../../../message/store";
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
import { useMemo } from "react";
import { ArrowLeftCircle, CheckCircle } from "react-feather";
import managerEditTicketValidation from "../../../../validator/managerEditTicketValidation";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../config";
import { useContext } from "react";
import AttachmentContext from "../../../../context/AttachMent";

function CallCenterTicketEditForm() {
  // ! states are declared here
  const [systemID, setSystemID] = React.useState(null);
  const [facilityID, setFacilityID] = React.useState(null);
  const [dateReported, setDateReported] = React.useState(null);
  const [description, setDescription] = React.useState("");
  const [reportedBy, setReportedBy] = React.useState(null);
  const [provinceID, setProvinceID] = React.useState(null);
  const [districtID, setDistrictID] = React.useState(null);
  const [priorityID, setPriorityID] = React.useState(null);
  const [firstLevelCategoryID, SetFirstLevelCategoryID] = React.useState(null);
  const [secondLevelCategoryID, SetSecondLevelCategoryID] =
    React.useState(null);
  const [teamID, setTeamID] = React.useState(null);
  const [validationResult, setValidationResult] = React.useState({});
  const [isValidImg, setIsValidImg] = React.useState(true);

  // ! hooks are initialized here
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgRef = React.useRef(null);
  const { setAttacehMent } = useContext(AttachmentContext);

  // ! get data from redux store
  const projects = useSelector((state) => state.project.data);
  const teams = useSelector((state) => state.team.data);
  const priorities = useSelector((state) => state.priority.data);
  const incidentCategories = useSelector(
    (state) => state.incidentCategory.data
  );
  const ticketData = useSelector((state) => state.ticket.selectedTicket);
  const secondLevelCategory = useSelector(
    (state) => state.incidentCategory.parentCategory
  );
  const selectedFacility = useSelector(
    (state) => state.facility.selectedFacility
  );

  // ! useMemo is used here
  const date = useMemo(() => {
    if (ticketData) {
      const newDate = new Date(ticketData.incidents?.dateReported);
      return `${newDate.getFullYear()}-${
        `${newDate.getMonth() + 1}`.length === 1
          ? `0${newDate.getMonth() + 1}`
          : newDate.getMonth() + 1
      }-${
        `${newDate.getDate()}`.length === 1
          ? `0${newDate.getDate()}`
          : newDate.getDate()
      }`;
    }
  }, [ticketData]);

  // ! handler functions are declared here
  const handleReset = () => {
    setSystemID(null);
    setFacilityID(null);
    setDateReported(null);
    setDescription("");
    setReportedBy(null);
    setProvinceID(null);
    setDistrictID(null);
    setPriorityID(null);
    SetFirstLevelCategoryID(null);
    SetSecondLevelCategoryID(null);
    setTeamID(null);

    navigate(-1);
  };

  // ! form submit handler function
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

    const validation = managerEditTicketValidation(validationObj);

    if (validation.isValid) {
      const incidentObject = {
        ...ticketData.incidents,
        systemID: systemID,
        facilityID: facilityID,
        // dateReported: dateReported,
        description: description,
        reportedBy: reportedBy,
        teamID: teamID,
        // teams: null,
        // assignedTo: null,
        firstLevelCategoryID: firstLevelCategoryID,
        secondLevelCategoryID: secondLevelCategoryID,
        // thirdLevelCategoryID: null,
        // incidentCategory: null,
        priorityID: priorityID,
        // incidentPriority: null,
        // messages: null,
        // dateCreated: new Date(),
        dateOfIncident: dateReported,
        // createdBy: null,
        // dateModified: null,
        // modifiedBy: null,
        // isDeleted: false,
      };

      dispatch(updateTicketData(incidentObject));
      navigate(-1);
    } else {
      setValidationResult(validation);
    }
  };

  // ! useEffect hook is declared here
  useEffect(() => {
    dispatch(getProjectData());
    dispatch(getFacilityData());
    dispatch(getUserData());
    dispatch(getTeamData());
    dispatch(getPriorityData());
    dispatch(getIncidentCategoryData());
    dispatch(getProvinceData());
    dispatch(getMessageData());

    if (firstLevelCategoryID) {
      dispatch(getIncidentCategoryByParent(firstLevelCategoryID));
    }
  }, [dispatch, firstLevelCategoryID]);

  useEffect(() => {
    if (ticketData) {
      setSystemID(ticketData.incidents?.systemID);
      setFacilityID(ticketData.incidents?.facilityID);
      setDateReported(date);
      setDescription(ticketData.incidents?.description);
      setReportedBy(ticketData.incidents?.reportedBy);
      setProvinceID(ticketData.incidents?.provinceID);
      setDistrictID(ticketData.incidents?.districtID);
      setPriorityID(ticketData.incidents?.priorityID);
      SetFirstLevelCategoryID(ticketData.incidents?.firstLevelCategoryID);
      SetSecondLevelCategoryID(ticketData.incidents?.secondLevelCategoryID);
      setTeamID(ticketData.incidents?.teamID);
      dispatch(getSingleFacilityData(ticketData.incidents?.facilityID));
    }
  }, [ticketData, date, dispatch]);

  // useEffect(() => {
  //   if (updateTicketSuccess && screenshot) {
  //     const formData = new FormData();
  //     formData.append("Ffile", screenshot);

  //     const data = {
  //       id: ticketData.incidents?.oid,
  //       img: formData,
  //     };
  //     dispatch(uploadScreenShot(data));
  //   }
  // }, [screenshot, dispatch, ticketData, updateTicketSuccess]);

  return (
    <Card className="border-0 shadow px-4 py-3">
      <CardBody className="px-md-5">
        <div className="display-6 font-fallback">Edit Ticket</div>
        <hr className="py-2" />
        <Form>
          <Row>
            <Col md={12}>
              <FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  <Label for="systemID">System</Label>
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
                  className={validationResult?.error?.systemID && "is-invalid"}
                  disabled={true}
                  value={systemID}
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
                  <Label for="facilityID">Facility</Label>
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
                  className={
                    validationResult?.error?.facilityID && "is-invalid"
                  }
                  value={facilityID}
                  disabled={true}
                  onChange={(e) => {
                    setFacilityID(+e.target.value);
                  }}
                >
                  <option>Select Facility</option>
                  <option value={selectedFacility?.oid}>
                    {selectedFacility?.facilityName}
                  </option>
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
                  className={
                    validationResult?.error?.description && "is-invalid"
                  }
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
                  className={
                    validationResult?.error?.priorityID && "is-invalid"
                  }
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
                    First Level Category<span className="orange-700">*</span>
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
                  className={
                    validationResult?.error?.firstLevelCategoryID &&
                    "is-invalid"
                  }
                  value={firstLevelCategoryID}
                  onChange={(e) => {
                    SetFirstLevelCategoryID(+e.target.value);
                  }}
                >
                  <option>Select First Level Category</option>
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
                    Second Level Category<span className="orange-700">*</span>
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
                  className={
                    validationResult?.error?.secondLevelCategoryID &&
                    "is-invalid"
                  }
                  value={secondLevelCategoryID}
                  onChange={(e) => {
                    SetSecondLevelCategoryID(+e.target.value);
                  }}
                >
                  <option>Select Second Level Category</option>
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
                    Assign To Team<span className="orange-700">*</span>
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
                  value={teamID}
                  className={validationResult?.error?.teamID && "is-invalid"}
                  onChange={(e) => {
                    setTeamID(+e.target.value);
                  }}
                >
                  <option>Select Team</option>
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
              {ticketData?.incidents?.hasImg ? (
                <a
                  href={`${API_URL}/tuso-api/screenshot/key/${ticketData?.incidents?.oid}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Attachment
                </a>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <Row className="">
            <div className="d-flex mt-4 justify-content-start">
              <Button
                className="add-button border-0 px-4"
                type="submit"
                disabled={
                  ticketData.incidents?.secondLevelCategoryID &&
                  ticketData.incidents?.teamID
                }
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

export default CallCenterTicketEditForm;

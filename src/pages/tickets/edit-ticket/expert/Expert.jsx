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
import { getThirdLevelIncidentCategory } from "../../../incident-category/store";

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
import expertEditTicketValidation from "../../../../validator/expertEditTicketValidation";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../config";
import { useContext } from "react";
import AttachmentContext from "../../../../context/AttachMent";

function CallCenterTicketEditForm() {
  //! states are declared here
  const [systemID, setSystemID] = React.useState("");
  const [facilityID, setFacilityID] = React.useState("");
  const [dateReported, setDateReported] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [reportedBy, setReportedBy] = React.useState("");
  const [provinceID, setProvinceID] = React.useState("");
  const [districtID, setDistrictID] = React.useState("");
  const [priorityID, setPriorityID] = React.useState("");
  const [firstLevelCategoryID, SetFirstLevelCategoryID] = React.useState("");
  const [secondLevelCategoryID, SetSecondLevelCategoryID] = React.useState("");
  const [teamID, setTeamID] = React.useState("");
  const [thirdLevelCategoryID, SetThirdLevelCategoryID] = React.useState("");
  const [assignedTo, setAssignedTo] = React.useState("");
  const [validationResult, setValidationResult] = React.useState("");
  const [isValidImg, setIsValidImg] = React.useState(true);

  // ! hooks are initialized here
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgRef = React.useRef(null);
  const { setAttacehMent } = useContext(AttachmentContext);

  //! get data from redux store
  const projects = useSelector((state) => state.project.data);
  const priorities = useSelector((state) => state.priority.data);
  const incidentCategories = useSelector(
    (state) => state.incidentCategory.data
  );
  const ticketData = useSelector((state) => state.ticket.selectedTicket);
  const secondLevelCategory = useSelector(
    (state) => state.incidentCategory.parentCategory
  );
  const thirdLevelCategory = useSelector(
    (state) => state.incidentCategory.thirdLevelCategory
  );
  const selectedFacility = useSelector(
    (state) => state.facility.selectedFacility
  );
  const members = useSelector((state) => state.team.selectedTeamMembers);
  const loggedInuser = useSelector((state) => state.login.data);
  const teams = useSelector((state) => state.team.data);

  //! helper functions
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
    setSystemID("");
    setFacilityID("");
    setDateReported("");
    setDescription("");
    setReportedBy("");
    setProvinceID("");
    setDistrictID("");
    setPriorityID("");
    SetFirstLevelCategoryID("");
    SetSecondLevelCategoryID("");
    setTeamID("");
    navigate(-1);
  };

  // ! submit form data
  const onSubmit = (e) => {
    e.preventDefault();

    // ** form validation
    const validationObj = {
      systemID: systemID,
      facilityID: facilityID,
      dateReported: dateReported,
      description: description,
      provinceID: provinceID,
      districtID: districtID,
      priorityID: priorityID,
      firstLevelCategoryID: firstLevelCategoryID,
      secondLevelCategoryID: secondLevelCategoryID,
      thirdLevelCategoryID: thirdLevelCategoryID,
      assignedTo: assignedTo,
    };

    const validation = expertEditTicketValidation(validationObj);

    if (validation.isValid) {
      const incidentObject = {
        ...ticketData.incidents,
        systemID: systemID,
        facilityID: facilityID,
        // dateReported: new Date().toISOString(),
        description: description,
        // dateResolved: null,
        // isResolved: false,
        // isOpen: true,
        // projects: null,
        // facilities: null,
        reportedBy: reportedBy,
        teamID: teamID || null,
        // teams: null,
        assignedTo: assignedTo || null,
        firstLevelCategoryID: firstLevelCategoryID,
        secondLevelCategoryID: secondLevelCategoryID,
        thirdLevelCategoryID: thirdLevelCategoryID,
        // incidentCategory: null,
        priorityID: priorityID,
        // incidentPriority: null,
        // messages: null,
        // dateCreated: new Date().toISOString(),
        dateOfIncident: dateReported,
        // createdBy: null,
        // dateModified: null,
        // modifiedBy: null,
        // isDeleted: false,
      };

      console.log(incidentObject);
      dispatch(updateTicketData(incidentObject));
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } else {
      setValidationResult(validation);
    }
  };

  // ! run useeffect to get data from server
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
    if (secondLevelCategoryID) {
      dispatch(getThirdLevelIncidentCategory(secondLevelCategoryID));
    }
  }, [dispatch, firstLevelCategoryID, secondLevelCategoryID]);

  // ! run useeffect to set data to state
  useEffect(() => {
    if (ticketData) {
      setSystemID(ticketData.incidents?.systemID || "");
      setFacilityID(ticketData.incidents?.facilityID || "");
      setDateReported(date);
      setDescription(ticketData.incidents?.description || "");
      setReportedBy(ticketData.incidents?.reportedBy || "");
      setProvinceID(ticketData.incidents?.provinceID || "");
      setDistrictID(ticketData.incidents?.districtID || "");
      setPriorityID(ticketData.incidents?.priorityID || "");
      SetFirstLevelCategoryID(ticketData.incidents?.firstLevelCategoryID || "");
      SetSecondLevelCategoryID(
        ticketData.incidents?.secondLevelCategoryID || ""
      );
      setTeamID(ticketData.incidents?.teamID || "");
      dispatch(getSingleFacilityData(ticketData.incidents?.facilityID || ""));
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
    <Card className="border-0 shadow">
      <CardBody className="px-md-5">
        <div className="display-6 font-fallback">Edit Ticket</div>
        <hr className="py-2" />
        <Form>
          <Row>
            <Col md={12} className="">
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
                  disabled={true}
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
                  disabled={true}
                  type="select"
                  className={`${
                    validationResult?.error?.facilityID && "is-invalid"
                  }`}
                  value={facilityID}
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
                  className={`${
                    validationResult?.error?.dateReported && "is-invalid"
                  }`}
                  value={dateReported}
                  max={new Date().toISOString().split("T")[0]}
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
                  value={secondLevelCategoryID}
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
                  <Label for="thirdLevelCategoryID">
                    Third level category<span className="orange-700">*</span>
                  </Label>
                  {validationResult?.error?.thirdLevelCategoryID && (
                    <p className="text-danger">
                      {validationResult.error.thirdLevelCategoryID}
                    </p>
                  )}
                </div>
                <Input
                  id="thirdLevelCategoryID"
                  name="thirdLevelCategoryID"
                  style={{ height: "50px" }}
                  type="select"
                  className={`${
                    validationResult?.error?.thirdLevelCategoryID &&
                    "is-invalid"
                  }`}
                  onChange={(e) => {
                    SetThirdLevelCategoryID(+e.target.value);
                  }}
                >
                  <option>Select third level category</option>
                  {thirdLevelCategory &&
                    thirdLevelCategory.map((category) => (
                      <option key={category.oid} value={category.oid}>
                        {category.incidentCategorys}
                      </option>
                    ))}
                </Input>
              </FormGroup>
            </Col>
            <Col
              md={12}
              className={
                loggedInuser?.role === "Administrator" ? "d-block" : "d-none"
              }
            >
              <FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  <Label for="assignedTo">Assign to team</Label>
                  {validationResult?.error?.assignedTo && (
                    <p className="text-danger">
                      {validationResult.error.assignedTo}
                    </p>
                  )}
                </div>
                <Input
                  id="assignedTo"
                  name="assignedTo"
                  style={{ height: "50px" }}
                  type="select"
                  className={`${
                    validationResult?.error?.assignedTo && "is-invalid"
                  }`}
                  onChange={(e) => {
                    setTeamID(+e.target.value);
                  }}
                >
                  <option>Select member</option>
                  {teams &&
                    teams.map((team) => (
                      <option key={team?.oid} value={team?.oid}>
                        {team?.title}
                      </option>
                    ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={12} className="">
              <FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  <Label for="assignedTo">Assign to</Label>
                  {validationResult?.error?.assignedTo && (
                    <p className="text-danger">
                      {validationResult.error.assignedTo}
                    </p>
                  )}
                </div>
                <Input
                  id="assignedTo"
                  name="assignedTo"
                  style={{ height: "50px" }}
                  type="select"
                  className={`${
                    validationResult?.error?.assignedTo && "is-invalid"
                  }`}
                  onChange={(e) => {
                    setAssignedTo(+e.target.value);
                  }}
                >
                  <option value="">Select member</option>
                  {members &&
                    members.map((user) => (
                      <option
                        key={user?.userAccounts?.oid}
                        value={user?.userAccounts?.oid}
                      >
                        {user?.userAccounts?.name}
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

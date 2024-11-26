import React, { useEffect } from "react";
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
import { updateTicketData } from "../../store";

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
import clientEditTicketValidation from "../../../../validator/clientEditTicketValidation";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../../config";
import { useContext } from "react";
import AttachmentContext from "../../../../context/AttachMent";

function CallCenterTicketEditForm() {
  // ! states are declared here
  const [systemID, setSystemID] = React.useState("");
  const [facilityID, setFacilityID] = React.useState("");
  const [dateReported, setDateReported] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [validationResult, setValidationResult] = React.useState("");
  const [isValidImg, setIsValidImg] = React.useState(true);

  // ! hooks are initialized here
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgRef = React.useRef(null);
  const { setAttacehMent } = useContext(AttachmentContext);

  // ! get data from redux store
  const projects = useSelector((state) => state.project.data);
  const logedInuser = useSelector((state) => state.login.data);
  const ticketData = useSelector((state) => state.ticket.selectedTicket);
  const selectedFacility = useSelector(
    (state) => state.facility.selectedFacility
  );

  // ! extra variables
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

    // ridireact to the list page
    setTimeout(() => {
      navigate(-1);
    }, 1500);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const validationObj = {
      systemID,
      facilityID,
      dateReported,
      description,
    };

    const validation = clientEditTicketValidation(validationObj);
    if (validation.isValid) {
      const incidentObject = {
        ...ticketData.incidents,
        systemID: systemID,
        facilityID: facilityID,
        // dateReported: dateReported,
        dateOfIncident: dateReported,
        description: description,
        // dateResolved: null,
        // isResolved: false,
        // isOpen: true,
        // projects: null,
        // facilities: null,
        reportedBy: logedInuser.oid,
        // teamID: null,
        // teams: null,
        // assignedTo: null,
        // firstLevelCategoryID: null,
        // secondLevelCategoryID: null,
        // thirdLevelCategoryID: null,
        // incidentCategory: null,
        // priorityID: null,
        // incidentPriority: null,
        // messages: null,
        // dateCreated: new Date(),
        // createdBy: null,
        // dateModified: null,
        // modifiedBy: null,
        // isDeleted: false,
      };
      console.log(incidentObject);
      dispatch(updateTicketData(incidentObject));
      handleReset();
    } else {
      setValidationResult(validation);
    }
  };

  // ! useEffect hooks are declared here
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

  // ** handle change
  useEffect(() => {
    if (ticketData) {
      setSystemID(ticketData.incidents?.systemID || "");
      setFacilityID(ticketData.incidents?.facilityID || "");
      setDateReported(date);
      setDescription(ticketData.incidents?.description || "");
      dispatch(getSingleFacilityData(ticketData.incidents?.facilityID || ""));
    }
  }, [ticketData, date, dispatch]);

  return (
    <Card className="border-0 shadow px-md-5 py-md-4 py-2 mb-5">
      <CardBody className="">
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
                  className={validationResult?.error?.systemID && "is-invalid"}
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

            <Col md={12} className="">
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
                  disabled={true}
                  className={
                    validationResult?.error?.facilityID && "is-invalid"
                  }
                  value={facilityID}
                  onChange={(e) => {
                    setFacilityID(+e.target.value);
                  }}
                >
                  <option>Select Facility</option>
                  <option
                    key={selectedFacility?.oid}
                    value={selectedFacility?.oid}
                  >
                    {selectedFacility?.facilityName}
                  </option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={12} className="">
              <FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  <Label for="dateReported">Date of Incident</Label>
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
                  className={
                    validationResult?.error?.dateReported && "is-invalid"
                  }
                  value={dateReported}
                  onChange={(e) => {
                    setDateReported(e.target.value);
                  }}
                />
              </FormGroup>
            </Col>
            <Col md={12} className="">
              <FormGroup>
                <div className="d-flex justify-content-between align-items-center">
                  <Label for="description">Incident</Label>
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
            <div className="d-flex mt-2 justify-content-start">
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

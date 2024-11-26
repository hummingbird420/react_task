import React from "react";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { clearDistrict, getDistrictByProvince } from "../../province/store";
import { clearFicility, getFacilityByDistrict } from "../../district/store";
import {
  clearParentCategory,
  clearThirdCategory,
  getIncidentCategoryByParent,
} from "../../incident-category/store";
import { getThirdLevelIncidentCategory } from "../../incident-category/store";
import { useDispatch, useSelector } from "react-redux";

function SearchForm({ setSearchObj, setCurrentPage, setStatus, setTicketNo }) {
  // ! states are declared here
  const [systemID, setSystemID] = useState("");
  const [facilityID, setFacilityID] = useState("");
  const [provinceID, setProvinceID] = useState("");
  const [districtID, setDistrictID] = useState("");
  const [firstLevelCategoryID, SetFirstLevelCategoryID] = useState("");
  const [secondLevelCategoryID, SetSecondLevelCategoryID] = useState("");
  const [thirdLevelCategoryID, SetThirdLevelCategoryID] = useState("");
  const [reportedDateTo, setReportedDateTo] = useState("");
  const [reportedDateFrom, setReportedDateFrom] = useState("");
  const [statusForm, setStatusForm] = useState("");

  // ! hooks are initialized here
  const dispatch = useDispatch();

  // ! get data from redux store
  const projects = useSelector((state) => state.project.data);
  const provinces = useSelector((state) => state.province.data);
  const districts = useSelector((state) => state.province.district);
  const facilities = useSelector((state) => state.district.facility);
  const firstLevelCategories = useSelector(
    (state) => state.incidentCategory.data
  );
  const secondLevelCategories = useSelector(
    (state) => state.incidentCategory.parentCategory
  );
  const thirdLevelCategories = useSelector(
    (state) => state.incidentCategory.thirdLevelCategory
  );
  const loggedInUser = useSelector((state) => state.login.data);
  const teamLeader = useSelector((state) => state.user.teamLeader);

  // ! handler functions are declared here
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchObj = {
      systemID: systemID || null,
      facilityID: facilityID || null,
      provinceID: provinceID || null,
      districtID: districtID || null,
      firstLevelCategoryID: firstLevelCategoryID || null,
      secondLevelCategoryID: secondLevelCategoryID || null,
      thirdLevelCategoryID: thirdLevelCategoryID || null,
      status: statusForm || null,
      dateFrom: reportedDateFrom || null,
      dateTo: reportedDateTo || null,
      userAccountID: loggedInUser?.oid || null,
      roleID: loggedInUser?.roleID || null,
      teamID: teamLeader?.teamID || null,
    };
    console.log(searchObj);
    setCurrentPage(0);
    setStatus(0);
    setSearchObj(searchObj);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setCurrentPage(0);
    setTicketNo("");
    setProvinceID("");
    setDistrictID("");
    dispatch(clearDistrict());
    dispatch(clearFicility());
    dispatch(clearParentCategory());
    dispatch(clearThirdCategory());
    setSearchObj({});
  };

  return (
    <Card className="custom-search-form position-sticky px-3 py-3">
      <Row>
        <Form onSubmit={handleSubmit}>
          <Col md={12}>
            <FormGroup>
              <Label for="systemID">System</Label>
              <Input
                type="select"
                name="systemID"
                id="systemID"
                value={systemID}
                onChange={(e) => {
                  setSystemID(+e.target.value);
                }}
              >
                <option>Select System</option>
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
              <Label for="status">Status</Label>
              <Input
                type="select"
                name="status"
                id="status"
                value={statusForm}
                onChange={(e) => {
                  setStatusForm(+e.target.value);
                }}
              >
                <option>Select Status</option>
                <option value="1">Open</option>
                <option value="2">Close</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="reportedDateFrom">Date Reported From</Label>
              <Input
                type="date"
                name="reportedDateFrom"
                id="reportedDateFrom"
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  setReportedDateFrom(e.target.value);
                }}
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="reportedTo">To</Label>
              <Input
                type="date"
                name="reportedTo"
                id="reportedTo"
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  setReportedDateTo(e.target.value);
                }}
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="provinceID">Province</Label>
              <Input
                type="select"
                name="provinceID"
                id="provinceID"
                value={provinceID}
                onChange={(e) => {
                  setProvinceID(+e.target.value);
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
              <Label for="districtID">District</Label>
              <Input
                type="select"
                name="districtID"
                id="districtID"
                value={districtID}
                onChange={(e) => {
                  setDistrictID(+e.target.value);
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
              <Label for="facilityID">Facility</Label>
              <Input
                type="select"
                name="facilityID"
                id="facilityID"
                value={facilityID}
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
              <Label for="firstLevelCategoryID">Category ( Level 1 )</Label>
              <Input
                type="select"
                name="firstLevelCategoryID"
                id="firstLevelCategoryID"
                value={firstLevelCategoryID}
                onChange={(e) => {
                  SetFirstLevelCategoryID(+e.target.value);
                  dispatch(getIncidentCategoryByParent(e.target.value));
                }}
              >
                <option>Select Category</option>
                {firstLevelCategories &&
                  firstLevelCategories.map((category) => (
                    <option key={category.oid} value={category.oid}>
                      {category.incidentCategorys}
                    </option>
                  ))}
              </Input>
            </FormGroup>
          </Col>
          <Col
            md={12}
            className={loggedInUser?.role === "Agent" ? "d-none" : "d-block"}
          >
            <FormGroup>
              <Label for="secondLevelCategoryID">Category ( Level 2 )</Label>
              <Input
                type="select"
                name="secondLevelCategoryID"
                id="secondLevelCategoryID"
                value={secondLevelCategoryID}
                onChange={(e) => {
                  SetSecondLevelCategoryID(+e.target.value);
                  dispatch(getThirdLevelIncidentCategory(e.target.value));
                }}
              >
                <option>Select Category</option>
                {secondLevelCategories &&
                  secondLevelCategories.map((category) => (
                    <option key={category.oid} value={category.oid}>
                      {category.incidentCategorys}
                    </option>
                  ))}
              </Input>
            </FormGroup>
          </Col>
          <Col
            md={12}
            className={`${
              loggedInUser?.role === "Agent" ||
              loggedInUser?.role === "Supervisor"
                ? "d-none"
                : "d-block"
            }`}
          >
            <FormGroup>
              <Label for="thirdLevelCategoryID">Category ( Level 3 )</Label>
              <Input
                type="select"
                name="thirdLevelCategoryID"
                id="thirdLevelCategoryID"
                value={thirdLevelCategoryID}
                onChange={(e) => {
                  SetThirdLevelCategoryID(+e.target.value);
                }}
              >
                <option>Select Category</option>
                {thirdLevelCategories &&
                  thirdLevelCategories.map((category) => (
                    <option key={category.oid} value={category.oid}>
                      {category.incidentCategorys}
                    </option>
                  ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={12}>
            <Button
              outline
              className="add-button border-0 w-100 w-md-normal"
              type="submit"
            >
              Search
            </Button>
          </Col>
          <Col md={12}>
            <button
              outline
              className="add-button-outline rounded w-100 w-md-normal mt-3 py-1"
              type="button"
              onClick={handleClear}
            >
              Clear
            </button>
          </Col>
        </Form>
      </Row>
    </Card>
  );
}

export default React.memo(SearchForm);

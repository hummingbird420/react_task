import React, { useState } from "react";
import { PlusCircle } from "react-feather";
import { BsFilterLeft } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Input, Label, Row } from "reactstrap";
import useWindowWidth from "../../../customHooks/useWindowWidth";
import TicketInfoCardAdvance from "../TicketInfoCardAdvance";
import SearchForm from "./SearchForm";
import SearchOffcanvas from "./SearchOffcanvas";

function SearchIndexCard({
  setSearchObj,
  handlePagination,
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  setStatus,
  status,
  ticketNo,
  setTicketNo,
}) {
  // ! states are declared here
  const [show, setShow] = useState(false);

  // ! get data from redux store
  const ticketData = useSelector((state) => state.ticket.data.list);
  const totalIncidentCount = useSelector(
    (state) => state.ticket.data.totalIncident
  );
  const loggedInUser = useSelector((state) => state.login.data);

  // ! hooks are initialized here
  const navigate = useNavigate();
  const pixel600 = useWindowWidth(600);
  const pixel768 = useWindowWidth(768);

  // ! handler functions are declared here
  const handleButtonClick = () => {
    navigate(`/ticket/create/${loggedInUser?.role?.toLowerCase()}`);
  };

  const handleLimitChange = (e) => {
    setLimit(+e.target.value);
    setCurrentPage(0);
  };
  const handleSearchChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setCurrentPage(0);
      setStatus(0);
      setTicketNo(e.target.value);
    }
  };

  const handleSearchShow = () => setShow(true);

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(totalIncidentCount / limit) || 1}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end mt-1 pagination-without-padding"
    />
  );

  return (
    <div className="px-md-4 py-md-2 py-4">
      <div className="display-6 font-fallback">Tickets</div>
      <hr className="border border-2 border-dark mb-md-4" />
      <Row className="d-xl-flex d-none" style={{ height: "76vh" }}>
        <Col
          lg={4}
          className="position-xl-fixed position-static"
          style={{ height: "100%", width: "40%", left: "0" }}
        >
          <div className="overflow-auto" style={{ height: "100%" }}>
            <Card className="custom-search-form position-sticky border-0 shadow">
              <SearchForm
                setSearchObj={setSearchObj}
                setCurrentPage={setCurrentPage}
                setStatus={setStatus}
                setTicketNo={setTicketNo}
              />
            </Card>
          </div>
        </Col>
        <Col
          lg={8}
          className="position-xl-fixed position-static"
          style={{ height: "100%", width: "59%", right: "0" }}
        >
          <div className="overflow-auto" style={{ height: "100%" }}>
            <Card className="border-0 shadow p-4">
              <Row className="mb-md-3">
                <Col md={12} className="text-start">
                  <div
                    className={`d-flex align-items-center  ${
                      loggedInUser?.role?.toLowerCase() === "expert"
                        ? "justify-content-end"
                        : "justify-content-between"
                    }`}
                  >
                    <Button
                      outline
                      color="info"
                      className={`${
                        loggedInUser?.role?.toLowerCase() === "expert"
                          ? "d-none"
                          : "d-block"
                      } add-button border-0 me-4 me-md-0`}
                      onClick={handleButtonClick}
                    >
                      <PlusCircle size={20} className="mb-1" />
                      &nbsp;Report Problem
                    </Button>
                    <div className="d-flex align-items-center font-fallback default-fz">
                      <div>
                        <Input
                          type="select"
                          value={status}
                          onChange={(e) => {
                            setSearchObj({});
                            setCurrentPage(0);
                            setTicketNo("");
                            setStatus(+e.target.value);
                          }}
                        >
                          <option value={0}>All</option>
                          <option value={1}>Open</option>
                          <option value={2}>Close</option>
                        </Input>
                      </div>
                      &nbsp;
                      <div className="d-flex align-items-center default-fz font-fallback">
                        <Input
                          type="text"
                          placeholder="Search by Ticket no"
                          className="font-fallback default-fz"
                          id="search"
                          name="search"
                          value={ticketNo}
                          onChange={handleSearchChange}
                        />
                      </div>
                      &nbsp;&nbsp;
                    </div>
                  </div>
                </Col>
              </Row>
              {ticketData?.length > 0 ? (
                ticketData.map((ticket) => (
                  <TicketInfoCardAdvance
                    key={ticket.oid}
                    data={ticket}
                    limit={limit}
                    currentPage={currentPage}
                    status={status}
                  />
                ))
              ) : (
                <p className="text-center fw-bolder py-5 font-fallback default-fz">
                  No data found yet.
                </p>
              )}

              <div className="d-flex justify-content-between align-items-center responsive_table_class">
                <div className={`d-flex align-items-center`}>
                  <Label
                    for="limit"
                    className="default-fz font-fallback me-2 mb-0"
                  >
                    Show
                  </Label>
                  <Input
                    name="limit"
                    id="limit"
                    type="select"
                    className="orange-500  font-fallback default-fz py-0 mb-0"
                    value={limit}
                    onChange={handleLimitChange}
                  >
                    <option value="10">10</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                  </Input>
                </div>
                &nbsp; &nbsp;
                <div className="">
                  <CustomPagination
                    currentPage={currentPage}
                    limit={limit}
                    setCurrentPage={setCurrentPage}
                    totalItemCount={totalIncidentCount}
                  />
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
      <Row className="d-xl-none d-block">
        <Col xl={8}>
          <Card className="border-0 shadow p-4">
            <Row className="mb-md-3">
              <Col md={12} className="text-start">
                <div className="d-md-flex align-items-center justify-content-between font-fallback default-fz">
                  <div
                    className={`d-flex justify-content-between ${
                      pixel768 ? "mb-1" : ""
                    }`}
                  >
                    <Button
                      outline
                      color="info"
                      className={`${
                        loggedInUser?.role?.toLowerCase() === "expert"
                          ? "d-none"
                          : "d-block"
                      } add-button border-0  me-md-0 ${
                        pixel600 ? "w-100" : ""
                      }`}
                      onClick={handleButtonClick}
                    >
                      <PlusCircle size={20} className="mb-1" />
                      &nbsp;Report Problem
                    </Button>
                    &nbsp;
                    <Button
                      outline
                      color="secondary"
                      className="px-3"
                      onClick={handleSearchShow}
                    >
                      <BsFilterLeft size={25} className="" />
                    </Button>
                  </div>
                  <div
                    className={` align-items-center justify-content-between font-fallback default-fz ${
                      pixel600 ? "d-flex w-100" : "d-flex"
                    } ${pixel768 ? "mb-1" : ""}`}
                  >
                    <div className="w-50">
                      <Input
                        type="select"
                        className="font-fallback default-fz"
                        value={status}
                        onChange={(e) => {
                          setSearchObj({});
                          setCurrentPage(0);
                          setTicketNo("");
                          setStatus(+e.target.value);
                        }}
                      >
                        <option value={0}>All</option>
                        <option value={1}>Open</option>
                        <option value={2}>Close</option>
                      </Input>
                    </div>
                    &nbsp;
                    <div className="d-flex align-items-center justify-content-end default-fz font-fallback w-50">
                      <Input
                        type="text"
                        placeholder="Search by Ticket no"
                        className="font-fallback default-fz"
                        id="search"
                        name="search"
                        value={ticketNo}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            {ticketData?.length > 0 ? (
              ticketData.map((ticket) => (
                <TicketInfoCardAdvance
                  key={ticket.oid}
                  data={ticket}
                  currentPage={currentPage}
                  limit={limit}
                  status={status}
                />
              ))
            ) : (
              <p className="fw-bolder text-center py-5 font-fallback default-fz">
                No data found yet.
              </p>
            )}
            <div className="d-flex justify-content-between align-items-center ">
              <div className={`d-flex align-items-center`}>
                <Label
                  for="limit"
                  className="default-fz font-fallback me-2 mb-0 d-none d-md-block"
                >
                  Show
                </Label>
                <Input
                  name="limit"
                  id="limit"
                  type="select"
                  className="orange-500  font-fallback default-fz py-0 mb-0 mb-2"
                  value={limit}
                  onChange={handleLimitChange}
                >
                  <option value="10">10</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                </Input>
              </div>
              &nbsp; &nbsp;
              <div className="">
                <CustomPagination
                  currentPage={currentPage}
                  limit={limit}
                  setCurrentPage={setCurrentPage}
                  totalItemCount={totalIncidentCount}
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <SearchOffcanvas
        setSearchObj={setSearchObj}
        show={show}
        setShow={setShow}
        setCurrentPage={setCurrentPage}
        setStatus={setStatus}
        setTicketNo={setTicketNo}
      />
    </div>
  );
}

export default SearchIndexCard;

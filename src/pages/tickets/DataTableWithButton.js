/* eslint-disable comma-dangle */
/* eslint-disable multiline-ternary */
/* eslint-disable semi */

import ReactPaginate from "react-paginate";
import { PlusCircle } from "react-feather";
import { Row, Card, Button, CardHeader, Label, Input } from "reactstrap";
import TicketInfoCard from "./TicketInfoCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSingleUserData } from "../user/store";

const DataTableWithButtons = ({
  data,
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  status,
  setStatus,
  ticketNo,
  setTicketNo,
}) => {
  // ** States
  // const [ticketNo, setTicketNo] = useState("");

  // ! hooks are initialize here
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ! get data from redux store
  const loggedInuser = useSelector((state) => state.login.data);
  const totalItem = useSelector((state) => state.ticket.data.totalIncident);
  console.log("totalItem", totalItem);

  // ! handler functions are declared here
  const handleTicketCreate = () => {
    navigate(`/ticket/create/${loggedInuser.role}`);
  };

  // ! useEffect hooks are declared here
  useEffect(() => {
    dispatch(getSingleUserData(loggedInuser.oid));
  }, [dispatch, loggedInuser.oid]);

  // ! pagination handler
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  const handleLimitChange = (e) => {
    setCurrentPage(0);
    setLimit(e.target.value);
  };

  const handleSearchChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setTicketNo(e.target.value);
    }
  };

  // ! Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={Math.ceil(totalItem / limit) || 1}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mb-0 pagination-without-padding"
    />
  );

  return (
    <>
      <Card className="shadow pb-5">
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom mb-3">
          <div className="d-md-flex align-items-center justify-content-between">
            <Button
              outline
              color="info"
              className={`${
                loggedInuser?.role?.toLowerCase() === "expert"
                  ? "d-none"
                  : "d-block"
              } add-button border-0 me-4 me-md-0`}
              onClick={handleTicketCreate}
            >
              <PlusCircle size={20} className="mb-1" />
              &nbsp;Report Problem
            </Button>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center default-fz font-fallback">
                <Input
                  value={status}
                  type="select"
                  className="me-2"
                  onChange={(e) => {
                    setStatus(+e.target.value);
                  }}
                >
                  <option value={0}>All</option>
                  <option value={1}>Open</option>
                  <option value={2}>Close</option>
                </Input>
                <Input
                  type="text"
                  placeholder="Enter Ticket No"
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
        </CardHeader>
        <Row className="px-5">
          {data?.length > 0 ? (
            data.map((ticket) => (
              <TicketInfoCard
                key={ticket?.oid}
                data={ticket}
                currentPage={currentPage}
                limit={limit}
                status={status}
              />
            ))
          ) : (
            <Card className="border-0">
              <p className="text-center font-fallback default-fz fw-bold">
                No problem has been reported yet!
              </p>
            </Card>
          )}
        </Row>
        <Row className="px-5 mt-4">
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
                totalItemCount={totalItem}
              />
            </div>
          </div>
        </Row>
      </Card>
    </>
  );
};

export default DataTableWithButtons;

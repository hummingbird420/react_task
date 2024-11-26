import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TbMessageCircle } from "react-icons/tb";
import { Card, CardBody, CardText, Button, ButtonGroup, Row } from "reactstrap";
import { useEffect } from "react";
import { Edit, XCircle } from "react-feather";
import swalWithCustomButtons from "../../components/swal/SwalWithCustomButton";
import {
  clearSuccessAndError,
  clientTicketData,
  closeListTicketData,
  getExpertTeamLeaderTicketData,
  getExpertTicketData,
  getSingTicketData,
  getTicketData,
} from "./store";
import { API_URL } from "../../config";

function TicketInfoCard({ data, currentPage, limit, status }) {
  // ! date are declared here
  const date = new Date(data.dateReported);

  // ! hooks are initialized here
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const start = currentPage * limit;

  // ! get data from redux store
  const teamLeader = useSelector((state) => state.user.teamLeader);
  const loggedInuser = useSelector((state) => state.login.data);
  const { closeTicketSuccess } = useSelector((state) => state.ticket);

  // ! handler functions are declared here
  const haldeViewClick = () => {
    navigate(`/ticket/view/${data.oid}`);
  };
  const handleEditClick = () => {
    navigate(`/ticket/edit/${loggedInuser.role?.toLowerCase()}/${data.oid}`);
  };

  const hadleDeleteTicket = (id) => {
    dispatch(getSingTicketData(id));
    swalWithCustomButtons
      .fire({
        title: "Are you sure?",
        text: "This ticket will be closed. Do you confirm that?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, close it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(closeListTicketData(id));
        }
      });
  };

  // ! useEffect are declared here
  useEffect(() => {
    if (closeTicketSuccess) {
      console.log("useEffect functon called");
      if (loggedInuser?.role?.toLowerCase() === "client") {
        dispatch(
          clientTicketData({ key: loggedInuser?.oid, limit, start, status })
        );
      } else if (loggedInuser?.role?.toLowerCase() === "expert") {
        dispatch(
          getExpertTicketData({ key: loggedInuser?.oid, limit, start, status })
        );
      } else if (
        loggedInuser?.role?.toLowerCase() === "expert" &&
        teamLeader?.isTeamLead
      ) {
        dispatch(
          getExpertTeamLeaderTicketData({
            key: teamLeader?.teamID,
            limit,
            start,
            status,
          })
        );
      } else if (
        loggedInuser?.role?.toLowerCase() === "administrator" ||
        loggedInuser?.role?.toLowerCase() === "supervisor" ||
        loggedInuser?.role?.toLowerCase() === "agent"
      ) {
        dispatch(getTicketData({ limit, start, status }));
      }
      dispatch(clearSuccessAndError());
    }
  }, [
    closeTicketSuccess,
    dispatch,
    loggedInuser,
    teamLeader,
    start,
    limit,
    status,
  ]);

  return (
    <Card className="card-apply-job border mb-4">
      <CardBody>
        <div className="d-xl-flex justify-content-between fw-bold">
          <div className="d-md-flex">
            <div className="">
              <p>System: {data?.projectname}</p>
            </div>
            <div className="d-flex ms-md-3">
              <p>Ticket No: {data.oid}</p>
            </div>
          </div>
          <div className="d-md-flex">
            <div className="">
              <p>
                Date Reported:&nbsp;
                {date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="ms-md-3">
              <p>Status: {data.isOpen ? "Open" : "Close"}</p>
            </div>
          </div>
        </div>

        <CardText className="mb-2 mt-1 text-justify">
          {data.description}
        </CardText>
        <div className="mt-3">
          {data?.hasImg && (
            <a
              href={`${API_URL}/tuso-api/screenshot/key/${data?.oid}`}
              target="_blank"
              rel="noreferrer"
            >
              Attachment
            </a>
          )}
        </div>
        <Row className="mt-4">
          <ButtonGroup>
            <Button
              color="dark"
              disabled={data.isOpen ? false : true}
              outline
              className="font-fallback default-fz"
              onClick={handleEditClick}
            >
              <Edit size={18} className=" me-1 mb-1" />
              Edit Ticket
            </Button>
            <Button
              color="success"
              outline
              className="font-fallback default-fz"
              onClick={haldeViewClick}
            >
              <TbMessageCircle size={21} className=" me-1 mb-1" />
              Follow up
            </Button>
            <Button
              color="danger"
              outline
              className="font-fallback default-fz"
              disabled={data.isOpen ? false : true}
              onClick={() => hadleDeleteTicket(data?.oid)}
            >
              <XCircle size={18} className=" me-1 mb-1" />
              Close Ticket
            </Button>
          </ButtonGroup>
        </Row>
      </CardBody>
    </Card>
  );
}

export default TicketInfoCard;

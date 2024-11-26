import React, { useEffect } from "react";
import { Edit, XCircle } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TbMessageCircle } from "react-icons/tb";
import {
  Card,
  CardBody,
  CardText,
  Button,
  Col,
  Row,
  ButtonGroup,
} from "reactstrap";
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

function TicketInfoCardAdvance({ data, currentPage, limit, status }) {
  // ! date are declared here
  const date = new Date(data.dateReported);

  // ! hooks are initialized here
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const start = currentPage * limit;

  // ! get data from redux store
  const loggedInuser = useSelector((state) => state.login.data);
  const teamLeader = useSelector((state) => state.user.teamLeader);
  const { closeTicketSuccess } = useSelector((state) => state.ticket);

  // ! handler functions are declared here
  const haldeViewClick = () => {
    navigate(`/ticket/view/${data.oid}`);
  };
  const handleEditClick = () => {
    navigate(`/ticket/edit/${loggedInuser?.role?.toLowerCase()}/${data?.oid}`);
  };
  const handleCloseTicket = (id) => {
    dispatch(getSingTicketData(id));
    console.log("id", id);
    console.log("delete function called");
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
          console.log("id from modal logged in", id);
          dispatch(closeListTicketData(id));
        }
      });
  };

  // ! useEffect are declared here
  useEffect(() => {
    if (closeTicketSuccess) {
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
    limit,
    start,
    status,
  ]);

  return (
    <Card className="py-2 px-3 mb-4">
      <CardBody>
        <Row className="gx-5">
          <Col lg={8}>
            <div className="fw-bold font-fallback default-fz">Incident</div>
            <CardText className="mb-2 mt-1 text-justify">
              {data.description}
            </CardText>
          </Col>
          <Col lg={4} className="pt-4 ps-lg-2 ">
            <div>
              <p className="mb-0 fw-bold font-fallback">
                Ticket No: {data.oid}
              </p>
              <p className="mb-0 font-fallback">System: {data?.projectname}</p>
              <p className="mb-0 font-fallback">
                Status: {data.isOpen ? "Open" : "Close"}
              </p>
              <p className="mb-0 font-fallback">
                Date Reported: &nbsp;
                {date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <p className="mb-0 font-fallback">
                Date of Incident: &nbsp;
                {date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="mt-4">
              <p className="mb-0 fw-bold font-fallback">{data?.facilityName}</p>
              <p className="mb-0 font-fallback">{data?.fullName}</p>
              <p className="mb-0 font-fallback">{`${data?.phoneNumber}`}</p>
            </div>
            <div className="mt-4">
              <p
                className={`mb-0 fw-bold font-fallback ${
                  data?.teamName ? "d-block" : "d-none"
                }`}
              >
                Team:&nbsp;{data?.teamName}
              </p>
              <p
                className={`mb-0 font-fallback ${
                  data.assignedName ? "d-block" : "d-none"
                }`}
              >
                Expert:&nbsp;{data?.assignedName}
              </p>
            </div>
          </Col>
          {data?.hasImg && (
            <a
              href={`${API_URL}/tuso-api/screenshot/key/${data?.oid}`}
              target="_blank"
              rel="noreferrer"
            >
              Attachment
            </a>
          )}
        </Row>
        <Row className="d-flex mt-4">
          {/* <Col> */}
          <ButtonGroup className="">
            <Button
              color="dark"
              outline
              disabled={
                loggedInuser?.role?.toLowerCase() === "expert" &&
                !teamLeader?.isTeamLead
                  ? true
                  : loggedInuser?.role?.toLowerCase() === "expert" &&
                    teamLeader?.isTeamLead &&
                    data.assignedTo !== null
                  ? true
                  : data.assignedTo !== null
                  ? true
                  : data?.isOpen
                  ? false
                  : true
              }
              className="font-fallback default-fz"
              onClick={handleEditClick}
            >
              <Edit size={18} className="mb-1" />
              &nbsp;
              {loggedInuser?.role?.toLowerCase() === "client" ||
              loggedInuser?.role?.toLowerCase() === "agent"
                ? "Edit Ticket"
                : loggedInuser?.role?.toLowerCase() === "expert" &&
                  !teamLeader?.isTeamLead
                ? "Edit Ticket"
                : loggedInuser?.role?.toLowerCase() === "expert" &&
                  teamLeader?.isTeamLead
                ? "Assign Member"
                : loggedInuser?.role?.toLowerCase() === "supervisor"
                ? "Assign Team"
                : "Assign Ticket"}
            </Button>
            <Button
              color="success"
              outline
              className="font-fallback default-fz"
              onClick={haldeViewClick}
            >
              <TbMessageCircle size={21} className="mb-1" />
              &nbsp;Follow up
            </Button>
            <Button
              color="danger"
              outline
              disabled={data.isOpen ? false : true}
              className="font-fallback default-fz"
              onClick={() => handleCloseTicket(data?.oid)}
            >
              <XCircle size={18} className="mb-1" />
              &nbsp;Close Ticket
            </Button>
          </ButtonGroup>
        </Row>
      </CardBody>
    </Card>
  );
}

export default TicketInfoCardAdvance;

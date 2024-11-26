import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardText, Button } from "reactstrap";
import swalWithCustomButtons from "../../../components/swal/SwalWithCustomButton";
import { TbMessageCircle } from "react-icons/tb";
import { closeTicketData } from "../store";
import { XCircle } from "react-feather";
import { API_URL } from "../../../config";

function SingleTicketCard({ setCommentModal, commentModal }) {
  const data = useSelector((state) => state.ticket.selectedTicket.incidents);
  const date = new Date(data?.dateReported);
  const dispatch = useDispatch();

  return (
    <Card className="card-apply-job border-0 mt-4">
      <CardBody>
        <div className="d-md-flex justify-content-between fw-bold">
          <div className="d-md-flex">
            <div className="">
              <p className="mb-0">System: {data?.projectname}</p>
            </div>
            <div className="ms-md-3">
              <p className="mb-0">Ticket No: {data?.oid}</p>
            </div>
          </div>
          <div className="d-md-flex">
            <div className="">
              <p className="mb-0">
                Date Reported:{" "}
                {date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="ms-md-3">
              <p className="mb-0">Status: {data?.isOpen ? "Open" : "Close"}</p>
            </div>
          </div>
        </div>

        <CardText className="mb-2 mt-md-3 mt-3 text-justify ">
          {data?.description}
        </CardText>
        {data?.hasImg && (
          <a
            href={`${API_URL}/tuso-api/screenshot/key/${data?.oid}`}
            target="_blank"
            rel="noreferrer"
          >
            Attachment
          </a>
        )}
        <hr />
        <div className={`${data?.isOpen ? "d-block" : "d-none"} text-end`}>
          {
            // data?.assignedTo === null && Object.keys(teamLeader)?.length > 0 ? (
            //   <Button
            //     className="add-button border-0 px-3 me-3"
            //     onClick={() => setAssignToModal(!assignToModal)}
            //   >
            //     Assign to
            //   </Button>
            // ) : null
          }

          <Button
            outline
            color="secondary"
            className="px-3 me-3"
            onClick={() => setCommentModal(!commentModal)}
          >
            <TbMessageCircle size={18} className="mb-1" />
            &nbsp;Message
          </Button>
          <Button
            outline
            color="danger"
            className="px-3"
            onClick={() => {
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
                    const ticketData = {
                      ...data,
                      isOpen: false,
                      dateResolved: new Date().toISOString(),
                      isResolved: true,
                    };
                    dispatch(closeTicketData(ticketData));
                  }
                });
            }}
          >
            <XCircle size={18} className="mb-1" />
            &nbsp;Close This Ticket
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default SingleTicketCard;

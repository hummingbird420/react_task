import React, { useEffect } from "react";
import { addMessageData } from "../../message/store";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import SingleTicketCard from "./SingleTicketCard";
import { getSingTicketData } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleUserData } from "../../user/store";
import ReplyCard from "./ReplyCard";
import CommentModal from "./CommentModal";
import AssignToModal from "./AssignToModal";
import { ArrowLeftCircle } from "react-feather";

function SingleTicketViewCard() {
  // ! states are declared here
  const [description, setDescription] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [commentModal, setCommentModal] = React.useState(false);
  const [assignToModal, setAssignToModal] = React.useState(false);

  // ! hooks are initialized here
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ! get data from redux store
  const logedInUser = useSelector((state) => state.login.data);
  const user = useSelector((state) => state.user.selectedUser);
  const messages = useSelector((state) => state.ticket.selectedTicket.messages);

  // ! handler functions are declared here
  const handleBack = () => {
    navigate(-1);
  };

  const handleMessageSend = () => {
    const messageCreateData = {
      messageDate: new Date().toISOString(),
      messages: description,
      sender: user.name,
      incidentID: id,
      isDeleted: false,
    };

    dispatch(addMessageData(messageCreateData));
    dispatch(getSingTicketData(id));
    setDescription("");
  };

  // ! useEffects are declared here
  useEffect(() => {
    dispatch(getSingTicketData(id));
    dispatch(getSingleUserData(logedInUser.oid));
  }, [dispatch, id, logedInUser.oid]);

  return (
    <>
      <Card>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <h4 className="text-capitalize font-fallback mb-0">ticket details</h4>
          <Button
            outline
            color="secondary"
            className="px-4 py-2 default-fz"
            onClick={handleBack}
          >
            <ArrowLeftCircle size={18} className="mb-1" />
            &nbsp;Back
          </Button>
        </CardHeader>
        <SingleTicketCard
          modal={modal}
          setModal={setModal}
          setCommentModal={setCommentModal}
          commentModal={commentModal}
          assignToModal={assignToModal}
          setAssignToModal={setAssignToModal}
        />
        <CommentModal
          open={commentModal}
          setOpen={setCommentModal}
          handleMessageSend={handleMessageSend}
          description={description}
          setDescription={setDescription}
        />
      </Card>
      {messages?.length > 0 && (
        <Card className="mt-2">
          <CardBody className="">
            <div>
              {messages &&
                messages.map((message) => (
                  <ReplyCard key={message.oid} message={message} />
                ))}
            </div>
          </CardBody>

          <AssignToModal open={assignToModal} setOpen={setAssignToModal} />
        </Card>
      )}
    </>
  );
}

export default SingleTicketViewCard;

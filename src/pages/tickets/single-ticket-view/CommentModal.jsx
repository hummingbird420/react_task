/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { Fragment } from "react";
import { Modal, ModalBody } from "reactstrap";
import WriteReplyBox from "./WriteReplyBox";

const ConfirmationModal = ({
  open,
  setOpen,
  setDescription,
  description,
  handleMessageSend,
}) => {
  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        className="modal-dialog-centered p-0"
        size="lg"
      >
        <ModalBody className="">
          <div>
            <WriteReplyBox
              open={open}
              setOpen={setOpen}
              setDescription={setDescription}
              description={description}
              handleMessageSend={handleMessageSend}
            />
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default ConfirmationModal;

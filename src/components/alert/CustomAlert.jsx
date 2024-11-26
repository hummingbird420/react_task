import React from "react";
import { CheckCircle, XCircle } from "react-feather";
import { Alert } from "reactstrap";

function CustomAlert({
  addSuccess,
  addError,
  updateSuccess,
  updateError,
  deleteSuccess,
  deleteError,
  dismissAlert,
}) {
  return (
    <>
      <Alert
        isOpen={!!addSuccess}
        color="success"
        className="font-fallback default-fz"
        toggle={dismissAlert}
      >
        <CheckCircle size={18} className="mb-1 me-1" /> Record saved
        successfully
      </Alert>
      <Alert
        isOpen={!!updateSuccess}
        color="success"
        className="font-fallback default-fz"
        toggle={dismissAlert}
      >
        <CheckCircle size={18} className="mb-1 me-1" /> Record updated
        successfully
      </Alert>
      <Alert
        isOpen={!!deleteSuccess}
        color="success"
        className="font-fallback default-fz"
        toggle={dismissAlert}
      >
        <CheckCircle size={18} className="mb-1 me-1" /> Record deleted
        successfully
      </Alert>
      <Alert
        isOpen={!!deleteError}
        color="danger"
        className="font-fallback default-fz"
        toggle={dismissAlert}
      >
        <XCircle size={18} className="mb-1 me-1" />
        {deleteError?.includes("405")
          ? "This record cannot be deleted. It is already in use."
          : deleteError?.includes("500")
          ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
          : ""}
      </Alert>
      <Alert
        isOpen={!!addError}
        color="danger"
        className="font-fallback default-fz"
        toggle={dismissAlert}
      >
        <XCircle size={18} className="mb-1 me-1" />
        {addError?.includes("409")
          ? "Duplicate data found"
          : addError?.includes("500")
          ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
          : ""}
      </Alert>
      <Alert
        isOpen={!!updateError}
        color="danger"
        className="font-fallback default-fz"
        toggle={dismissAlert}
      >
        <XCircle size={18} className="mb-1 me-1" />{" "}
        {updateError?.includes("409")
          ? "Duplicate data found"
          : updateError?.includes("500")
          ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
          : ""}
      </Alert>
    </>
  );
}

export default CustomAlert;

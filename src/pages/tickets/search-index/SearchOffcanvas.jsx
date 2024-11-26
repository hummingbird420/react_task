import React from "react";
import { Offcanvas } from "react-bootstrap";
import SearchForm from "./SearchForm";

function SearchOffcanvas({
  show,
  setShow,
  setSearchObj,
  setCurrentPage,
  setStatus,
  setTicketNo,
}) {
  const handleClose = () => {
    setShow(false);
  };
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      className="w-75"
      style={{ zIndex: "999999" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Search Fields</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <SearchForm
          setSearchObj={setSearchObj}
          setCurrentPage={setCurrentPage}
          setStatus={setStatus}
          setTicketNo={setTicketNo}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default SearchOffcanvas;

/* eslint-disable semi */
// ** React Imports
// import { useContext } from "react";
import { useContext, useEffect, useState } from "react";
import {
  clearSuccessAndError,
  clearUploadAttachment,
  clientTicketData,
  getExpertTeamLeaderTicketData,
  getExpertTicketData,
  getTicketById,
  getTicketData,
  uploadScreenShot,
} from "./store";
import { useSelector, useDispatch } from "react-redux";
import { getSingleUserData } from "../user/store";
import DataTableWithButtons from "./DataTableWithButton";
import Layout from "../../components/layout/Layout";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import AttachmentContext from "../../context/AttachMent";

function CountryInformation() {
  // ! states are declared here
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState(0);
  const [ticketNo, setTicketNo] = useState("");
  // ! hooks are initialized here
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { attacehMent, setAttacehMent } = useContext(AttachmentContext);

  // ! calculate start poin fron where ticket search start
  const start = currentPage * limit;

  // ! get data from the redux store
  const ticketData = useSelector((state) => state.ticket.data.list);
  const loginUser = useSelector((state) => state.login.data);
  const teamLeader = useSelector((state) => state.user.teamLeader);
  const newCreatedTicket = useSelector(
    (state) => state.ticket.newCreatedTicket
  );
  const {
    deleteTicketError,
    updateTicketError,
    addTicketError,
    deleteTicketSuccess,
    updateTicketSuccess,
    addTicketSuccess,
    uploadScreenShotSuccess,
  } = useSelector((state) => state.ticket);

  // ! useEffect hooks are declared here
  useEffect(() => {
    if (ticketNo) {
      dispatch(
        getTicketById({
          key: ticketNo,
          start,
          limit,
          status,
          UserAccountID: loginUser?.oid,
        })
      );
    } else if (loginUser?.role?.toLowerCase() === "client") {
      dispatch(clientTicketData({ key: loginUser?.oid, limit, start, status }));
    } else if (loginUser?.role?.toLowerCase() === "expert") {
      dispatch(
        getExpertTicketData({ key: loginUser?.oid, limit, start, status })
      );
    } else if (
      loginUser?.role?.toLowerCase() === "expert" &&
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
      loginUser?.role?.toLowerCase() === "administrator" ||
      loginUser?.role?.toLowerCase() === "supervisor" ||
      loginUser?.role?.toLowerCase() === "agent"
    ) {
      dispatch(getTicketData({ limit, start }));
    }
    dispatch(getSingleUserData(loginUser?.oid));
  }, [
    dispatch,
    loginUser.oid,
    loginUser.role,
    teamLeader,
    start,
    limit,
    status,
    ticketNo,
  ]);

  // upload attachement
  useEffect(() => {
    if (
      (addTicketSuccess && attacehMent) ||
      (updateTicketSuccess && attacehMent)
    ) {
      const formData = new FormData();
      formData.append("Ffile", attacehMent);

      const data = {
        id: newCreatedTicket?.oid,
        img: formData,
      };
      dispatch(uploadScreenShot(data));
    }
    console.log("attacment", attacehMent);
    dispatch(clearSuccessAndError());
  }, [
    dispatch,
    newCreatedTicket?.oid,
    addTicketSuccess,
    attacehMent,
    updateTicketSuccess,
  ]);

  useEffect(() => {
    if (addTicketSuccess) {
      Swal.fire({
        icon: "success",
        title: `Ticket created successfully`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        if (loginUser?.role?.toLowerCase() === "client") {
          dispatch(
            clientTicketData({ key: loginUser?.oid, limit, start, status })
          );
        } else if (loginUser?.role?.toLowerCase() === "expert") {
          dispatch(
            getExpertTicketData({ key: loginUser?.oid, limit, start, status })
          );
        } else if (
          loginUser?.role?.toLowerCase() === "expert" &&
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
          loginUser?.role?.toLowerCase() === "adminis" ||
          loginUser?.role?.toLowerCase() === "supervisor" ||
          loginUser?.role?.toLowerCase() === "agent"
        ) {
          dispatch(getTicketData({ limit, start, status }));
        }
      });
    }
    if (updateTicketSuccess) {
      Swal.fire({
        icon: "success",
        title: "Ticket Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          title: "default-fz",
        },
      });
      setTimeout(() => {
        dispatch(clearSuccessAndError());
        if (loginUser?.role?.toLowerCase() === "client") {
          dispatch(
            clientTicketData({ key: loginUser?.oid, limit, start, status })
          );
        } else if (loginUser?.role?.toLowerCase() === "expert") {
          dispatch(
            getExpertTicketData({ key: loginUser?.oid, limit, start, status })
          );
        } else if (
          loginUser?.role?.toLowerCase() === "expert" &&
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
          loginUser?.role?.toLowerCase() === "admin" ||
          loginUser?.role?.toLowerCase() === "supervisor" ||
          loginUser?.role?.toLowerCase() === "agent"
        ) {
          dispatch(getTicketData({ limit, start, status }));
        }
      }, 1500);
    }
    if (uploadScreenShotSuccess) {
      Swal.fire({
        icon: "success",
        title: "Screen shot uploaded successfully",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        dispatch(
          clientTicketData({ key: loginUser?.oid, limit, start, status })
        );
        dispatch(clearUploadAttachment());
        setAttacehMent(null);
      });
      setTimeout(() => {
        dispatch(clearSuccessAndError());
      }, 1500);
    }
    if (deleteTicketSuccess) {
      Swal.fire({
        icon: "success",
        title: "Ticket Deleted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        dispatch(clearSuccessAndError());
      }, 1500);
    }
    if (addTicketError) {
      Swal.fire({
        icon: "error",
        title: "Ticket Creation Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        dispatch(clearSuccessAndError());
      }, 1500);
    }
    if (updateTicketError) {
      Swal.fire({
        icon: "error",
        title: "Ticket Update Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        dispatch(clearSuccessAndError());
      }, 1500);
    }
    if (deleteTicketError) {
      Swal.fire({
        icon: "error",
        title: "Ticket Delete Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        dispatch(clearSuccessAndError());
      }, 1500);
    }
  }, [
    addTicketError,
    addTicketSuccess,
    deleteTicketError,
    deleteTicketSuccess,
    updateTicketError,
    updateTicketSuccess,
    dispatch,
    navigate,
    loginUser.role,
    loginUser.oid,
    teamLeader,
    start,
    limit,
    status,
    ticketNo,
    uploadScreenShotSuccess,
    setAttacehMent,
  ]);

  useEffect(() => {
    setCurrentPage(0);
  }, []);
  return (
    <Layout>
      <DataTableWithButtons
        data={ticketData}
        limit={limit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setLimit={setLimit}
        status={status}
        setStatus={setStatus}
        ticketNo={ticketNo}
        setTicketNo={setTicketNo}
      />
    </Layout>
  );
}

export default CountryInformation;

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../../../components/layout/Layout";
import { getMembersByTeamId } from "../../../team/store";
import { getSingTicketData } from "../../store";
import CallCenterTicketEditForm from "./Expert";

function CallCenterAgentForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const teamLeader = useSelector((state) => state.user.teamLeader);

  useEffect(() => {
    dispatch(getSingTicketData(id));
    dispatch(getMembersByTeamId(teamLeader?.teamID));
  }, [dispatch, id, teamLeader]);
  return (
    <Layout>
      <CallCenterTicketEditForm />
    </Layout>
  );
}

export default CallCenterAgentForm;

import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../../../components/layout/Layout";
import { getSingTicketData } from "../../store";
import CallCenterTicketEditForm from "./Manager";

function CallCenterAgentForm() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingTicketData(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <CallCenterTicketEditForm />
    </Layout>
  );
}

export default CallCenterAgentForm;

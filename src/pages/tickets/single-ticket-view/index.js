import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/layout/Layout";
import { getTeamLeaderData } from "../../user/store";
import SingleTicketViewCard from "./SingleTicketViewCard";

function TicketSigleView() {
  const loggedInUser = useSelector((state) => state.login.data);
  

  // ** intialize dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeamLeaderData(loggedInUser.oid));
  }, [dispatch, loggedInUser.oid]);

  return (
    <Layout>
      <SingleTicketViewCard />
    </Layout>
  );
}

export default TicketSigleView;

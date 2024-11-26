import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../../../components/layout/Layout";
import { getSystemPermissionByUserId } from "../../../system-permission/store";
import ClientTicketCreateForm from "./ClientTicketForm";

function TicketCreationForClient() {
  // ! hooks are initialized here
  const dispatch = useDispatch();

  // ! get data from redux store
  const loggedInuser = useSelector((state) => state.login.data);

  // ! useEffect hooks are initialized here
  useEffect(() => {
    dispatch(getSystemPermissionByUserId(loggedInuser?.oid));
  }, [dispatch, loggedInuser.oid]);

  return (
    <Layout>
      <ClientTicketCreateForm />
    </Layout>
  );
}

export default TicketCreationForClient;

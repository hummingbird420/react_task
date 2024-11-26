import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/layout/Layout";
import { getRecoveryListData } from "../login/store";
import AdminRecovery from "./AdminRecovery";

function RecoveryAdmin() {
  // ! hooks are declared here
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecoveryListData());
  }, [dispatch]);

  return (
    <Layout>
      <div>
        <AdminRecovery />
      </div>
    </Layout>
  );
}

export default RecoveryAdmin;

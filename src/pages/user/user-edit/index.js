import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../components/layout/Layout";
import UserEditForm from "./UserEditForm";
import { getSingleUserData } from "../store";
import { useDispatch, useSelector } from "react-redux";

function UserEdit() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const usersData = useSelector((state) => state.user.selectedUser);

  useEffect(() => {
    dispatch(getSingleUserData(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <UserEditForm selectedUser={usersData} />
    </Layout>
  );
}

export default UserEdit;

import React from "react";
import Layout from "../../../components/layout/Layout";
import SingleViewCard from "./SingleViewCard";
import { clearUploadSuccessAndError, getSingleUserData } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function SingleUserView() {
  // ! hooks are initialized here
  const dispatch = useDispatch();
  const { id } = useParams();

  // ! get data from redux store
  const { uploadImageSuccess } = useSelector((state) => state.user);

  if (uploadImageSuccess) {
    window.location.reload(false);
    dispatch(clearUploadSuccessAndError());
  }

  useEffect(() => {
    dispatch(getSingleUserData(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <SingleViewCard />
    </Layout>
  );
}

export default SingleUserView;

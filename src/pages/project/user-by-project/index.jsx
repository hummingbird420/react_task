import React, { useEffect } from "react";
import { ArrowLeftCircle } from "react-feather";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Row } from "reactstrap";
import Layout from "../../../components/layout/Layout";
import { getSingleProjectData, getUserByProject } from "../store";
import UserByProjectTable from "./UserByProjectTable";

function UserBySystem() {
  // ! hooks are initialize here
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserByProject(id));
    dispatch(getSingleProjectData(id));
  }, [dispatch, id]);
  return (
    <Layout>
      <Row>
        <Col sm="12">
          <div className="display-6 font-fallback">System User</div>
          <hr className="border border-2 border-dark my-4" />
          <Card className="px-4 py-4 border-0 shadow mb-5">
            <div className="mb-3 d-flex justify-content-end align-items-center">
              <Button
                outline
                color="secondary"
                className="font-fallback default-fz px-3"
                onClick={() => navigate(-1)}
              >
                <ArrowLeftCircle size={20} className="me-1 mb-1" /> Back
              </Button>
            </div>
            <UserByProjectTable />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default UserBySystem;

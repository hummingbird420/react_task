import React, { useEffect } from "react";
import { ArrowLeftCircle } from "react-feather";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Row } from "reactstrap";
import Layout from "../../../components/layout/Layout";
import { getRoleByModule } from "../../role/store";
import { getSingleModuleData } from "../store";
import RuleByModuleTable from "./RuleByModuleTable";

function RuleByModule() {
  // ! hooks are initialize here
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRoleByModule(id));
    dispatch(getSingleModuleData(id));
  }, [id, dispatch]);

  return (
    <Layout>
      <Row>
        <Col sm="12">
          <div className="display-6 font-fallback">Role Module</div>
          <hr className="border border-2 border-dark my-4" />
          <Card className="px-4 py-4 border-0 shadow">
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
            <RuleByModuleTable />
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default RuleByModule;

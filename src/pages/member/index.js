/* eslint-disable semi */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button, Alert } from "reactstrap";
import Layout from "../../components/layout/Layout";
import MemberTable from "./MemberTable";
import {
  ArrowLeftCircle,
  CheckCircle,
  PlusCircle,
  XCircle,
} from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import { getExpertUserData } from "../user/store";
import { getMembersByTeamId, getSingleTeamData } from "../team/store";
import AddMemberModal from "./AddMemberModal";
import { clearSuccessAndError } from "./store";
import CustomAlert from "../../components/alert/CustomAlert";

function MemberInformation() {
  // ! state are declared here
  const [open, setOpen] = useState(false);

  //! hooks are declared here
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // ! get data from the redux store
  const {
    deleteMemberError,
    deleteMemberSuccess,
    addMemberError,
    addMemberSuccess,
  } = useSelector((state) => state.member);

  // ! handle useEffect here
  useEffect(() => {
    dispatch(getSingleTeamData(id));
    dispatch(getMembersByTeamId(id));
    // dispatch(getUserData());
    dispatch(getExpertUserData());
    dispatch(clearSuccessAndError());
  }, [dispatch, id]);

  // ! handler functions are declared here
  const dismissAlert = () => {
    dispatch(clearSuccessAndError());
  };

  return (
    <Layout>
      <Row>
        <Col sm="12">
          <div className="display-6 font-fallback">Member</div>
          <hr className="border border-2 border-dark my-4" />

          <CustomAlert
            addSuccess={addMemberSuccess}
            addError={addMemberError}
            updateSuccess={false}
            updateError={null}
            deleteError={deleteMemberError}
            deleteSuccess={deleteMemberSuccess}
            dismissAlert={dismissAlert}
          />

          <Card className="px-4 py-4 border-0 shadow overflow-auto">
            <div className="mb-3 d-flex justify-content-between align-items-center responsive_table_class">
              <Button
                className="add-button border-0 font-fallback default-fz"
                onClick={() => setOpen(!open)}
              >
                <PlusCircle size={20} className=" mb-1" />
                &nbsp;Add Member
              </Button>
              <Button
                outline
                color="secondary"
                className="font-fallback default-fz px-4"
                onClick={() => navigate(-1)}
              >
                <ArrowLeftCircle size={20} className=" mb-1" />
                &nbsp;Back
              </Button>
            </div>
            <MemberTable />
          </Card>
        </Col>
        <AddMemberModal open={open} setOpen={setOpen} />
      </Row>
    </Layout>
  );
}

export default MemberInformation;

import React from "react";
import { getTeamData } from "../../team/store";
import { getUserData } from "../../user/store";
import { addMemberData } from "../store";
import toast, { Toaster } from "react-hot-toast";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ModulePermission() {
  const [permission, setPermission] = React.useState([]);
  const [teamID, setTeamID] = React.useState(null);

  const makeToast = (message) => {
    toast.error(message, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };
  // ** hooks
  const dispatch = useDispatch();

  // ** get data from store
  const teams = useSelector((state) => state.team.data);
  const users = useSelector((state) => state.user.data);

  // ** handler
  const handleCheckBoxChange = (e) => {
    if (e.target.checked) {
      setPermission((pre) => [
        ...pre,
        { teamID, isTeamLead: false, [e.target.name]: e.target.value },
      ]);
    } else {
      setPermission(
        permission.filter((item) => item.userAccountID !== e.target.value)
      );
    }
  };

  const handleLeadChange = (e) => {
    const newPermission = permission.map((item) => {
      return { ...item, isTeamLead: false };
    });

    setPermission(
      newPermission.map((item) => {
        if (item.userAccountID === e.target.value) {
          return { ...item, isTeamLead: true };
        }
        return item;
      })
    );

    console.log("permission", permission);
  };

  const handleRoleChange = (e) => {
    if (permission.length > 0) {
      setPermission(
        permission.map((item) => {
          return { ...item, teamID: e.target.value };
        })
      );
    } else {
      setTeamID(e.target.value);
    }
  };

  const handleModuleSave = () => {
    if (permission.every((item) => item.isTeamLead === false)) {
      return makeToast("Please select a team lead");
    }
    dispatch(addMemberData(permission));
  };

  // ** dispatch action to get data
  useEffect(() => {
    dispatch(getTeamData());
    dispatch(getUserData());
  }, [dispatch]);

  console.log("permission", permission);

  return (
    <Card>
      <CardHeader>
        <h3>Member Permission</h3>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="teamID">Team</Label>
              <Input
                type="select"
                name="teamID"
                id="teamID"
                onChange={handleRoleChange}
              >
                <option>Select Team</option>
                {teams &&
                  teams.map((team) => (
                    <option key={team.oid} value={team.oid}>
                      {team.title}
                    </option>
                  ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          {users &&
            users.map((user) => (
              <>
                <Col sm={6}>
                  <FormGroup>
                    <Input
                      type="checkbox"
                      id={user.oid}
                      name="userAccountID"
                      value={user.oid}
                      className="me-3"
                      onChange={handleCheckBoxChange}
                    />
                    <Label for={user.oid}>{user.name}</Label>
                  </FormGroup>
                </Col>
                <Col sm={6}>
                  <FormGroup>
                    <Input
                      type="radio"
                      id={user.name}
                      name="isTeamLead"
                      value={user.oid}
                      className="me-3"
                      onChange={handleLeadChange}
                    />
                    <Label for={user.name}>isTeamLead</Label>
                  </FormGroup>
                </Col>
              </>
            ))}
        </Row>
        <Row>
          <Col>
            <Button
              outline
              className="add-button border-0"
              onClick={handleModuleSave}
            >
              Save
            </Button>
          </Col>
        </Row>
      </CardBody>
      <Toaster position="top-center" reverseOrder={false} />
    </Card>
  );
}

export default ModulePermission;

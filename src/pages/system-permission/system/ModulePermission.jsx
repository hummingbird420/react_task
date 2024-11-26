import React from "react";
import { getUserData } from "../../user/store";
import { getProjectData } from "../../project/store";
import { addSystemPermissionData } from "../store";
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
  const [userAccountID, setUserAccountID] = React.useState(null);

  // ** hooks
  const dispatch = useDispatch();

  // ** get data from store
  const users = useSelector((state) => state.user.data);
  const systems = useSelector((state) => state.project.data);

  // ** handler
  const handleCheckBoxChange = (e) => {
    if (e.target.checked) {
      setPermission((pre) => [
        ...pre,
        { userAccountID, [e.target.name]: e.target.value },
      ]);
    } else {
      setPermission(
        permission.filter((item) => item.moduleID !== e.target.value)
      );
    }
  };

  const handleRoleChange = (e) => {
    setUserAccountID(e.target.value);
  };

  const handleModuleSave = () => {
    dispatch(addSystemPermissionData(permission));
  };

  // ** dispatch action to get data
  useEffect(() => {
    dispatch(getUserData());
    dispatch(getProjectData());
  }, [dispatch]);

  console.log("permission", permission);

  return (
    <Card>
      <CardHeader>
        <h3>System Permission</h3>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="userID">User</Label>
              <Input
                type="select"
                name="userID"
                id="userID"
                onChange={handleRoleChange}
              >
                <option>Select user</option>
                {users &&
                  users.map((user) => (
                    <option key={user.oid} value={user.oid}>
                      {user.name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          {systems &&
            systems.map((system) => (
              <Col md={12}>
                <FormGroup>
                  <Input
                    type="checkbox"
                    id={module.oid}
                    name="systemID"
                    value={system.oid}
                    className="me-3"
                    onChange={handleCheckBoxChange}
                  />
                  <Label for={system.oid}>{system.title}</Label>
                </FormGroup>
              </Col>
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
    </Card>
  );
}

export default ModulePermission;

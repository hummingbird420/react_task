import React from "react";
import { getRoleData } from "../../role/store";
import { getModuleData } from "../store";
import { addModulePermission } from "../store";
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
  const [roleID, setRoleID] = React.useState(null);

  // ** hooks
  const dispatch = useDispatch();

  // ** get data from store
  const roles = useSelector((state) => state.role.data);
  const modules = useSelector((state) => state.module.data);

  // ** handler
  const handleCheckBoxChange = (e) => {
    if (e.target.checked) {
      setPermission((pre) => [
        ...pre,
        { roleID, [e.target.name]: e.target.value },
      ]);
    } else {
      setPermission(
        permission.filter((item) => item.moduleID !== e.target.value)
      );
    }
  };

  const handleRoleChange = (e) => {
    setRoleID(e.target.value);
  };

  const handleModuleSave = () => {
    dispatch(addModulePermission(permission));
    setPermission([]);
  };

  // ** dispatch action to get data
  useEffect(() => {
    dispatch(getRoleData());
    dispatch(getModuleData());
  }, [dispatch]);

  console.log("permission", permission);

  return (
    <Card>
      <CardHeader>
        <h3>Module Permission</h3>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="userID">Role</Label>
              <Input
                type="select"
                name="userID"
                id="userID"
                onChange={handleRoleChange}
              >
                <option>Select Role</option>
                {roles &&
                  roles.map((role) => (
                    <option key={role.oid} value={role.oid}>
                      {role.roleName}
                    </option>
                  ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          {modules &&
            modules.map((module) => (
              <Col md={12}>
                <FormGroup>
                  <Input
                    type="checkbox"
                    id={module.oid}
                    name="moduleID"
                    value={module.oid}
                    className="me-3"
                    onChange={handleCheckBoxChange}
                  />
                  <Label for={module.oid}>{module.moduleName}</Label>
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

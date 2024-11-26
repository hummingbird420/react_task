import React from "react";
import { ArrowLeftCircle, CheckCircle } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import { addModulePermission } from "../../module/store";

function ModulePermissionModal({ open, setOpen }) {
  // ! states are declared here
  const [moduleID, setModuleID] = React.useState("");
  const [isEmpty, setIsEmpty] = React.useState(false);

  // ! hooks are declared here
  const dispatch = useDispatch();

  // ! get data from the redux store
  const selectedRole = useSelector((state) => state.role.selectedRole);
  const modules = useSelector((state) => state.module.data);

  // ! handler functions are declared here
  const handleSubmit = (e) => {
    e.preventDefault();

    if (moduleID) {
      const data = {
        roleID: selectedRole.oid,
        moduleID,
        isDeleted: false,
      };
      console.log("data", data);

      dispatch(addModulePermission(data));
      setIsEmpty(false);
      setModuleID("");
      setOpen(false);
    } else {
      setIsEmpty(true);
    }
  };
  const handleReset = () => {
    setModuleID("");
    setOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        size="lg"
        className="modal-dialog-centered"
      >
        <ModalBody className="pb-4">
          <p className="mb-1 font-fallback display-6">Create Permission</p>
          <hr className="border border-2 border-dark my-4" />
          <Card className="">
            <CardBody>
              <Row>
                <Col md={5} xs={6} className="font-fallback font-size-20">
                  Role Name
                </Col>
                <Col md="7" xs={6} className="font-fallback font-size-20">
                  {selectedRole && selectedRole.roleName}
                </Col>
              </Row>
              <div className="mt-3">
                <FormGroup>
                  <Label
                    for="moduleID"
                    className="font-fallback default-fz mb-0 ms-1"
                  >
                    Module
                  </Label>
                  <Input
                    type="select"
                    value={moduleID}
                    name="moduleID"
                    className={`${isEmpty ? "is-invalid" : ""} `}
                    id="moduleID"
                    onChange={(e) => setModuleID(e.target.value)}
                  >
                    <option>Select Module</option>
                    {modules &&
                      modules.map((item) => (
                        <option key={item.oid} value={item.oid}>
                          {item.moduleName}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
              </div>
              <div className="d-flex justify-content-start">
                <Button
                  className=" add-button border-0 px-4"
                  type="submit"
                  onClick={handleSubmit}
                >
                  <CheckCircle size={18} className="me-2" />
                  Save
                </Button>
                &nbsp;
                <Button
                  outline
                  color="secondary"
                  type="reset"
                  className="font-fallback px-4"
                  onClick={handleReset}
                >
                  <ArrowLeftCircle size={18} className="me-2" />
                  Back
                </Button>
              </div>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModulePermissionModal;

/* eslint-disable comma-dangle */
/* eslint-disable semi */
// ** React Imports
import { Fragment, useState } from "react";
// import { addModuleData } from "./store";
import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  Form,
  Modal,
  Label,
  Input,
  Button,
  CardBody,
  ModalBody,
} from "reactstrap";
import { ArrowLeftCircle, CheckCircle } from "react-feather";
import { addMemberData } from "./store";

// ** Third Party Components

const AddMemberModal = ({ open, setOpen }) => {
  // ! states are declared here
  const [userID, setUserID] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [isTeamLead, setIsTeamLead] = useState(false);

  // ! hooks are declared here
  const dispatch = useDispatch();

  // ! get data from the redux store
  const selectedTeam = useSelector((state) => state.team.selectedTeam);
  const users = useSelector((state) => state.user.expertUser);

  const onSubmit = (e) => {
    e.preventDefault();

    if (userID) {
      const newMember = {
        userAccountID: userID,
        isTeamLead: isTeamLead,
        teamID: selectedTeam.oid,
        isDeleted: false,
      };
      console.log("newMember", newMember);
      dispatch(addMemberData(newMember));
      setIsEmpty(false);
      setIsTeamLead(false);
      setOpen(false);
    } else {
      setIsEmpty(true);
    }
  };

  const handleReset = () => {
    setUserID("");
    setIsEmpty(false);
    setOpen(false);
  };

  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        className="modal-dialog-centered"
        size="lg"
      >
        <ModalBody className="">
          <h3 className="font-fallback display-6">Add Member</h3>
          <hr className="border border-2 border-dark my-4" />
          <Card className="">
            <CardBody>
              <Form onSubmit={onSubmit}>
                <div className="d-flex justify-content-between mb-3">
                  <div className="w-50 font-fallback font-size-20">
                    Team Name
                  </div>
                  <div className="w-50 font-fallback font-size-20">
                    {selectedTeam?.title}
                  </div>
                </div>
                <div className="mb-1">
                  <Label
                    for="userID"
                    className="form-label font-fallback default-fz"
                  >
                    Member
                  </Label>
                  <Input
                    type="select"
                    name="userID"
                    maxLength={90}
                    id="userID"
                    className={isEmpty ? "is-invalid" : ""}
                    onChange={(e) => setUserID(e.target.value)}
                  >
                    <option>Select member</option>
                    {users &&
                      users.map((user) => (
                        <option key={user.oid} value={user.oid}>
                          {user.name}
                        </option>
                      ))}
                  </Input>
                  <div className="mt-2">
                    <Input
                      type="checkbox"
                      value="teamLead"
                      id="teamLead"
                      maxLength={90}
                      className=""
                      onChange={(e) => setIsTeamLead(e.target.checked)}
                    />
                    &nbsp;{" "}
                    <Label
                      for="teamLead"
                      style={{ cursor: "pointer" }}
                      className="mb-0"
                    >
                      Team Leader
                    </Label>
                  </div>
                </div>
                <div className="d-flex justify-content-start mt-4">
                  <Button className="add-button border-0 px-4" type="submit">
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
              </Form>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default AddMemberModal;

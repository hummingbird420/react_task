import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import { getSingleRoleData } from "../role/store";
import TeamTableRow from "./TeamTableRow";
import EditTeamModal from "./EditModal";
import { deleteTeam, getSingleTeamData } from "./store";
import { useNavigate } from "react-router-dom";

function TeamTable() {
  // ! state are declared here
  const [editModal, setEditModal] = useState(false);

  // ! hooks are declared here
  const dispatch = useDispatch();
  const navigate = useNavigate();

  ///! get data from redux store
  const teamData = useSelector((state) => state.team.data);
  // ! handler functions are declared here
  const editFunction = (id) => {
    setEditModal(true);
    dispatch(getSingleTeamData(id));
  };

  const deleteFunction = (id) => {
    dispatch(deleteTeam(id));
  };

  const memberFunction = (id) => {
    navigate(`/config/a/team/${id}/member`);
  };

  return (
    <div>
      <Table className="responsive_table_class">
        <tr className="font-fallback border-bottom border-dark border-2 fw-bolder table__heading-text">
          <th>Team Name</th>
          <th></th>
        </tr>
        {teamData &&
          teamData.map((item) => (
            <TeamTableRow
              key={item.oid}
              item={item}
              deleteFunction={deleteFunction}
              editFunction={editFunction}
              memberFunction={memberFunction}
            />
          ))}
      </Table>
      <EditTeamModal open={editModal} setOpen={setEditModal} />
    </div>
  );
}

export default TeamTable;

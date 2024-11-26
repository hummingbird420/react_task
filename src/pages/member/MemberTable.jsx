import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";

import MemberTableRow from "./MemberTableRow";
import { deleteMember } from "./store";

function MemberTable() {
  // ! states are declared here

  // ! hooks are initialize here
  const dispatch = useDispatch();
  // ! get data from the redux store
  const selectedTeam = useSelector((state) => state.team.selectedTeam);
  const members = useSelector((state) => state.team.selectedTeamMembers);

  //! initialize handler functions here
  const editFunction = () => {
    console.log("edit function called");
  };

  const deleteFunction = (id) => {
    const data = {
      teamID: selectedTeam.oid,
      id: id,
    };
    dispatch(deleteMember(data));
  };

  return (
    <div>
      <Table className="responsive_table_class">
        <tr className="font-fallback border-bottom border-dark border-2 fw-bolder table__heading-text">
          <th className="">Member Name</th>
          <th colSpan={2} className="text-center text-md-left">
            {selectedTeam?.title}
          </th>
        </tr>
        {members &&
          members.map((item) => (
            <MemberTableRow
              key={item.oid}
              item={item}
              team={selectedTeam}
              deleteFunction={deleteFunction}
              editFunction={editFunction}
            />
          ))}
      </Table>
    </div>
  );
}

export default MemberTable;

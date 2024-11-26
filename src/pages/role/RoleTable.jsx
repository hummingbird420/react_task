import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import RoleTableRow from "./RoleTableRow";

function RoleTable() {
  // ! hooks are declared here

  const navigate = useNavigate();

  ///! get data from redux store
  const roles = useSelector((state) => state.role.data);

  // ! handler functions are declared here

  const moduleFunction = (id) => {
    navigate(`/config/a/role/${id}/module`);
  };

  return (
    <div>
      <Table className="" responsive={true}>
        <tr className="font-fallback border-bottom border-dark border-2 fw-bolder table__heading-text">
          <th className="w-50">Role Name</th>
          <th></th>
        </tr>
        {roles &&
          roles.map((item) => (
            <RoleTableRow
              key={item.oid}
              item={item}
              moduleFunction={moduleFunction}
            />
          ))}
      </Table>
    </div>
  );
}

export default RoleTable;

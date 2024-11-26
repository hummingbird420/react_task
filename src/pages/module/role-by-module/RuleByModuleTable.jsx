import React from "react";
import { useSelector } from "react-redux";
import { Table } from "reactstrap";
import RuleByModuleTableRow from "./RuleByModuleTableRow";

function RuleByModuleTable() {
  // ! get data from the redux store
  const selectedModule = useSelector((state) => state.module.selectedModule);
  const roles = useSelector((state) => state.role.roleByModule);
  return (
    <div>
      <Table className="" responsive={true}>
        <tr className="font-fallback border-bottom border-dark border-2 fw-bolder table__heading-text">
          <th>Module Name</th>
          <th>Role Name</th>
        </tr>

        {roles &&
          roles.map((role) => (
            <RuleByModuleTableRow
              key={role?.oid}
              item={role}
              module={selectedModule}
            />
          ))}
      </Table>
    </div>
  );
}

export default RuleByModuleTable;

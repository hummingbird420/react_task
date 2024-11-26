import React from "react";
import { useSelector } from "react-redux";
import { Table } from "reactstrap";
import UserByProjectTableRow from "./UserByProjectTableRow";

function UserByProjectTable() {
  // ! get data from the redux store
  const users = useSelector((state) => state.project.userBySystem);
  const selectedProject = useSelector((state) => state.project.selectedProject);
  return (
    <div>
      <Table className="responsive_table_class" responsive={true}>
        <tr className="font-fallback border-bottom border-dark border-2 fw-bolder table__heading-text">
          <th>System</th>
          <th>User</th>
        </tr>
        {users &&
          users.map((user) => (
            <UserByProjectTableRow
              key={user?.oid}
              item={user}
              project={selectedProject}
            />
          ))}
      </Table>
    </div>
  );
}

export default UserByProjectTable;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import { deleteSystemPermission } from "../../system-permission/store";
import ProjectByUserTableRow from "./ProjectByUserTableRow";

function ProjectByUserTable() {
  // ! states are declared here

  // ! hooks are declared here
  const dispatch = useDispatch();

  // ! get data from redux store
  const projectByRole = useSelector((state) => state.project.systemByRole);
  const selectedUser = useSelector((state) => state.user.selectedUser);

  // ! handler functions are declared here
  const deleteFunction = (id) => {
    const data = {
      userAccountID: selectedUser.oid,
      systemID: id,
    };
    dispatch(deleteSystemPermission(data));
  };

  return (
    <div>
      <Table className="" responsive={true}>
        <tr className="font-size-22 font-fallback border-bottom border-dark border-2 fw-bolder">
          <th>Name</th>
          <th>System Name</th>
        </tr>
        {projectByRole &&
          projectByRole.map((item) => (
            <ProjectByUserTableRow
              key={item.oid}
              item={item}
              user={selectedUser}
              deleteFunction={deleteFunction}
              //   editFunction={editFunction}
            />
          ))}
        {/* <ProjectByUserTableRow />
        <ProjectByUserTableRow />
        <ProjectByUserTableRow /> */}
      </Table>
    </div>
  );
}

export default ProjectByUserTable;

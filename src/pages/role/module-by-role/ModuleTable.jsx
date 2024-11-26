import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import { deleteModulePermission } from "../../module/store";
import ModuleTableRow from "./ModuleTableRow";

function ModuleTable() {
  // ! hooks are initialize here
  const dispatch = useDispatch();

  // ! get data from the redux store
  const ModulePermission = useSelector((state) => state.module.moduleByRole);
  const selectedRole = useSelector((state) => state.role.selectedRole);

  //! initialize handler functions here
  const deleteFunction = (id) => {
    const data = {
      roleID: selectedRole.oid,
      permissionID: id,
    };
    dispatch(deleteModulePermission(data));
  };

  return (
    <div>
      <Table className="responsive_table_class">
        <tr className="font-fallback border-bottom border-dark border-2 fw-bolder table__heading-text">
          <th>Role Name</th>
          <th>Module Name</th>
        </tr>
        {ModulePermission &&
          ModulePermission.map((item) => (
            <ModuleTableRow
              key={item.oid}
              item={item}
              role={selectedRole}
              deleteFunction={deleteFunction}
            />
          ))}
      </Table>
    </div>
  );
}

export default ModuleTable;

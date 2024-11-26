import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Table } from "reactstrap";
import ModuleTableRow from "./ModuleTableRow";
import EditModuleModal from "./EditModal";
import { useNavigate } from "react-router-dom";

function ModuleTable() {
  // ! state are declared here
  const [editModal, setEditModal] = useState(false);

  // ! hooks are initialize here
  const navigate = useNavigate();

  ///! get data from redux store
  const modules = useSelector((state) => state.module.data);

  // ! handler functions are declared here
  const handleRoleByModule = (id) => {
    navigate(`/config/a/module/${id}/role`);
  };

  return (
    <div>
      <Table className="" responsive={true}>
        <tr className="font-fallback border-bottom border-dark border-2 fw-bolder table__heading-text">
          <th className="w-50">Module Name</th>
        </tr>
        {modules &&
          modules.map((item) => (
            <ModuleTableRow
              key={item.oid}
              item={item}
              handleRoleByModule={handleRoleByModule}
            />
          ))}
      </Table>
      <EditModuleModal open={editModal} setOpen={setEditModal} />
    </div>
  );
}

export default ModuleTable;

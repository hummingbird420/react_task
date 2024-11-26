import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import ProjectTableRow from "./ProjectTableRow";
import { deleteProject, getSingleProjectData } from "./store";
import EditModal from "./EditModal";
import { useNavigate } from "react-router-dom";

function ProjectTable() {
  // ! state are declared here
  const [editModal, setEditModal] = useState(false);

  // ! hooks are declared here
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //! get data from redux store
  const projects = useSelector((state) => state.project.data);

  // ! handler functions are declared here
  const editFunction = (id) => {
    dispatch(getSingleProjectData(id));
    setEditModal(true);
  };
  const deleteFunction = (id) => {
    dispatch(deleteProject(id));
  };

  const handleUsers = (id) => {
    console.log("Users function call with id:", id);
    navigate(`/config/a/project/${id}/user`);
  };
  return (
    <div>
      {" "}
      <Table className="responsive_table_class">
        <tr className="font-fallback border-bottom border-dark border-2 fw-bolder table__heading-text">
          <th>System Name</th>
          {/* <th>District Name</th> */}
        </tr>
        {projects &&
          projects.map((item) => (
            <ProjectTableRow
              key={item.oid}
              item={item}
              deleteFunction={deleteFunction}
              editFunction={editFunction}
              handleUsers={handleUsers}
            />
          ))}
      </Table>
      <EditModal open={editModal} setOpen={setEditModal} />
    </div>
  );
}

export default ProjectTable;

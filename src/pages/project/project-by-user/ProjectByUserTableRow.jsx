import React from "react";
import { Trash2 } from "react-feather";
import { Button } from "reactstrap";

function ProjectByUserTableRow({ user, item, deleteFunction }) {
  return (
    <tr className="border-bottom border-2">
      <td className="default-fz font-fallback">{user?.name}</td>
      <td className="default-fz font-fallback">{item?.projects?.title}</td>
      <td className="text-end">
        {/* <Button
          outline
          color="dark"
          className="font-fallback default-fz me-2 my-3 px-3"
          onClick={() => editFunction(item?.oid)}
        >
          <Edit size={18} className="mb-1 me-1" />
          Edit
        </Button> */}
        <Button
          outline
          color="danger"
          className="default-fz font-fallback me-2 px-3 my-3"
          onClick={() => deleteFunction(item?.oid)}
        >
          <Trash2 size={18} className="mb-1 me-1" />
          Delete
        </Button>
        {/* <Button
          outline
          color="success"
          className="default-fz font-fallback px-3"
          onClick={() => districtFunction(item?.oid)}
        >
          Districts
        </Button> */}
      </td>
    </tr>
  );
}

export default ProjectByUserTableRow;

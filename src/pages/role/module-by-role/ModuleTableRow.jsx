import React from "react";
import { Trash2 } from "react-feather";
import { Button } from "reactstrap";
import useWindowWidth from "../../../customHooks/useWindowWidth";

function ModuleTableRow({ item, role, deleteFunction }) {
  const pixel1365 = useWindowWidth(1365);
  const pixel993 = useWindowWidth(993);
  return (
    <tr className="border-bottom border-2">
      <td className="default-fz font-fallback">{role?.roleName}</td>
      <td className="default-fz font-fallback">{item?.modules?.moduleName}</td>
      <td className="text-end">
        <Button
          outline
          color="danger"
          className={`font-fallback my-2 py-1 table__button-custom `}
          onClick={() => deleteFunction(item?.oid)}
        >
          <Trash2 size={pixel993 ? 12 : pixel1365 ? 14 : 16} className="mb-1 me-1" />
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default ModuleTableRow;

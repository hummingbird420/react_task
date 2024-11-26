import React from "react";
import { Button } from "reactstrap";

function ModuleTableRow({ item, handleRoleByModule }) {
  return (
    <tr className="border-bottom border-2">
      <td className={`font-fallback w-25 texttd__font-size`}>
        {item?.moduleName}
      </td>
      <td className="text-end">
        <Button
          outline
          color="success"
          className={`font-fallback my-2 py-1 table__button-custom `}
          onClick={() => handleRoleByModule(item?.oid)}
        >
          Roles
        </Button>
      </td>
    </tr>
  );
}

export default ModuleTableRow;

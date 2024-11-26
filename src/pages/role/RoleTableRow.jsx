import React from "react";
import { Button } from "reactstrap";

function RoleTableRow({ item, moduleFunction }) {
  return (
    <tr className="border-bottom border-2">
      <td className={`font-fallback w-25 texttd__font-size `}>
        {item?.roleName}
      </td>
      <td className="text-end">
        <Button
          outline
          color="success"
          className={`font-fallback my-2 py-1 table__button-custom `}
          onClick={() => moduleFunction(item?.oid)}
        >
          Modules
        </Button>
      </td>
    </tr>
  );
}

export default RoleTableRow;

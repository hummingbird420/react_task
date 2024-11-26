import React from "react";
import { Button } from "reactstrap";

function AdminRecoveryTableRow({ item, handleReset }) {
  return (
    <tr>
      <td
        className=""
        style={{ display: "table-cell", verticalAlign: "middle" }}
      >
        {item?.username}
      </td>
      <td style={{ display: "table-cell", verticalAlign: "middle" }}>
        {item?.cellphone}
      </td>
      <td
        style={{ display: "table-cell", verticalAlign: "middle" }}
        className="text-md-end"
      >
        <Button
          className={`font-fallback my-2 py-1 table__button-custom `}
          onClick={() => handleReset(item?.userAccountID, item?.oid)}
        >
          Reset
        </Button>
      </td>
    </tr>
  );
}

export default AdminRecoveryTableRow;

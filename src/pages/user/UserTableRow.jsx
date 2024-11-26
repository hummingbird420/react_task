import React from "react";
import { Edit, Trash2 } from "react-feather";
import { Button } from "reactstrap";
import useWindowWidth from "../../customHooks/useWindowWidth";

function UserTableRow({ item, editFunction, deleteFunction, systemFunction }) {
  const pixel1365 = useWindowWidth(1365);
  const pixel993 = useWindowWidth(993);
  return (
    <tr className="border-bottom border-2 w-100">
      <td className="font-fallback texttd__font-size pe-xl-2 width-15">
        {item?.name}
      </td>
      <td className="font-fallback texttd__font-size pe-xl-2 width-15">
        {item?.username}
      </td>
      <td className="font-fallback texttd__font-size pe-xl-2 width-15">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item?.roleName}
      </td>
      <td className="text-end">
        <Button
          outline
          color="dark"
          className={`font-fallback my-2 py-1 table__button-custom `}
          onClick={() => editFunction(item?.oid)}
        >
          <Edit
            size={pixel993 ? 12 : pixel1365 ? 14 : 16}
            className="mb-1 me-1"
          />
          Edit
        </Button>
        &nbsp;
        <Button
          outline
          color="danger"
          className={`font-fallback my-2 py-1 table__button-custom `}
          onClick={() => deleteFunction(item?.oid)}
        >
          <Trash2
            size={pixel993 ? 12 : pixel1365 ? 14 : 16}
            className="mb-1 me-1"
          />
          Delete
        </Button>
        &nbsp;
        <Button
          outline
          color="success"
          className={`font-fallback my-2 py-1 table__button-custom `}
          onClick={() => systemFunction(item?.oid)}
        >
          Systems
        </Button>
      </td>
    </tr>
  );
}

export default UserTableRow;

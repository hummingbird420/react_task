import React from "react";
import { Edit, Trash2 } from "react-feather";
import { Button } from "reactstrap";
import useWindowWidth from "../../../customHooks/useWindowWidth";

function SecondLevelTableRow({
  item,
  parentData,
  editFunction,
  deleteFunction,
  secondLevelFunction,
}) {
  const pixel1365 = useWindowWidth(1365);
  const pixel993 = useWindowWidth(993);
  const pixel1500 = useWindowWidth(1500);
  return (
    <tr className="border-bottom border-2">
      <td className={`font-fallback texttd__font-size fw-bolder py-1`}>
        {item?.incidentCategorys} <br />
        <p className="mb-0 fw-normal p-0">{item?.description}</p>
      </td>
      <td className={`text-end ${pixel1500 ? "width-60" : "w-50"}`}>
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
          onClick={() => deleteFunction(item?.oid, parentData?.oid)}
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
          onClick={() => secondLevelFunction(item?.oid)}
        >
          Third Category
        </Button>
      </td>
    </tr>
  );
}

export default SecondLevelTableRow;

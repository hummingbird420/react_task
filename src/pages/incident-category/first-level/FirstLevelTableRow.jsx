import React from "react";
import { Edit, Trash2 } from "react-feather";
import { Button } from "reactstrap";
import useWindowWidth from "../../../customHooks/useWindowWidth";

function FirstLevelTableRow({
  item,
  editFunction,
  deleteFunction,
  secondLevelFunction,
}) {
  const pixel1365 = useWindowWidth(1365);
  const pixel993 = useWindowWidth(993);
  const pixel1500 = useWindowWidth(1500);

  return (
    <tr className="border-bottom border-2">
      <td className={`font-fallback  texttd__font-size `}>
        <p className="mb-0 p-0 texttd__font-size fw-bolder">
          {item?.incidentCategorys}{" "}
        </p>
        <p className="mb-0 fw-normal p-0 texttd__font-size">
          {item?.description}
        </p>
      </td>
      <td className={`text-end ${pixel1500 ? "width-60" : "width-60"}`}>
        <Button
          outline
          color="dark"
          className={`font-fallback my-2 py-1 table__button-custom `}
          onClick={() => editFunction(item?.oid)}
        >
          <Edit
            size={pixel993 ? 12 : pixel1365 ? 14 : 16}
            className="table__button__icon mb-1 me-1"
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
          className="table__button-custom font-size-16 font-fallback px-2"
          onClick={() => secondLevelFunction(item?.oid)}
        >
          Second Category
        </Button>
      </td>
    </tr>
  );
}

export default FirstLevelTableRow;

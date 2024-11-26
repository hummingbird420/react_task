import React from "react";
import { Edit, Trash2 } from "react-feather";
import { Button } from "reactstrap";
import useWindowWidth from "../../customHooks/useWindowWidth";

function ProvinceTableRow({
  item,
  country,
  editFunction,
  deleteFunction,
  districtFunction,
}) {
  const pixel1365 = useWindowWidth(1365);
  const pixel993 = useWindowWidth(993);



  console.log(pixel993);

  return (
    <tr className="border-bottom border-2">
      <td className={`font-fallback w-25 texttd__font-size pe-xl-2 `}>
        {country?.countryName}
      </td>
      <td className={`font-fallback w-25 texttd__font-size `}>
        {item?.provinceName}
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
          // className={`font-fallback px-3 py-1 my-2 ${
          //   pixel1281
          //     ? "font-size-15"
          //     : pixel1365
          //     ? "font-size-16"
          //     : "default-fz"
          // }`}
          className={`font-fallback py-1 my-2 table__button-custom `}
          // style={pixel993 ? styleFor992 : null}
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
          // className={`font-fallback px-3 py-1 my-2 ${
          //   pixel1281
          //     ? "font-size-15"
          //     : pixel1365
          //     ? "font-size-16"
          //     : "default-fz"
          // }`}
          className={`font-fallback py-1 my-2 table__button-custom `}
          // style={pixel993 ? styleFor992 : null}
          onClick={() => districtFunction(item?.oid)}
        >
          Districts
        </Button>
      </td>
    </tr>
  );
}

export default ProvinceTableRow;

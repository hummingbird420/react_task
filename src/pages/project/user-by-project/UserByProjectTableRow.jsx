import React from "react";

function UserByProjectTableRow({ item, project }) {
  return (
    <tr className="border-bottom border-2">
      <td className={`font-fallback w-50 texttd__font-size py-2 `}>
        {project?.title}
      </td>
      <td className={`font-fallback w-50 texttd__font-size py-2`}>
        {item?.userAccount?.name}
      </td>
    </tr>
  );
}

export default UserByProjectTableRow;

import React from "react";

function RuleByModuleTableRow({ item, module }) {
  return (
    <tr className="border-bottom border-2">
      <td className={`font-fallback w-50 texttd__font-size py-2`}>
        {module?.moduleName}
      </td>
      <td className={`font-fallback w-50 texttd__font-size py-2`}>
        {item?.roles?.roleName}
      </td>
    </tr>
  );
}

export default RuleByModuleTableRow;

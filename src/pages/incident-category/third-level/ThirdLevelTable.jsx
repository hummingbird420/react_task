import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import {
  deleteThirdLevelIncidentCategory,
  getThirdSingleIncidentCategoryData,
} from "../store";
import EditModal from "./EditModal";
import SecondLevelTableRow from "./ThirdLevelTableRow";

function SecondLevelTable() {
  // ! state are declared here
  const [editModal, setEditModal] = useState(false);
  // ! hooks are declared here
  const dispatch = useDispatch();

  // ! get data from redux store
  const thirdLevelData = useSelector(
    (state) => state.incidentCategory.thirdLevelCategory
  );
  const parentData = useSelector(
    (state) => state.incidentCategory.selectedSecondLevelIncidentCategory
  );

  // ! handler functions are declared here
  const editFunction = (id) => {
    dispatch(getThirdSingleIncidentCategoryData(id));
    setEditModal(true);
  };

  const deleteFunction = (id, parentID) => {
    const data = {
      id: id,
      parentID: parentID,
    };
    dispatch(deleteThirdLevelIncidentCategory(data));
  };

  return (
    <div>
      <Table className="responsive_table_class">
        <tr className="font-fallback fw-bolder table__heading-text">
          <th>Second Level Category</th>
          <th>{parentData?.incidentCategorys}</th>
          <th></th>
        </tr>
        <tr className="font-fallback border-bottom border-dark border-2 fw-bolder table__heading-text">
          <th className="">Third Level Category</th>
        </tr>
        {thirdLevelData &&
          thirdLevelData.map((item) => (
            <SecondLevelTableRow
              key={item.oid}
              item={item}
              parentData={parentData}
              deleteFunction={deleteFunction}
              editFunction={editFunction}
            />
          ))}
      </Table>
      <EditModal open={editModal} setOpen={setEditModal} />
    </div>
  );
}

export default SecondLevelTable;

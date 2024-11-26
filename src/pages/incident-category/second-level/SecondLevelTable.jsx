import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import {
  deleteIncidentCategory,
  getSecondSingleIncidentCategoryData,
  getThirdLevelIncidentCategory,
} from "../store";
import EditModal from "./EditModal";
import SecondLevelTableRow from "./SecondLevelTableRow";

function SecondLevelTable() {
  // ! state are declared here
  const [editModal, setEditModal] = useState(false);

  // ! hooks are declared here
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ! get data from redux store
  const secondLevelData = useSelector(
    (state) => state.incidentCategory.parentCategory
  );
  const parentData = useSelector(
    (state) => state.incidentCategory.selectedIncidentCategory
  );

  // ! handler functions are declared here
  const editFunction = (id) => {
    dispatch(getSecondSingleIncidentCategoryData(id));
    setEditModal(true);
  };

  const deleteFunction = (id, parentID) => {
    const data = {
      id: id,
      parentID: parentID,
    };
    dispatch(deleteIncidentCategory(data));
  };

  const secondLevelFunction = (id) => {
    dispatch(getThirdLevelIncidentCategory(id));
    dispatch(getSecondSingleIncidentCategoryData(id));
    navigate(`/config/a/third-level-category`);
  };
  return (
    <>
      <Table className="responsive_table_class" >
        <tr className="font-fallback fw-bolder table__heading-text">
          <th className="">First Level Category: </th>
          <th>{parentData?.incidentCategorys}</th>
          <th></th>
        </tr>
        <tr className="font-fallback border-bottom border-dark border-2 fw-bolder table__heading-text">
          <th>Second Level Category</th>
        </tr>
        {secondLevelData &&
          secondLevelData.map((item) => (
            <SecondLevelTableRow
              key={item.oid}
              item={item}
              parentData={parentData}
              deleteFunction={deleteFunction}
              editFunction={editFunction}
              secondLevelFunction={secondLevelFunction}
            />
          ))}
      </Table>
      <EditModal open={editModal} setOpen={setEditModal} />
    </>
  );
}

export default SecondLevelTable;

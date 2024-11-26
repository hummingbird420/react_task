import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import {
  deleteIncidentCategory,
  getIncidentCategoryByParent,
  getSingleIncidentCategoryData,
} from "../store";
import EditModal from "./EditModal";
import FirstLevelTableRow from "./FirstLevelTableRow";

function FirstLevelTable() {
  // ! state are declared here
  const [editModal, setEditModal] = useState(false);

  // ! hooks are declared here
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ! get data from redux store
  const firstLevelData = useSelector((state) => state.incidentCategory.data);

  // ! handler functions are declared here
  const editFunction = (id) => {
    dispatch(getSingleIncidentCategoryData(id));
    setEditModal(true);
  };

  const deleteFunction = (id) => {
    const data = {
      id: id,
    };
    dispatch(deleteIncidentCategory(data));
  };

  const secondLevelFunction = (id) => {
    dispatch(getIncidentCategoryByParent(id));
    dispatch(getSingleIncidentCategoryData(id));
    navigate(`/config/a/subcategory`);
  };
  return (
    <div>
      <Table className="responsive_table_class">
        <tr className="font-fallback border-bottom border-dark border-2 fw-bolder table__heading-text">
          <th className="">First Level Category</th>
          <th></th>
        </tr>
        {firstLevelData &&
          firstLevelData.map((item) => (
            <FirstLevelTableRow
              key={item.oid}
              item={item}
              deleteFunction={deleteFunction}
              editFunction={editFunction}
              secondLevelFunction={secondLevelFunction}
            />
          ))}
      </Table>
      <EditModal open={editModal} setOpen={setEditModal} />
    </div>
  );
}

export default FirstLevelTable;

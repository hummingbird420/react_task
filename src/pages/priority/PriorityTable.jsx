import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import EditPriorityModal from "./EditModal";
import PriorityTableRow from "./PriorityTableRow";
import { deletePriority, getSinglePriorityData } from "./store";

function PriorityTable() {
  // ! states are declared here
  const [editModal, setEditModal] = useState(false);

  // ! hooks are declared here
  const dispatch = useDispatch();

  // ! get data from the redux store
  const priorityData = useSelector((state) => state.priority.data);

  // ! handler functions are declared here
  const editFunction = (id) => {
    dispatch(getSinglePriorityData(id));
    setEditModal(true);
  };

  const deleteFunction = (id) => {
    dispatch(deletePriority(id));
  };

  const facilityFunction = (id) => {
    console.log("facility function called");
  };

  return (
    <div>
      <Table className="responsive_table_class">
        <tr className="font-fallback border-bottom border-dark border-2 fw-bolder table__heading-text">
          <th>Priority Name</th>
          <th></th>
        </tr>
        {priorityData &&
          priorityData.map((item) => (
            <PriorityTableRow
              key={item.oid}
              item={item}
              deleteFunction={deleteFunction}
              editFunction={editFunction}
              facilityFunction={facilityFunction}
            />
          ))}
      </Table>
      <EditPriorityModal open={editModal} setOpen={setEditModal} />
    </div>
  );
}

export default PriorityTable;

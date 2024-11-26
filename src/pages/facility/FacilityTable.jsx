import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import EditFacilityModal from "./EditModal";
import FacilityTableRow from "./FacilityTableRow";
import { deleteFacility, getSingleFacilityData } from "./store";

function FacilityTable() {
  // ! state are declared here
  const [editModal, setEditModal] = useState(false);

  // ! hooks are declared here
  const dispatch = useDispatch();

  // ! get data from redux store
  const facilityData = useSelector((state) => state.district.facility);
  const district = useSelector((state) => state.district.selectedDistrict);

  // ! handler functions are declared here
  const editFunction = (id) => {
    setEditModal(true);
    dispatch(getSingleFacilityData(id));
  };

  const deleteFunction = (id) => {
    const data = {
      id: id,
      districtID: district.oid,
    };
    dispatch(deleteFacility(data));
  };

  return (
    <div>
      <Table className="responsive_table_class">
        <tr className="font-fallback border-bottom border-dark border-2 fw-bolder table__heading-text">
          <th>District</th>
          <th>Facility</th>
        </tr>
        {facilityData &&
          facilityData.map((item) => (
            <FacilityTableRow
              key={item.oid}
              item={item}
              district={district}
              deleteFunction={deleteFunction}
              editFunction={editFunction}
            />
          ))}
      </Table>
      <EditFacilityModal open={editModal} setOpen={setEditModal} />
    </div>
  );
}

export default FacilityTable;

import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";

import DistrictTableRow from "./DistrictTableRow";
import EditDistrictModal from "./EditModal";
import {
  deleteDistrict,
  getFacilityByDistrict,
  getSingleDistrictData,
} from "./store";

function DistrictTable() {
  // ! states are declared here
  const [editModal, setEditModal] = useState(false);

  // ! hooks are declared here
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ! get data from redux store
  const districtData = useSelector((state) => state.province.district);
  const province = useSelector((state) => state.province.selectedProvince);

  // ! handler functions are declared here
  const editFunction = (id) => {
    setEditModal(true);
    dispatch(getSingleDistrictData(id));
  };
  const deleteFunction = (id) => {
    const data = {
      id: id,
      provinceID: province.oid,
    };
    dispatch(deleteDistrict(data));
  };
  const facilityFunction = (id) => {
    dispatch(getFacilityByDistrict(id));
    dispatch(getSingleDistrictData(id));
    navigate(`/config/g/facility`);
  };

  return (
    <div>
      <Table className="responsive_table_class">
        <tr className="font-fallback border-bottom border-dark border-2 fw-bolder table__heading-text">
          <th>Province</th>
          <th>District</th>
        </tr>
        {districtData &&
          districtData.map((item) => (
            <DistrictTableRow
              key={item.oid}
              item={item}
              province={province}
              deleteFunction={deleteFunction}
              editFunction={editFunction}
              facilityFunction={facilityFunction}
            />
          ))}
      </Table>
      <EditDistrictModal open={editModal} setOpen={setEditModal} />
    </div>
  );
}

export default DistrictTable;

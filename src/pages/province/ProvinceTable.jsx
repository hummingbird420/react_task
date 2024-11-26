import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import EditProvinceModal from "./EditModal";
import ProvinceTableRow from "./ProvinceTableRow";
import {
  deleteProvince,
  getDistrictByProvince,
  getSingleProvinceData,
} from "./store";

function ProvinceTable() {
  // ! state are declared here
  const [editModal, setEditModal] = useState(false);

  // ! functions are declared here
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ! get data from store
  const provinceData = useSelector((state) => state.country.province);
  const country = useSelector((state) => state.country.selectedCountry);

  const editFunction = (id) => {
    setEditModal(true);
    dispatch(getSingleProvinceData(id));
  };

  const deleteFunction = (id) => {
    const data = {
      id: id,
      countryID: country.oid,
    };
    dispatch(deleteProvince(data));
  };
  const districtFunction = (id) => {
    dispatch(getDistrictByProvince(id));
    dispatch(getSingleProvinceData(id));
    navigate(`/config/g/district`);
  };
  return (
    <div>
      <Table className="responsive_table_class">
        <tr className="font-fallback border-bottom border-dark border-2 fw-bolder table__heading-text">
          <th className="">Country</th>
          <th>Province</th>
        </tr>
        {provinceData &&
          provinceData.map((item) => (
            <ProvinceTableRow
              key={item.oid}
              item={item}
              country={country}
              deleteFunction={deleteFunction}
              editFunction={editFunction}
              districtFunction={districtFunction}
            />
          ))}
      </Table>
      <EditProvinceModal open={editModal} setOpen={setEditModal} />
    </div>
  );
}

export default ProvinceTable;

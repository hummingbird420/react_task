import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "reactstrap";
import CountryTableRow from "./CountryTableRow";
import {
  deleteCountry,
  getProvinceByCountry,
  getSingleCountryData,
} from "./store";
import EditCountryModal from "./EditModal";
import { useNavigate } from "react-router-dom";

function CountryTable({ data }) {
  // ! state are declared here
  const [editModal, setEditModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteFunction = (id) => {
    dispatch(deleteCountry(id));
  };
  const editFunction = (id) => {
    setEditModal(true);
    dispatch(getSingleCountryData(id));
  };
  const provinceFunction = (id) => {
    dispatch(getProvinceByCountry(id));
    dispatch(getSingleCountryData(id));
    navigate(`/config/g/province`);
  };

  return (
    <div>
      <Table className="responsive_table_class">
        <tr className="font-fallback border-bottom border-dark border-2 fw-bolder table__heading-text">
          <th className="">Country</th>
          <th></th>
        </tr>
        {data &&
          data.map((item) => (
            <CountryTableRow
              key={item.oid}
              item={item}
              deleteFunction={deleteFunction}
              editFunction={editFunction}
              provinceFunction={provinceFunction}
            />
          ))}
      </Table>
      <EditCountryModal open={editModal} setOpen={setEditModal} />
    </div>
  );
}

export default CountryTable;

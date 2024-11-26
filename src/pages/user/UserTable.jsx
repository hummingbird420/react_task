import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import { deleteUser, getSingleUserData } from "./store";
import UserTableRow from "./UserTableRow";

function UserTable({ data, filterObj }) {
  // ! hooks are initialise here
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ! hanlder functions are declared here
  const deleteFunction = (id) => {
    console.log("delete function called");
    dispatch(deleteUser({ id, filterObj }));
  };

  const editFunction = (id) => {
    console.log("edit Funciton Called");
    navigate(`/user/edit/${id}`);
  };

  const systemFunction = (id) => {
    dispatch(getSingleUserData(id));
    navigate(`/config/a/project/role/${id}`);
  };
  return (
    <div>
      <Table className="responsive_table_class">
        <tr className="font-fallback border-bottom border-dark border-2 fw-bolder table__heading-text">
          <th className="">Name</th>
          <th>Username</th>
          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Role</th>
        </tr>
        {data &&
          data.map((item) => (
            <UserTableRow
              key={item.oid}
              item={item}
              deleteFunction={deleteFunction}
              editFunction={editFunction}
              systemFunction={systemFunction}
            />
          ))}
      </Table>
    </div>
  );
}

export default UserTable;

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable comma-dangle */
/* eslint-disable semi */

import { Button } from "reactstrap";
import { Edit, Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSingleUserData } from "./store";
import swalWithCustomButtons from "../../components/swal/SwalWithCustomButton";
import { deleteUser } from "./store";
export const columns = [
  // {
  //   name: "SL No",
  //   sortable: (row) => row.username,
  //   selector: (row) => row.username,
  //   cell: (_row, i) => i + 1,
  // },
  {
    name: "Name",
    style: {
      "@media (mim-width: 768px)": {
        width: "20%",
      },
      "@media (max-width: 767px)": {
        width: "300px",
      },
    },
    sortable: (row) => row.name,
    selector: (row) => row.name,
    cell: (row) => `${row.name}`,
  },
  {
    name: "Username",
    sortable: true,
    style: {
      "@media (mim-width: 768px)": {
        width: "20%",
      },
      "@media (max-width: 767px)": {
        width: "300px",
      },
    },
    selector: (row) => row.username,
  },
  // {
  //   name: "Districts",
  //   sortable: true,
  //   minWidth: "150px",
  //   selector: (row) => row.districts,
  // },

  // {
  //   name: "User Name",
  //   sortable: true,
  //   selector: (row) => row.username,
  // },
  {
    name: "Role",
    style: {
      "@media (mim-width: 768px)": {
        width: "20%",
      },
      "@media (max-width: 767px)": {
        width: "300px",
      },
    },
    selector: (row) => row.roles.roleName,
  },
  // {
  //   name: "Status",

  //   sortable: (row) => row.isAccountActive,
  //   cell: (row) => {
  //     return (
  //       <Badge className="bg-orange-500" pill>
  //         {row.isAccountActive ? "Active" : "Inactive"}
  //       </Badge>
  //     );
  //   },
  // },
  {
    right: true,
    width: "40%",
    style: {
      "@media (min-width: 768px)": {
        width: "40%",
      },
      "@media (max-width: 767px)": {
        width: "100px",
      },
    },
    allowOverflow: true,
    cell: (row) => {
      const navigate = useNavigate();
      const dispatch = useDispatch();

      return (
        <div className="d-flex justify-content-center">
          <Button
            outline
            color="dark"
            className="font-fallback my-3 px-2"
            onClick={() => {
              // dispatch(getSingleUserData(row.oid));
              navigate(`/user/edit/${row.oid}`);
            }}
          >
            <Edit size={16} className="mb-1 me-1" />
            Edit
          </Button>
          &nbsp;
          <Button
            outline
            color="danger"
            className="font-fallback my-3 px-2"
            onClick={() => {
              swalWithCustomButtons
                .fire({
                  title: "Are you sure?",
                  text: "This user data will be deleted. Do you confirm that?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    dispatch(deleteUser(row.oid));
                  }
                });
            }}
          >
            <Trash2 size={16} className="mb-1 me-1" />
            Delete
          </Button>
          &nbsp;
          <Button
            outline
            color="success"
            className=" font-fallback my-3 px-2"
            onClick={() => {
              dispatch(getSingleUserData(row.oid));
              navigate(`/config/a/project/role/${row?.oid}`);
            }}
          >
            Systems
          </Button>
        </div>
      );
    },
  },
];

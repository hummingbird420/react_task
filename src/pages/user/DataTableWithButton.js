/* eslint-disable comma-dangle */
/* eslint-disable multiline-ternary */
/* eslint-disable semi */

import { useState } from "react";
import { columns } from "./data";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { ChevronDown, Plus } from "react-feather";
import { Card, Input, Label, Button, CardHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";

const customStyles = {
  // rows: {
  //   style: {
  //     minHeight: "72px", // override the row height
  //   },
  // },
  headCells: {
    style: {
      fontSize: "20px",
    },
  },
  cells: {
    style: {
      fontSize: "18px",
    },
  },
};

const DataTableWithButtons = ({ data }) => {
  // ! states are initialized here
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // ! hooks are initialized here
  const navigate = useNavigate();

  // ! handler functions are initialized here
  const handleRedirect = () => {
    navigate("/user/create");
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = data.filter((item) => {
        const startsWith = item.name
          .toLowerCase()
          .startsWith(value.toLowerCase());

        // ||
        // item.oid.toString().toLowerCase().startsWith(value.toLowerCase()) ||
        // item.email?.toLowerCase().startsWith(value.toLowerCase()) ||
        // item.age?.toLowerCase().startsWith(value.toLowerCase()) ||
        // item.salary?.toLowerCase().startsWith(value.toLowerCase()) ||
        // item.start_date?.toLowerCase().startsWith(value.toLowerCase()) ||
        // status[item.status]?.title
        //   .toLowerCase()
        //   .startsWith(value.toLowerCase());

        const includes = item.name.toLowerCase().includes(value.toLowerCase());

        // ||
        // item.post?.toLowerCase().includes(value.toLowerCase()) ||
        // item.email?.toLowerCase().includes(value.toLowerCase()) ||
        // item.age?.toLowerCase().includes(value.toLowerCase()) ||
        // item.salary?.toLowerCase().includes(value.toLowerCase()) ||
        // item.start_date?.toLowerCase().includes(value.toLowerCase()) ||
        // status[item.status]?.title
        //   .toLowerCase()
        //   .includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

  // ** Function to handle Pagination
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={currentPage}
      onPageChange={(page) => handlePagination(page)}
      pageCount={
        searchValue.length
          ? Math.ceil(filteredData.length / 7)
          : Math.ceil(data.length / 7) || 1
      }
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="active"
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-center justify-content-md-end pe-1  mt-1"
    />
  );

  return (
    <>
      <Card className="shadow mb-5">
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom py-4 px-4">
          <div className="d-flex mt-md-0 mt-1 justify-content-start">
            <Button
              className="add-button border-0"
              color="warning"
              onClick={handleRedirect}
            >
              <Plus size={15} />
              <span className="align-middle ms-50">Add User</span>
            </Button>
            <div className="d-md-flex d-none align-items-center me-4 ">
              <Label
                for="search-input"
                className="form-label me-2 font-fallback default-fz mb-0"
              >
                Search:
              </Label>
              <Input
                className="dataTable-filter py-2"
                type="text"
                bsSize="sm"
                id="search-input"
                value={searchValue}
                onChange={handleFilter}
                placeholder="Search by Name"
              />
            </div>
          </div>
        </CardHeader>
        <div className="react-dataTable react-dataTable-selectable-rows">
          <DataTable
            noHeader
            pagination
            customStyles={customStyles}
            columns={columns}
            paginationPerPage={7}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            paginationDefaultPage={currentPage + 1}
            data={searchValue.length ? filteredData : data}
          />
        </div>
      </Card>
    </>
  );
};

export default DataTableWithButtons;

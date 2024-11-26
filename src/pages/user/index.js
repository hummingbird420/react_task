/* eslint-disable semi */
import { useEffect, useState } from "react";
import { clearSuccessAndError, getUserData, searchUserByName } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button, Label, Input } from "reactstrap";
import Layout from "../../components/layout/Layout";
import Spinner from "../../components/spinner/Spinner";
import CustomAlert from "../../components/alert/CustomAlert";
import { PlusCircle } from "react-feather";
import UserTable from "./UserTable";
import CustomPagination from "../../components/pagination/CustomPagination";
import { getRoleData } from "../role/store";
import { useNavigate } from "react-router-dom";

function UserInformation() {
  // ! sates are initialized here
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectRole, setSelectRole] = useState("");
  const [searchName, setSearchName] = useState("");

  // ! hooks are initialized here
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const start = currentPage * limit;

  // ! get data from redux store
  const usersData = useSelector((state) => state.user.data.list);
  const totalUser = useSelector((state) => state.user.data.totalUser);
  const roleData = useSelector((state) => state.role.data);

  const {
    loading,
    deleteUserSuccess,
    deleteUserError,
    updateUserError,
    addUserError,
    updateUserSuccess,
    addUserSuccess,
  } = useSelector((state) => state.user);

  // ! useEffect hooks are initialized here
  // useEffect(() => {
  //   if (deleteUserSuccess) {
  //     Swal.fire({
  //       icon: "success",
  //       title: "Deleted!",
  //       text: "User has been deleted.",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     setTimeout(() => {
  //       dispatch(clearSuccessAndError());
  //     }, 1500);
  //   }
  //   if (deleteUserError) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Something went wrong!",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     setTimeout(() => {
  //       dispatch(clearSuccessAndError());
  //     }, 1500);
  //   }
  //   if (updateUserSuccess) {
  //     Swal.fire({
  //       icon: "success",
  //       title: "Updated!",
  //       text: "User has been updated.",
  //       showConfirmButton: false,
  //       timer: 1500,
  //       customClass: {
  //         title: "default-fz",
  //       },
  //     });
  //     setTimeout(() => {
  //       dispatch(clearSuccessAndError());
  //     }, 1500);
  //   }
  //   if (updateUserError) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Something went wrong!",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     setTimeout(() => {
  //       dispatch(clearSuccessAndError());
  //     }, 1500);
  //   }
  //   if (addUserSuccess) {
  //     Swal.fire({
  //       icon: "success",
  //       title: "Added!",
  //       text: "User has been added.",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     setTimeout(() => {
  //       dispatch(clearSuccessAndError());
  //     }, 1500);
  //   }
  //   if (addUserError) {
  //     Swal.fire({
  //       icon: "error",
  //       // title: "Error",
  //       title: addUserError.includes("400")
  //         ? "Username alredy in use. Please try another one."
  //         : "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk.",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     setTimeout(() => {
  //       dispatch(clearSuccessAndError());
  //     }, 1500);
  //   }
  // }, [
  //   dispatch,
  //   deleteUserSuccess,
  //   deleteUserError,
  //   updateUserError,
  //   addUserError,
  //   updateUserSuccess,
  //   addUserSuccess,
  // ]);

  useEffect(() => {
    dispatch(getRoleData());
    if (searchName) {
      dispatch(searchUserByName({ name: searchName, start, limit }));
    } else {
      dispatch(getUserData({ roleID: selectRole, start, limit }));
    }
  }, [dispatch, start, limit, selectRole, searchName]);

  useEffect(() => {
    if (updateUserSuccess) {
      dispatch(getUserData({ roleID: selectRole, start, limit }));
    }
  }, [updateUserSuccess, dispatch, start, limit, selectRole]);

  // ! handler functions are declared here
  const dismissAlert = () => {
    dispatch(clearSuccessAndError());
  };

  // Add User Handler
  const handleAddButtonClick = () => {
    console.log("add button clicked");
    navigate("/user/create");
  };

  // limit change handler
  const handleLimitChange = (e) => {
    setLimit(+e.target.value);
  };

  // ! handle role change
  const handleRoleChange = (e) => {
    setCurrentPage(0);
    setSelectRole(e.target.value);
  };

  /// handle search name
  const handleSearchName = (e) => {
    setSelectRole("");
    setCurrentPage(0);
    setSearchName(e.target.value);
  };
  return (
    <Layout>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh", width: "100%" }}
        >
          <Spinner />
        </div>
      ) : (
        <Row>
          <Col sm="12">
            <div className="display-6 font-fallback">User List</div>
            <hr className="border border-2 border-dark my-4" />
            <CustomAlert
              addSuccess={addUserSuccess}
              addError={addUserError}
              updateSuccess={updateUserSuccess}
              updateError={updateUserError}
              deleteSuccess={deleteUserSuccess}
              deleteError={deleteUserError}
              dismissAlert={dismissAlert}
            />
            <Card className="px-4 py-4 border-0 shadow overflow-auto mb-5">
              <div className="mb-3 d-sm-flex justify-content-between responsive_table_class">
                <Button
                  className="add-button border-0 font-fallback default-fz d-block "
                  onClick={handleAddButtonClick}
                >
                  <PlusCircle size={20} className=" me-1" /> Add User
                </Button>
                <div className="d-flex mt-2 mt-sm-0">
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    className="font-fallback default-fz"
                    value={selectRole}
                    onChange={handleRoleChange}
                  >
                    <option value={0}>All</option>
                    {roleData &&
                      roleData.map((role) => (
                        <option key={role.oid} value={role.oid}>
                          {role.roleName}
                        </option>
                      ))}
                  </Input>
                  &nbsp;
                  <Input
                    type="text"
                    name="search"
                    className="font-fallback default-fz d-inline-block"
                    placeholder="Search By Name"
                    value={searchName}
                    onChange={handleSearchName}
                  />
                </div>
              </div>
              {/* <CountryTable data={countryData} /> */}
              <UserTable
                data={usersData}
                filterObj={{ roleID: selectRole, start, limit }}
              />
              <div className="d-flex justify-content-between align-items-center responsive_table_class">
                <div className={`d-flex align-items-center`}>
                  <Label
                    for="limit"
                    className="default-fz font-fallback me-2 mb-0 "
                  >
                    Show
                  </Label>
                  <Input
                    name="limit"
                    id="limit"
                    type="select"
                    className="orange-500  font-fallback default-fz py-0 mb-0"
                    value={limit}
                    onChange={handleLimitChange}
                  >
                    <option value="10">10</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                  </Input>
                </div>
                &nbsp; &nbsp;
                <div className="">
                  <CustomPagination
                    currentPage={currentPage}
                    limit={limit}
                    setCurrentPage={setCurrentPage}
                    totalItemCount={totalUser}
                  />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </Layout>
  );
}

export default UserInformation;

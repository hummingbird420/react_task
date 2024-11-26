/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config";
import {
  getModuleFromLoacl,
  getModulePermissionData,
} from "../../module/store";
import { getTeamLeaderData } from "../../user/store";

// ** loged in user
export const getLoggedIn = createAsyncThunk(
  "loggedIn/getLoggedIn",
  async (data, { dispatch }) => {
    const response = await axios.post(
      `${API_URL}/tuso-api/user-account/login`,
      data
    );
    const userObj = {
      oid: response.data.oid,
      name: response.data.name,
      roleID: response.data.roleID,
      role: response.data.roles.roleName,
      email: response.data.email,
      username: response.data.username,
    };
    console.log("data", data);
    await dispatch(getModulePermissionData(response.data.roleID));
    localStorage.setItem("user", JSON.stringify(userObj));
    return userObj;
  }
);

export const changePassword = createAsyncThunk(
  "loggedIn/changePassword",
  async (data) => {
    const response = await axios.post(
      `${API_URL}/tuso-api/user-account/changepassword`,
      data
    );
    console.log(response.data);
    return response.data;
  }
);

export const getUserFromLocal = createAsyncThunk(
  "loggedIn/getUserFromLocal",
  async (data, { dispatch }) => {
    const user = localStorage.getItem("user");
    if (user) {
      const userObj = JSON.parse(user);
      await dispatch(getTeamLeaderData(userObj.oid));
    }
    await dispatch(getModuleFromLoacl());
    return user;
  }
);

export const passwordRecovery = createAsyncThunk(
  "loggedIn/passwordRecovery",
  async (data) => {
    const response = await axios.post(
      `${API_URL}/tuso-api/recovery-request`,
      data
    );
    console.log(response.data);
    return response.data;
  }
);

export const getRecoveryListData = createAsyncThunk(
  "loggedIn/getRecoveryListData",
  async (data) => {
    const response = await axios.get(`${API_URL}/tuso-api/recovery-requests`);
    console.log(response.data);
    return response.data;
  }
);

export const adminRecoveyPassword = createAsyncThunk(
  "loggedIn/adminRecoveyPassword",
  async (data, { dispatch }) => {
    await axios.post(
      `${API_URL}/tuso-api/user-account/recovery-password`,
      data
    );
    dispatch(getRecoveryListData());
  }
);

export const logoutUser = createAsyncThunk("loggedIn/logoutUser", async () => {
  localStorage.removeItem("user");
  return null;
});

export const clearPasswordchange = createAsyncThunk(
  "loggedIn/clearPasswordchange",
  async () => {
    return null;
  }
);

export const clearSuccessAndError = createAsyncThunk(
  "loggedIn/clearSuccessAndError",
  async () => {
    return null;
  }
);

const initialState = {
  changePasswordSuccess: false,
  changePasswordError: null,
  loginrequest: false,
  data: [],
  recoveryList: [],
  isLoggedIn: false,
  error: null,
  passwordRecoverySuccess: false,
  passwordRecoveryError: null,
  adminRecoveyPasswordSuccess: false,
  adminRecoveyPasswordError: null,
};

const loggedInSlice = createSlice({
  name: "loggedIn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLoggedIn.pending, (state) => {
      state.loginrequest = true;
      state.isLoggedIn = false;
      state.error = null;
      state.data = [];
    });

    builder.addCase(getLoggedIn.fulfilled, (state, action) => {
      state.loginrequest = false;
      state.isLoggedIn = true;
      state.error = null;
      state.data = action.payload;
    });

    builder.addCase(getLoggedIn.rejected, (state, action) => {
      state.loginrequest = false;
      state.isLoggedIn = false;
      state.data = [];
      state.error = action.error.message;
    });

    builder.addCase(getUserFromLocal.fulfilled, (state, action) => {
      if (action.payload) {
        state.loginrequest = false;
        state.isLoggedIn = true;
        state.data = JSON.parse(action.payload);
        state.error = null;
      } else {
        state.loginrequest = false;
        state.isLoggedIn = false;
        state.data = [];
        state.error = null;
      }
    });
    builder.addCase(getRecoveryListData.fulfilled, (state, action) => {
      state.recoveryList = action.payload;
    });

    builder.addCase(changePassword.fulfilled, (state) => {
      state.changePasswordSuccess = true;
      state.changePasswordError = null;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.changePasswordSuccess = false;
      state.changePasswordError = action.error.message;
    });
    builder.addCase(clearPasswordchange.fulfilled, (state) => {
      state.changePasswordSuccess = false;
      state.changePasswordError = null;
    });
    builder.addCase(passwordRecovery.fulfilled, (state) => {
      state.passwordRecoverySuccess = true;
      state.passwordRecoveryError = null;
    });
    builder.addCase(passwordRecovery.rejected, (state, action) => {
      state.passwordRecoverySuccess = false;
      state.passwordRecoveryError = action.error.message;
    });
    builder.addCase(adminRecoveyPassword.fulfilled, (state) => {
      state.adminRecoveyPasswordSuccess = true;
      state.adminRecoveyPasswordError = null;
    });
    builder.addCase(adminRecoveyPassword.rejected, (state, action) => {
      state.adminRecoveyPasswordSuccess = false;
      state.adminRecoveyPasswordError = action.error.message;
    });

    builder.addCase(clearSuccessAndError.fulfilled, (state) => {
      state.passwordRecoverySuccess = false;
      state.passwordRecoveryError = null;
      state.changePasswordSuccess = false;
      state.changePasswordError = null;
      state.adminRecoveyPasswordSuccess = false;
      state.adminRecoveyPasswordError = null;
      state.error = null;
    });
  },
});

export default loggedInSlice.reducer;

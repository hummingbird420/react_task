/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config";
import { getSystemPermissionByRoleId } from "../../project/store";

export const getSystemPermissionData = createAsyncThunk(
  "systemPermissionData/getSystemPermissionData",
  async () => {
    const response = await axios.get(`${API_URL}/tuso-api/system-permissions`);
    console.log(response.data);
    return response.data;
  }
);

export const addSystemPermissionData = createAsyncThunk(
  "systemPermissionData/addSystemPermissionData",
  async (data, { dispatch }) => {
    await axios.post(`${API_URL}/tuso-api/system-permission`, data);
    await dispatch(getSystemPermissionData());
    await dispatch(getSystemPermissionByRoleId(data.userAccountID));
  }
);

export const addSystemPermissionPermission = createAsyncThunk(
  "systemPermissionData/addSystemPermissionPermission",
  async (data, { dispatch }) => {
    await axios.post(`${API_URL}/tuso-api/SystemPermission-permission`, data);
    await dispatch(getSystemPermissionData());
  }
);

export const getSystemPermissionByUserId = createAsyncThunk(
  "systemPermissionData/getSystemPermissionByUserId",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/system-permission/user/${id}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const updateSystemPermissionData = createAsyncThunk(
  "systemPermissionData/updateSystemPermissionData",
  async (data, { dispatch }) => {
    await axios.put(`${API_URL}/tuso-api/SystemPermission/${data.oid}`, data);
    await dispatch(getSystemPermissionData());
  }
);

export const deleteSystemPermission = createAsyncThunk(
  "systemPermissionData/deleteSystemPermission",
  async (data, { dispatch }) => {
    await axios.delete(
      `${API_URL}/tuso-api/system-permission/${data.systemID}`
    );
    await dispatch(getSystemPermissionData());
    await dispatch(getSystemPermissionByRoleId(data.userAccountID));
  }
);

export const clearSuccessAndError = createAsyncThunk(
  "systemPermissionData/clearSuccessAndError",
  async (dispatch) => {
    return null;
  }
);

const initialState = {
  data: [],
  systemPermissionByUserId: [],
  addSystemPermissionSuccess: false,
  addSystemPermissionError: null,
  deleteSystemPermissionSuccess: false,
  deleteSystemPermissionError: null,
};

const systemPermissionDataSlice = createSlice({
  name: "systemPermissionData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSystemPermissionData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(addSystemPermissionData.fulfilled, (state, action) => {
      state.addSystemPermissionSuccess = true;
      state.addSystemPermissionError = null;
    });
    builder.addCase(addSystemPermissionData.rejected, (state, action) => {
      state.addSystemPermissionSuccess = false;
      state.addSystemPermissionError = action.error.message;
    });
    builder.addCase(deleteSystemPermission.fulfilled, (state, action) => {
      state.deleteSystemPermissionSuccess = true;
      state.deleteSystemPermissionError = null;
    });
    builder.addCase(deleteSystemPermission.rejected, (state, action) => {
      state.deleteSystemPermissionSuccess = false;
      state.deleteSystemPermissionError = action.error.message;
    });
    builder.addCase(getSystemPermissionByUserId.fulfilled, (state, action) => {
      state.systemPermissionByUserId = action.payload;
    });
    builder.addCase(clearSuccessAndError.fulfilled, (state, action) => {
      state.addSystemPermissionSuccess = false;
      state.addSystemPermissionError = null;
      state.deleteSystemPermissionSuccess = false;
      state.deleteSystemPermissionError = null;
    });
  },
});

export default systemPermissionDataSlice.reducer;

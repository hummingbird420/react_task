/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config";

export const getRoleData = createAsyncThunk(
  "roleData/getRoleData",
  async () => {
    const response = await axios.get(`${API_URL}/tuso-api/user-roles`);
    console.log(response.data);
    return response.data;
  }
);

export const getRoleByModule = createAsyncThunk(
  "roleData/getRoleByModule",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/module-permission/module/${id}`
    );
    return response.data;
  }
);

export const getSingleRoleData = createAsyncThunk(
  "roleData/getSingleRoleData",
  async (id) => {
    const response = await axios.get(`${API_URL}/tuso-api/user-role/key/${id}`);
    console.log(response.data);
    return response.data;
  }
);

export const addRoleData = createAsyncThunk(
  "roleData/addRoleData",
  async (data, { dispatch }) => {
    await axios.post(`${API_URL}/tuso-api/user-role`, data);
    await dispatch(getRoleData());
  }
);

export const updateRoleData = createAsyncThunk(
  "roleData/updateRoleData",
  async (data, { dispatch }) => {
    await axios.put(`${API_URL}/tuso-api/user-role/${data.oid}`, data);
    await dispatch(getRoleData());
  }
);

export const deleteRole = createAsyncThunk(
  "roleData/deleteRole",
  async (id, { dispatch }) => {
    await axios.delete(`${API_URL}/tuso-api/user-role/${id}`);
    await dispatch(getRoleData());
  }
);

export const clearSuccessAndError = createAsyncThunk(
  "roleData/clearSuccessAndError",
  async () => {
    return null;
  }
);

const initialState = {
  loading: false,
  data: [],
  roleByModule: [],
  selectedRole: null,
  error: null,
  addRoleSuccess: false,
  updateRoleSuccess: false,
  deleteRoleSuccess: false,
  addRoleError: null,
  updateRoleError: null,
  deleteRoleError: null,
};

const roleDataSlice = createSlice({
  name: "roleData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoleData.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.error = null;
    });
    builder.addCase(getRoleData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getRoleData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.data = [];
    });

    builder.addCase(getRoleByModule.fulfilled, (state, action) => {
      state.roleByModule = action.payload;
    });
    builder.addCase(getSingleRoleData.pending, (state) => {
      state.loading = true;
      state.selectedRole = null;
      state.error = null;
    });
    builder.addCase(getSingleRoleData.fulfilled, (state, action) => {
      state.selectedRole = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getSingleRoleData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.selectedRole = null;
    });

    builder.addCase(addRoleData.pending, (state) => {
      state.addRoleSuccess = false;
      state.addRoleError = null;
    });
    builder.addCase(addRoleData.fulfilled, (state) => {
      state.addRoleSuccess = true;
      state.addRoleError = null;
    });
    builder.addCase(addRoleData.rejected, (state, action) => {
      state.addRoleSuccess = false;
      state.addRoleError = action.error.message;
    });
    builder.addCase(updateRoleData.pending, (state) => {
      state.updateRoleSuccess = false;
      state.updateRoleError = null;
    });
    builder.addCase(updateRoleData.fulfilled, (state) => {
      state.updateRoleSuccess = true;
      state.updateRoleError = null;
    });
    builder.addCase(updateRoleData.rejected, (state, action) => {
      state.updateRoleSuccess = false;
      state.updateRoleError = action.error.message;
    });
    builder.addCase(deleteRole.pending, (state) => {
      state.deleteRoleSuccess = false;
      state.deleteRoleError = null;
    });
    builder.addCase(deleteRole.fulfilled, (state) => {
      state.deleteRoleSuccess = true;
      state.deleteRoleError = null;
    });
    builder.addCase(deleteRole.rejected, (state, action) => {
      state.deleteRoleSuccess = false;
      state.deleteRoleError = action.error.message;
    });
    builder.addCase(clearSuccessAndError.pending, (state) => {
      state.addRoleSuccess = false;
      state.updateRoleSuccess = false;
      state.deleteRoleSuccess = false;
      state.addRoleError = null;
      state.updateRoleError = null;
      state.deleteRoleError = null;
    });
  },
});

export default roleDataSlice.reducer;

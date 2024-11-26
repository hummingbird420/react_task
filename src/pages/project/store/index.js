/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config";

export const getProjectData = createAsyncThunk(
  "projectData/getProjectData",
  async () => {
    const response = await axios.get(`${API_URL}/tuso-api/systems`);
    console.log(response.data);
    return response.data;
  }
);

export const getSingleProjectData = createAsyncThunk(
  "projectData/getSingleProjectData",
  async (id) => {
    const response = await axios.get(`${API_URL}/tuso-api/system/key/${id}`);
    console.log(response.data);
    return response.data;
  }
);

export const getSystemPermissionByRoleId = createAsyncThunk(
  "projectData/getSystemPermissionByRoleId",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/system-permission/user/${id}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const getUserByProject = createAsyncThunk(
  "projectData/getUserByProject",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/system-permission/system/${id}`
    );
    return response.data;
  }
);

export const addProjectData = createAsyncThunk(
  "projectData/addProjectData",
  async (data, { dispatch }) => {
    await axios.post(`${API_URL}/tuso-api/system`, data);
    await dispatch(getProjectData());
  }
);

export const updateProjectData = createAsyncThunk(
  "projectData/updateProjectData",
  async (data, { dispatch }) => {
    await axios.put(`${API_URL}/tuso-api/system/${data.oid}`, data);
    await dispatch(getProjectData());
  }
);

export const deleteProject = createAsyncThunk(
  "projectData/deleteProject",
  async (id, { dispatch }) => {
    await axios.delete(`${API_URL}/tuso-api/system/${id}`);
    await dispatch(getProjectData());
  }
);

export const clearSuccessAndError = createAsyncThunk(
  "projectData/clearSuccessAndError",
  async () => {
    return null;
  }
);

const initialState = {
  loading: false,
  data: [],
  userBySystem: [],
  selectedProject: null,
  systemByRole: [],
  error: null,
  addProjectSuccess: false,
  updateProjectSuccess: false,
  deleteProjectSuccess: false,
  addProjectError: null,
  updateProjectError: null,
  deleteProjectError: null,
};

const projectDataSlice = createSlice({
  name: "projectData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectData.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.error = null;
    });
    builder.addCase(getProjectData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getProjectData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
    builder.addCase(getSingleProjectData.pending, (state) => {
      state.loading = true;
      state.selectedProject = null;
      state.error = null;
    });
    builder.addCase(getSingleProjectData.fulfilled, (state, action) => {
      state.selectedProject = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getSingleProjectData.rejected, (state, action) => {
      state.loading = false;
      state.selectedProject = null;
      state.error = action.error.message;
    });
    builder.addCase(getSystemPermissionByRoleId.pending, (state) => {
      state.loading = true;
      state.systemByRole = [];
      state.error = null;
    });
    builder.addCase(getSystemPermissionByRoleId.fulfilled, (state, action) => {
      state.systemByRole = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getSystemPermissionByRoleId.rejected, (state, action) => {
      state.loading = false;
      state.systemByRole = [];
      state.error = action.error.message;
    });

    builder.addCase(getUserByProject.fulfilled, (state, action) => {
      state.userBySystem = action.payload;
    });

    builder.addCase(addProjectData.pending, (state) => {
      state.loading = true;
      state.addProjectSuccess = false;
      state.addProjectError = null;
    });
    builder.addCase(addProjectData.fulfilled, (state) => {
      state.loading = false;
      state.addProjectSuccess = true;
      state.addProjectError = null;
    });
    builder.addCase(addProjectData.rejected, (state, action) => {
      state.loading = false;
      state.addProjectSuccess = false;
      state.addProjectError = action.error.message;
    });
    builder.addCase(updateProjectData.pending, (state) => {
      state.loading = true;
      state.updateProjectSuccess = false;
      state.updateProjectError = null;
    });
    builder.addCase(updateProjectData.fulfilled, (state) => {
      state.loading = false;
      state.updateProjectSuccess = true;
      state.updateProjectError = null;
    });
    builder.addCase(updateProjectData.rejected, (state, action) => {
      state.loading = false;
      state.updateProjectSuccess = false;
      state.updateProjectError = action.error.message;
    });
    builder.addCase(deleteProject.pending, (state) => {
      state.loading = true;
      state.deleteProjectSuccess = false;
      state.deleteProjectError = null;
    });
    builder.addCase(deleteProject.fulfilled, (state) => {
      state.loading = false;
      state.deleteProjectSuccess = true;
      state.deleteProjectError = null;
    });
    builder.addCase(deleteProject.rejected, (state, action) => {
      state.loading = false;
      state.deleteProjectSuccess = false;
      state.deleteProjectError = action.error.message;
    });
    builder.addCase(clearSuccessAndError.pending, (state) => {
      state.addProjectSuccess = false;
      state.updateProjectSuccess = false;
      state.deleteProjectSuccess = false;
      state.addProjectError = null;
      state.updateProjectError = null;
      state.deleteProjectError = null;
    });
  },
});

export default projectDataSlice.reducer;

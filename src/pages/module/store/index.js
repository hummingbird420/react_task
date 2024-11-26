/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config";

export const getModuleData = createAsyncThunk(
  "moduleData/getModuleData",
  async () => {
    const response = await axios.get(`${API_URL}/tuso-api/modules`);
    console.log(response.data);
    return response.data;
  }
);

export const getSingleModuleData = createAsyncThunk(
  "moduleData/getSingleModuleData",
  async (id) => {
    const response = await axios.get(`${API_URL}/tuso-api/module/key/${id}`);
    console.log(response.data);
    return response.data;
  }
);

export const getModulePermissionData = createAsyncThunk(
  "moduleData/getModulePermissionData",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/module-permission/role/${id}`
    );
    console.log(response.data);
    localStorage.setItem("modulePermission", JSON.stringify(response.data));
    return response.data;
  }
);

export const getModulePermissionByRoleId = createAsyncThunk(
  "moduleData/getModulePermissionByRoleId",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/module-permission/role/${id}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const addModuleData = createAsyncThunk(
  "moduleData/addModuleData",
  async (data, { dispatch }) => {
    await axios.post(`${API_URL}/tuso-api/module`, data);
    await dispatch(getModuleData());
  }
);

export const addModulePermission = createAsyncThunk(
  "moduleData/addModulePermission",
  async (data, { dispatch }) => {
    await axios.post(`${API_URL}/tuso-api/module-permission`, data);
    await dispatch(getModuleData());
    await dispatch(getModulePermissionByRoleId(data.roleID));
  }
);

export const deleteModulePermission = createAsyncThunk(
  "moduleData/deleteModulePermission",
  async (data, { dispatch }) => {
    await axios.delete(
      `${API_URL}/tuso-api/module-permission/${data.permissionID}`
    );
    await dispatch(getModuleData());
    await dispatch(getModulePermissionByRoleId(data.roleID));
  }
);

export const updateModuleData = createAsyncThunk(
  "moduleData/updateModuleData",
  async (data, { dispatch }) => {
    await axios.put(`${API_URL}/tuso-api/module/${data.oid}`, data);
    await dispatch(getModuleData());
  }
);

export const deleteModule = createAsyncThunk(
  "moduleData/deleteModule",
  async (id, { dispatch }) => {
    await axios.delete(`${API_URL}/tuso-api/module/${id}`);
    await dispatch(getModuleData());
  }
);

export const clearSuccessAndError = createAsyncThunk(
  "moduleData/clearSuccessAndError",
  async () => {
    return null;
  }
);

export const getModuleFromLoacl = createAsyncThunk(
  "moduleData/getModuleFromLoacl",
  async () => {
    const modules = localStorage.getItem("modulePermission");
    return modules;
  }
);

const initialState = {
  loading: false,
  data: [],
  modulePermission: [],
  moduleByRole: [],
  selectedModule: null,
  localModule: null,
  error: null,
  addModuleSuccess: false,
  updateModuleSuccess: false,
  deleteModuleSuccess: false,
  addModuleError: null,
  updateModuleError: null,
  deleteModuleError: null,
  addModulePermissionSuccess: false,
  deleteModulePermissionSuccess: false,
  addModulePermissionError: null,
  deleteModulePermissionError: null,
};

const moduleDataSlice = createSlice({
  name: "moduleData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getModuleData.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.error = null;
    });
    builder.addCase(getModuleData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getModuleData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.data = [];
    });

    builder.addCase(getModulePermissionData.fulfilled, (state, action) => {
      state.modulePermission = action.payload;
    });

    builder.addCase(getModulePermissionByRoleId.fulfilled, (state, action) => {
      state.moduleByRole = action.payload;
    });

    builder.addCase(getSingleModuleData.pending, (state) => {
      state.loading = true;
      state.selectedModule = null;
      state.error = null;
    });
    builder.addCase(getSingleModuleData.fulfilled, (state, action) => {
      state.selectedModule = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getModuleFromLoacl.fulfilled, (state, action) => {
      state.modulePermission = JSON.parse(action.payload);
    });

    builder.addCase(getSingleModuleData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.selectedModule = null;
    });

    builder.addCase(addModuleData.pending, (state) => {
      state.loading = true;
      state.addModuleSuccess = false;
      state.addModuleError = null;
    });
    builder.addCase(addModuleData.fulfilled, (state) => {
      state.loading = false;
      state.addModuleSuccess = true;
      state.addModuleError = null;
    });
    builder.addCase(addModuleData.rejected, (state, action) => {
      state.addModuleSuccess = false;
      state.addModuleError = action.error.message;
    });
    builder.addCase(updateModuleData.pending, (state) => {
      state.loading = true;
      state.updateModuleSuccess = false;
      state.updateModuleError = null;
    });
    builder.addCase(updateModuleData.fulfilled, (state) => {
      state.updateModuleSuccess = true;
      state.updateModuleError = null;
    });
    builder.addCase(updateModuleData.rejected, (state, action) => {
      state.updateModuleSuccess = false;
      state.updateModuleError = action.error.message;
    });
    builder.addCase(deleteModule.pending, (state) => {
      state.loading = true;
      state.deleteModuleSuccess = false;
      state.deleteModuleError = null;
    });
    builder.addCase(deleteModule.fulfilled, (state) => {
      state.deleteModuleSuccess = true;
      state.deleteModuleError = null;
    });
    builder.addCase(deleteModule.rejected, (state, action) => {
      state.deleteModuleSuccess = false;
      state.deleteModuleError = action.error.message;
    });
    builder.addCase(addModulePermission.pending, (state) => {
      state.loading = true;
      state.addModulePermissionSuccess = false;
      state.addModulePermissionError = null;
    });
    builder.addCase(addModulePermission.fulfilled, (state) => {
      state.loading = false;
      state.addModulePermissionSuccess = true;
      state.addModulePermissionError = null;
    });
    builder.addCase(addModulePermission.rejected, (state, action) => {
      state.loading = false;
      state.addModulePermissionSuccess = false;
      state.addModulePermissionError = action.error.message;
    });
    builder.addCase(deleteModulePermission.pending, (state) => {
      state.loading = true;
      state.deleteModulePermissionSuccess = false;
      state.deleteModulePermissionError = null;
    });
    builder.addCase(deleteModulePermission.fulfilled, (state) => {
      state.loading = false;
      state.deleteModulePermissionSuccess = true;
      state.deleteModulePermissionError = null;
    });
    builder.addCase(deleteModulePermission.rejected, (state, action) => {
      state.loading = false;
      state.deleteModulePermissionSuccess = false;
      state.deleteModulePermissionError = action.error.message;
    });
    builder.addCase(clearSuccessAndError.pending, (state) => {
      state.addModuleSuccess = false;
      state.updateModuleSuccess = false;
      state.deleteModuleSuccess = false;
      state.addModuleError = null;
      state.updateModuleError = null;
      state.deleteModuleError = null;
      state.addModulePermissionSuccess = false;
      state.deleteModulePermissionSuccess = false;
      state.addModulePermissionError = null;
      state.deleteModulePermissionError = null;
    });
  },
});

export default moduleDataSlice.reducer;

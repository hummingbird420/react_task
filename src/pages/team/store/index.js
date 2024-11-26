/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config";

export const getTeamData = createAsyncThunk(
  "teamData/getTeamData",
  async () => {
    const response = await axios.get(`${API_URL}/tuso-api/teams`);
    console.log(response.data);
    return response.data;
  }
);

export const getSingleTeamData = createAsyncThunk(
  "teamData/getSingleTeamData",
  async (id) => {
    const response = await axios.get(`${API_URL}/tuso-api/team/key/${id}`);
    console.log(response.data);
    return response.data;
  }
);

export const addTeamData = createAsyncThunk(
  "teamData/addTeamData",
  async (data, { dispatch }) => {
    await axios.post(`${API_URL}/tuso-api/team`, data);
    await dispatch(getTeamData());
  }
);

export const updateTeamData = createAsyncThunk(
  "teamData/updateTeamData",
  async (data, { dispatch }) => {
    await axios.put(`${API_URL}/tuso-api/team/${data.oid}`, data);
    await dispatch(getTeamData());
  }
);

export const deleteTeam = createAsyncThunk(
  "teamData/deleteTeam",
  async (id, { dispatch }) => {
    await axios.delete(`${API_URL}/tuso-api/team/${id}`);
    await dispatch(getTeamData());
  }
);

export const getMembersByTeamId = createAsyncThunk(
  "teamData/getMembersByTeamId",
  async (id) => {
    const response = await axios.get(`${API_URL}/tuso-api/member/team/${id}`);
    console.log(response.data);
    return response.data;
  }
);

export const clearSuccessAndError = createAsyncThunk(
  "teamData/clearSuccessAndError",
  async () => {
    return null;
  }
);

const initialState = {
  loading: false,
  data: [],
  selectedTeam: null,
  selectedTeamMembers: [],
  error: null,
  addTeamSuccess: false,
  updateTeamSuccess: false,
  deleteTeamSuccess: false,
  addTeamError: null,
  updateTeamError: null,
  deleteTeamError: null,
};

const teamDataSlice = createSlice({
  name: "teamData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTeamData.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.error = null;
    });
    builder.addCase(getTeamData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getTeamData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.data = [];
    });
    builder.addCase(getSingleTeamData.pending, (state) => {
      state.loading = true;
      state.selectedTeam = null;
      state.error = null;
    });
    builder.addCase(getSingleTeamData.fulfilled, (state, action) => {
      state.selectedTeam = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getSingleTeamData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.selectedTeam = null;
    });

    builder.addCase(addTeamData.pending, (state) => {
      state.addTeamSuccess = false;
      state.addTeamError = null;
    });
    builder.addCase(addTeamData.fulfilled, (state) => {
      state.addTeamSuccess = true;
      state.addTeamError = null;
    });
    builder.addCase(addTeamData.rejected, (state, action) => {
      state.addTeamSuccess = false;
      state.addTeamError = action.error.message;
    });
    builder.addCase(updateTeamData.pending, (state) => {
      state.updateTeamSuccess = false;
      state.updateTeamError = null;
    });
    builder.addCase(updateTeamData.fulfilled, (state) => {
      state.updateTeamSuccess = true;
      state.updateTeamError = null;
    });
    builder.addCase(updateTeamData.rejected, (state, action) => {
      state.updateTeamSuccess = false;
      state.updateTeamError = action.error.message;
    });
    builder.addCase(deleteTeam.pending, (state) => {
      state.deleteTeamSuccess = false;
      state.deleteTeamError = null;
    });
    builder.addCase(deleteTeam.fulfilled, (state) => {
      state.deleteTeamSuccess = true;
      state.deleteTeamError = null;
    });
    builder.addCase(deleteTeam.rejected, (state, action) => {
      state.deleteTeamSuccess = false;
      state.deleteTeamError = action.error.message;
    });
    builder.addCase(getMembersByTeamId.pending, (state) => {
      state.loading = true;
      state.selectedTeamMembers = [];
      state.error = null;
    });
    builder.addCase(getMembersByTeamId.fulfilled, (state, action) => {
      state.selectedTeamMembers = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getMembersByTeamId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.selectedTeamMembers = [];
    });
    builder.addCase(clearSuccessAndError.pending, (state) => {
      state.addTeamSuccess = false;
      state.updateTeamSuccess = false;
      state.deleteTeamSuccess = false;
      state.addTeamError = null;
      state.updateTeamError = null;
      state.deleteTeamError = null;
    });
  },
});

export default teamDataSlice.reducer;

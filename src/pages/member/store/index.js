/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config";
import { getMembersByTeamId } from "../../team/store";

export const getMemberData = createAsyncThunk(
  "memberData/getMemberData",
  async () => {
    const response = await axios.get(`${API_URL}/tuso-api/members`);
    console.log(response.data);
    return response.data;
  }
);

export const addMemberData = createAsyncThunk(
  "memberData/addMemberData",
  async (data, { dispatch }) => {
    await axios.post(`${API_URL}/tuso-api/member`, data);
    await dispatch(getMemberData());
    await dispatch(getMembersByTeamId(data.teamID));
  }
);

export const addMemberPermission = createAsyncThunk(
  "memberData/addMemberPermission",
  async (data, { dispatch }) => {
    await axios.post(`${API_URL}/tuso-api/member-permission`, data);
    await dispatch(getMemberData());
  }
);

export const updateMemberData = createAsyncThunk(
  "memberData/updateMemberData",
  async (data, { dispatch }) => {
    await axios.put(`${API_URL}/tuso-api/member/${data.oid}`, data);
    await dispatch(getMemberData());
  }
);

export const deleteMember = createAsyncThunk(
  "memberData/deleteMember",
  async (data, { dispatch }) => {
    await axios.delete(`${API_URL}/tuso-api/member/${data.id}`);
    await dispatch(getMemberData());
    await dispatch(getMembersByTeamId(data.teamID));
  }
);

export const clearSuccessAndError = createAsyncThunk(
  "memberData/clearSuccessAndError",
  async () => {
    return null;
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
  addMemberSuccess: false,
  addMemberError: null,
  updateMemberSuccess: false,
  updateMemberError: null,
  deleteMemberSuccess: false,
  deleteMemberError: null,
};

const MemberDataSlice = createSlice({
  name: "memberData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMemberData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(addMemberData.pending, (state) => {
      state.addMemberSuccess = false;
      state.addMemberError = null;
    });
    builder.addCase(addMemberData.fulfilled, (state) => {
      state.addMemberSuccess = true;
      state.addMemberError = null;
    });
    builder.addCase(addMemberData.rejected, (state, action) => {
      state.addMemberError = action.error.message;
      state.addMemberSuccess = false;
    });
    builder.addCase(updateMemberData.pending, (state) => {
      state.updateMemberSuccess = false;
      state.updateMemberError = null;
    });
    builder.addCase(updateMemberData.fulfilled, (state) => {
      state.updateMemberSuccess = true;
      state.updateMemberError = null;
    });
    builder.addCase(updateMemberData.rejected, (state, action) => {
      state.updateMemberError = action.error.message;
      state.updateMemberSuccess = false;
    });
    builder.addCase(deleteMember.pending, (state) => {
      state.deleteMemberSuccess = false;
      state.deleteMemberError = null;
    });
    builder.addCase(deleteMember.fulfilled, (state) => {
      state.deleteMemberSuccess = true;
      state.deleteMemberError = null;
    });
    builder.addCase(deleteMember.rejected, (state, action) => {
      state.deleteMemberError = action.error.message;
      state.deleteMemberSuccess = false;
    });
    builder.addCase(clearSuccessAndError.fulfilled, (state) => {
      state.addMemberSuccess = false;
      state.addMemberError = null;
      state.updateMemberSuccess = false;
      state.updateMemberError = null;
      state.deleteMemberSuccess = false;
      state.deleteMemberError = null;
    });
  },
});

export default MemberDataSlice.reducer;

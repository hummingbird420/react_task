/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config";

export const getPriorityData = createAsyncThunk(
  "priorityData/getPriorityData",
  async () => {
    const response = await axios.get(`${API_URL}/tuso-api/incident-priorities`);
    console.log(response.data);
    return response.data;
  }
);

export const getSinglePriorityData = createAsyncThunk(
  "priorityData/getSinglePriorityData",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/incident-priority/key/${id}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const addPriorityData = createAsyncThunk(
  "priorityData/addPriorityData",
  async (data, { dispatch }) => {
    await axios.post(`${API_URL}/tuso-api/incident-priority`, data);
    await dispatch(getPriorityData());
  }
);

export const updatePriorityData = createAsyncThunk(
  "priorityData/updatePriorityData",
  async (data, { dispatch }) => {
    console.log("data", data);
    await axios.put(`${API_URL}/tuso-api/incident-priority/${data.oid}`, data);
    await dispatch(getPriorityData());
  }
);

export const deletePriority = createAsyncThunk(
  "priorityData/deletePriority",
  async (id, { dispatch }) => {
    await axios.delete(`${API_URL}/tuso-api/incident-priority/${id}`);
    await dispatch(getPriorityData());
  }
);

export const clearSuccessAndError = createAsyncThunk(
  "priorityData/clearSuccessAndError",
  async () => {
    return null;
  }
);

const initialState = {
  loading: false,
  data: [],
  selectedPriority: null,
  error: null,
  addPrioritySuccess: false,
  updatePrioritySuccess: false,
  deletePrioritySuccess: false,
  addPriorityError: null,
  updatePriorityError: null,
  deletePriorityError: null,
};

const priorityDataSlice = createSlice({
  name: "priorityData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPriorityData.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    });
    builder.addCase(getPriorityData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getPriorityData.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.data = [];
    });
    builder.addCase(getSinglePriorityData.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.selectedPriority = null;
    });
    builder.addCase(getSinglePriorityData.fulfilled, (state, action) => {
      state.selectedPriority = action.payload;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(getSinglePriorityData.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.selectedPriority = null;
    });

    builder.addCase(addPriorityData.pending, (state) => {
      state.addPrioritySuccess = false;
      state.addPriorityError = null;
    });
    builder.addCase(addPriorityData.fulfilled, (state) => {
      state.addPrioritySuccess = true;
      state.addPriorityError = null;
    });
    builder.addCase(addPriorityData.rejected, (state, action) => {
      state.addPrioritySuccess = false;
      state.addPriorityError = action.error.message;
    });
    builder.addCase(updatePriorityData.pending, (state) => {
      state.updatePrioritySuccess = false;
      state.updatePriorityError = null;
    });
    builder.addCase(updatePriorityData.fulfilled, (state) => {
      state.updatePrioritySuccess = true;
      state.updatePriorityError = null;
    });
    builder.addCase(updatePriorityData.rejected, (state, action) => {
      state.updatePrioritySuccess = false;
      state.updatePriorityError = action.error.message;
    });
    builder.addCase(deletePriority.pending, (state) => {
      state.deletePrioritySuccess = false;
      state.deletePriorityError = null;
    });
    builder.addCase(deletePriority.fulfilled, (state) => {
      state.deletePrioritySuccess = true;
      state.deletePriorityError = null;
    });
    builder.addCase(deletePriority.rejected, (state, action) => {
      state.deletePrioritySuccess = false;
      state.deletePriorityError = action.error.message;
    });
    builder.addCase(clearSuccessAndError.pending, (state) => {
      state.addPrioritySuccess = false;
      state.updatePrioritySuccess = false;
      state.deletePrioritySuccess = false;
      state.addPriorityError = null;
      state.updatePriorityError = null;
      state.deletePriorityError = null;
    });
  },
});

export default priorityDataSlice.reducer;

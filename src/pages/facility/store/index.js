/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config";
import { getFacilityByDistrict } from "../../district/store";

export const getFacilityData = createAsyncThunk(
  "facilityData/getFacilityData",
  async () => {
    const response = await axios.get(`${API_URL}/tuso-api/facilities`);
    console.log(response.data);
    return response.data;
  }
);

export const getSingleFacilityData = createAsyncThunk(
  "facilityData/getSingleFacilityData",
  async (id) => {
    const response = await axios.get(`${API_URL}/tuso-api/facility/key/${id}`);
    console.log(response.data);
    return response.data;
  }
);

export const addFacilityData = createAsyncThunk(
  "facilityData/addFacilityData",
  async (data, { dispatch }) => {
    await axios.post(`${API_URL}/tuso-api/facility`, data);
    await dispatch(getFacilityData());
    await dispatch(getFacilityByDistrict(data.districtID));
  }
);

export const updateFacilityData = createAsyncThunk(
  "facilityData/updateFacilityData",
  async (data, { dispatch }) => {
    await axios.put(`${API_URL}/tuso-api/facility/${data.oid}`, data);
    await dispatch(getFacilityData());
    await dispatch(getFacilityByDistrict(data.districtID));
  }
);

export const deleteFacility = createAsyncThunk(
  "facilityData/deleteFacility",
  async (data, { dispatch }) => {
    await axios.delete(`${API_URL}/tuso-api/facility/${data?.id}`);
    await dispatch(getFacilityData());
    await dispatch(getFacilityByDistrict(data?.districtID));
  }
);

export const clearSuccessAndError = createAsyncThunk(
  "facilityData/clearSuccessAndError",
  async () => {
    return null;
  }
);

const initialState = {
  loading: false,
  data: [],
  selectedFacility: null,
  error: null,
  addFacilitySuccess: false,
  updateFacilitySuccess: false,
  deleteFacilitySuccess: false,
  addFacilityError: null,
  updateFacilityError: null,
  deleteFacilityError: null,
};

const facilityDataSlice = createSlice({
  name: "facilityData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFacilityData.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.error = null;
    });
    builder.addCase(getFacilityData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getFacilityData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.data = [];
    });
    builder.addCase(getSingleFacilityData.pending, (state) => {
      state.loading = true;
      state.selectedFacility = null;
      state.error = null;
    });

    builder.addCase(getSingleFacilityData.fulfilled, (state, action) => {
      state.selectedFacility = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getSingleFacilityData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.selectedFacility = null;
    });

    builder.addCase(addFacilityData.pending, (state) => {
      state.loading = true;
      state.addFacilitySuccess = false;
      state.addFacilityError = null;
    });
    builder.addCase(addFacilityData.fulfilled, (state) => {
      state.loading = false;
      state.addFacilitySuccess = true;
      state.addFacilityError = null;
    });
    builder.addCase(addFacilityData.rejected, (state, action) => {
      state.loading = false;
      state.addFacilitySuccess = false;
      state.addFacilityError = action.error.message;
    });
    builder.addCase(updateFacilityData.pending, (state) => {
      state.loading = true;
      state.updateFacilitySuccess = false;
      state.updateFacilityError = null;
    });
    builder.addCase(updateFacilityData.fulfilled, (state) => {
      state.loading = false;
      state.updateFacilitySuccess = true;
      state.updateFacilityError = null;
    });
    builder.addCase(updateFacilityData.rejected, (state, action) => {
      state.loading = false;
      state.updateFacilitySuccess = false;
      state.updateFacilityError = action.error.message;
    });
    builder.addCase(deleteFacility.pending, (state) => {
      state.loading = true;
      state.deleteFacilitySuccess = false;
      state.deleteFacilityError = null;
    });
    builder.addCase(deleteFacility.fulfilled, (state) => {
      state.loading = false;
      state.deleteFacilitySuccess = true;
      state.deleteFacilityError = null;
    });
    builder.addCase(deleteFacility.rejected, (state, action) => {
      state.loading = false;
      state.deleteFacilitySuccess = false;
      state.deleteFacilityError = action.error.message;
    });
    builder.addCase(clearSuccessAndError.pending, (state) => {
      state.addFacilitySuccess = false;
      state.updateFacilitySuccess = false;
      state.deleteFacilitySuccess = false;
      state.addFacilityError = null;
      state.updateFacilityError = null;
      state.deleteFacilityError = null;
    });
  },
});

export default facilityDataSlice.reducer;

/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config";
import { getDistrictByProvince } from "../../province/store";

export const getDistrictData = createAsyncThunk(
  "districtData/getDistrictData",
  async () => {
    const response = await axios.get(`${API_URL}/tuso-api/districts`);
    console.log(response.data);
    return response.data;
  }
);

export const getSingleDistrictData = createAsyncThunk(
  "districtData/getSingleDistrictData",
  async (id) => {
    const response = await axios.get(`${API_URL}/tuso-api/district/key/${id}`);
    console.log(response.data);
    return response.data;
  }
);

export const getFacilityByDistrict = createAsyncThunk(
  "districtData/getFacilityByDistrict",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/facility/district/${id}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const addDistrictData = createAsyncThunk(
  "districtData/addDistrictData",
  async (data, { dispatch }) => {
    await axios.post(`${API_URL}/tuso-api/district`, data);
    await dispatch(getDistrictData());
    await dispatch(getDistrictByProvince(data.provinceID));
  }
);

export const updateDistrictData = createAsyncThunk(
  "districtData/updateDistrictData",
  async (data, { dispatch }) => {
    await axios.put(`${API_URL}/tuso-api/district/${data.oid}`, data);
    await dispatch(getDistrictData());
    await dispatch(getDistrictByProvince(data.provinceID));
  }
);

export const deleteDistrict = createAsyncThunk(
  "districtData/deleteDistrict",
  async (data, { dispatch }) => {
    await axios.delete(`${API_URL}/tuso-api/district/${data?.id}`);
    await dispatch(getDistrictData());
    await dispatch(getDistrictByProvince(data?.provinceID));
  }
);

export const clearSuccessAndError = createAsyncThunk(
  "districtData/clearSuccessAndError",
  async () => {
    return null;
  }
);

export const clearFicility = createAsyncThunk(
  "districtData/clearFicility",
  async () => {
    return null;
  }
);

const initialState = {
  data: [],
  facility: [],
  selectedDistrict: null,
  loading: false,
  error: null,
  addDistrictSuccess: false,
  updateDistrictSuccess: false,
  deleteDistrictSuccess: false,
  addDistrictError: null,
  updateDistrictError: null,
  deleteDistrictError: null,
};

const districtDataSlice = createSlice({
  name: "districtData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDistrictData.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.error = null;
    });
    builder.addCase(getDistrictData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getDistrictData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
    builder.addCase(getSingleDistrictData.pending, (state) => {
      state.loading = true;
      state.selectedDistrict = null;
      state.error = null;
    });
    builder.addCase(getSingleDistrictData.fulfilled, (state, action) => {
      state.selectedDistrict = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getSingleDistrictData.rejected, (state, action) => {
      state.loading = false;
      state.selectedDistrict = null;
      state.error = action.error.message;
    });

    builder.addCase(getFacilityByDistrict.fulfilled, (state, action) => {
      state.facility = action.payload;
    });
    builder.addCase(addDistrictData.fulfilled, (state) => {
      state.addDistrictSuccess = true;
      state.addDistrictError = null;
    });
    builder.addCase(addDistrictData.rejected, (state, action) => {
      state.addDistrictSuccess = false;
      state.addDistrictError = action.error.message;
    });
    builder.addCase(updateDistrictData.fulfilled, (state) => {
      state.updateDistrictSuccess = true;
      state.updateDistrictError = null;
    });
    builder.addCase(updateDistrictData.rejected, (state, action) => {
      state.updateDistrictSuccess = false;
      state.updateDistrictError = action.error.message;
    });
    builder.addCase(deleteDistrict.fulfilled, (state) => {
      state.deleteDistrictSuccess = true;
      state.deleteDistrictError = null;
    });
    builder.addCase(deleteDistrict.rejected, (state, action) => {
      state.deleteDistrictSuccess = false;
      state.deleteDistrictError = action.error.message;
    });
    builder.addCase(clearSuccessAndError.fulfilled, (state) => {
      state.addDistrictSuccess = false;
      state.updateDistrictSuccess = false;
      state.deleteDistrictSuccess = false;
      state.addDistrictError = null;
      state.updateDistrictError = null;
      state.deleteDistrictError = null;
    });

    builder.addCase(clearFicility.fulfilled, (state) => {
      state.facility = [];
    });
  },
});

export default districtDataSlice.reducer;

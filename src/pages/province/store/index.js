/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config";
import { getProvinceByCountry } from "../../country/store";

export const getProvinceData = createAsyncThunk(
  "provinceData/getProvinceData",
  async () => {
    const response = await axios.get(`${API_URL}/tuso-api/provinces`);
    console.log(response.data);
    return response.data;
  }
);

export const getSingleProvinceData = createAsyncThunk(
  "provinceData/getSingleProvinceData",
  async (id) => {
    const response = await axios.get(`${API_URL}/tuso-api/province/key/${id}`);
    console.log(response.data);
    return response.data;
  }
);

export const addProvinceData = createAsyncThunk(
  "provinceData/addProvinceData",
  async (data, { dispatch }) => {
    await axios.post(`${API_URL}/tuso-api/province`, data);
    await dispatch(getProvinceData());
    await dispatch(getProvinceByCountry(data.countryID));
  }
);

export const getDistrictByProvince = createAsyncThunk(
  "provinceData/getDistrictByProvince",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/district/province/${id}`
    );
    console.log(response.data);
    return response.data;
  }
);
export const updateProvinceData = createAsyncThunk(
  "provinceData/updateProvinceData",
  async (data, { dispatch }) => {
    await axios.put(`${API_URL}/tuso-api/province/${data.oid}`, data);
    await dispatch(getProvinceData());
    await dispatch(getProvinceByCountry(data.countryID));
  }
);

export const deleteProvince = createAsyncThunk(
  "provinceData/deleteProvince",
  async (data, { dispatch }) => {
    await axios.delete(`${API_URL}/tuso-api/province/${data.id}`);
    await dispatch(getProvinceData());
    await dispatch(getProvinceByCountry(data.countryID));
  }
);

export const clearDistrict = createAsyncThunk(
  "provinceData/clearDistrict",
  async () => {
    return null;
  }
);

export const clearSuccessAndError = createAsyncThunk(
  "provinceData/clearSuccessAndError",
  async () => {
    return null;
  }
);

const initialState = {
  data: [],
  district: [],
  selectedProvince: null,
  loading: false,
  error: null,
  addProvinceSuccess: false,
  updateProvinceSuccess: false,
  deleteProvinceSuccess: false,
  addProvinceError: null,
  updateProvinceError: null,
  deleteProvinceError: null,
};

const provinceDataSlice = createSlice({
  name: "provinceData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProvinceData.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.error = null;
    });
    builder.addCase(getProvinceData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getProvinceData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getSingleProvinceData.pending, (state) => {
      state.loading = true;
      state.selectedProvince = null;
      state.error = null;
    });
    builder.addCase(getSingleProvinceData.fulfilled, (state, action) => {
      state.selectedProvince = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getSingleProvinceData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });

    builder.addCase(getDistrictByProvince.fulfilled, (state, action) => {
      state.district = action.payload;
    });

    builder.addCase(addProvinceData.pending, (state) => {
      state.addProvinceSuccess = false;
      state.addProvinceError = null;
    });
    builder.addCase(addProvinceData.fulfilled, (state) => {
      state.addProvinceSuccess = true;
      state.addProvinceError = null;
    });
    builder.addCase(addProvinceData.rejected, (state, action) => {
      state.addProvinceSuccess = false;
      state.addProvinceError = action.error.message;
    });
    builder.addCase(updateProvinceData.pending, (state) => {
      state.updateProvinceSuccess = false;
      state.updateProvinceError = null;
    });
    builder.addCase(updateProvinceData.fulfilled, (state) => {
      state.updateProvinceSuccess = true;
      state.updateProvinceError = null;
    });
    builder.addCase(updateProvinceData.rejected, (state, action) => {
      state.updateProvinceSuccess = false;
      state.updateProvinceError = action.error.message;
    });
    builder.addCase(deleteProvince.pending, (state) => {
      state.deleteProvinceSuccess = false;
      state.deleteProvinceError = null;
    });
    builder.addCase(deleteProvince.fulfilled, (state) => {
      state.deleteProvinceSuccess = true;
      state.deleteProvinceError = null;
    });
    builder.addCase(deleteProvince.rejected, (state, action) => {
      state.deleteProvinceSuccess = false;
      state.deleteProvinceError = action.error.message;
    });
    builder.addCase(clearSuccessAndError.fulfilled, (state) => {
      state.addProvinceSuccess = false;
      state.updateProvinceSuccess = false;
      state.deleteProvinceSuccess = false;
      state.addProvinceError = null;
      state.updateProvinceError = null;
      state.deleteProvinceError = null;
    });

    builder.addCase(clearDistrict.fulfilled, (state) => {
      state.district = [];
    });
  },
});

export default provinceDataSlice.reducer;

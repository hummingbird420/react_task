/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config";

export const getCountryData = createAsyncThunk(
  "countryData/getCountryData",
  async () => {
    const response = await axios.get(`${API_URL}/tuso-api/countries`);
    console.log(response.data);
    return response.data;
  }
);

export const getSingleCountryData = createAsyncThunk(
  "countryData/getSingleCountryData",
  async (id) => {
    const response = await axios.get(`${API_URL}/tuso-api/country/key/${id}`);
    console.log(response.data);
    return response.data;
  }
);

export const getProvinceByCountry = createAsyncThunk(
  "countryData/getProvinceByCountry",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/province/country/${id}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const addCountryData = createAsyncThunk(
  "countryData/addCountryData",
  async (data, { dispatch }) => {
    await axios.post(`${API_URL}/tuso-api/country`, data);
    await dispatch(getCountryData());
  }
);

export const updateCountryData = createAsyncThunk(
  "countryData/updateCountryData",
  async (data, { dispatch }) => {
    await axios.put(`${API_URL}/tuso-api/country/${data.oid}`, data);
    await dispatch(getCountryData());
  }
);

export const deleteCountry = createAsyncThunk(
  "countryData/deleteCountry",
  async (id, { dispatch }) => {
    await axios.delete(`${API_URL}/tuso-api/country/${id}`);
    await dispatch(getCountryData());
  }
);

export const clearSuccessAndError = createAsyncThunk(
  "countryData/clearSuccessAndError",
  async () => {
    return null;
  }
);

const initialState = {
  loading: false,
  data: [],
  selectedCountry: null,
  error: null,
  province: [],
  addCountrySuccess: false,
  updateCountrySuccess: false,
  deleteCountrySuccess: false,
  addCountryError: null,
  updateCountryError: null,
  deleteCountryError: null,
};

const countryDataSlice = createSlice({
  name: "countryData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCountryData.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.error = null;
    });
    builder.addCase(getCountryData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getCountryData.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.data = [];
    });
    builder.addCase(getSingleCountryData.pending, (state) => {
      state.selectedCountry = null;
      state.error = null;
    });
    builder.addCase(getSingleCountryData.fulfilled, (state, action) => {
      state.selectedCountry = action.payload;

      state.error = null;
    });
    builder.addCase(getSingleCountryData.rejected, (state, action) => {
      state.error = action.error.message;
      state.selectedCountry = null;
    });

    builder.addCase(getProvinceByCountry.pending, (state) => {
      state.province = [];
      state.error = null;
    });
    builder.addCase(getProvinceByCountry.fulfilled, (state, action) => {
      state.province = action.payload;
      state.error = null;
    });
    builder.addCase(getProvinceByCountry.rejected, (state, action) => {
      state.error = action.error.message;
      state.province = [];
    });

    builder.addCase(addCountryData.pending, (state) => {
      state.loading = true;
      state.addCountrySuccess = false;
      state.addCountryError = null;
    });
    builder.addCase(addCountryData.fulfilled, (state) => {
      state.loading = false;
      state.addCountrySuccess = true;
      state.addCountryError = null;
    });
    builder.addCase(addCountryData.rejected, (state, action) => {
      state.addCountryError = action.error.message;
      state.loading = false;
      state.addCountrySuccess = false;
    });
    builder.addCase(updateCountryData.pending, (state) => {
      state.loading = true;
      state.updateCountrySuccess = false;
      state.updateCountryError = null;
    });
    builder.addCase(updateCountryData.fulfilled, (state) => {
      state.loading = false;
      state.updateCountrySuccess = true;
      state.updateCountryError = null;
    });
    builder.addCase(updateCountryData.rejected, (state, action) => {
      state.updateCountryError = action.error.message;
      state.loading = false;
      state.updateCountrySuccess = false;
    });
    builder.addCase(deleteCountry.pending, (state) => {
      state.loading = true;
      state.deleteCountrySuccess = false;
      state.deleteCountryError = null;
    });
    builder.addCase(deleteCountry.fulfilled, (state) => {
      state.loading = false;
      state.deleteCountrySuccess = true;
      state.deleteCountryError = null;
    });
    builder.addCase(deleteCountry.rejected, (state, action) => {
      state.deleteCountryError = action.error.message;
      state.loading = false;
      state.deleteCountrySuccess = false;
    });
    builder.addCase(clearSuccessAndError.fulfilled, (state) => {
      state.addCountrySuccess = false;
      state.updateCountrySuccess = false;
      state.deleteCountrySuccess = false;
      state.addCountryError = null;
      state.updateCountryError = null;
      state.deleteCountryError = null;
    });
  },
});

export default countryDataSlice.reducer;

/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config";

export const getIncidentCategoryData = createAsyncThunk(
  "incidentCategoryData/getIncidentCategoryData",
  async () => {
    const response = await axios.get(`${API_URL}/tuso-api/incident-categorys`);
    console.log(response.data);
    return response.data;
  }
);

export const getTreeViewData = createAsyncThunk(
  "incidentCategoryData/getTreeViewData",
  async () => {
    const response = await axios.get(
      `${API_URL}/tuso-api/incident-categorystreeview`
    );
    console.log(response.data);
    return response.data;
  }
);

export const getIncidentCategoryByParent = createAsyncThunk(
  "incidentCategoryData/getIncidentCategoryByParent",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/incident-categorys/key/${id}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const getThirdLevelIncidentCategory = createAsyncThunk(
  "incidentCategoryData/getThirdLevelIncidentCategory",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/incident-categorys/key/${id}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const getSingleIncidentCategoryData = createAsyncThunk(
  "incidentCategoryData/getSingleIncidentCategoryData",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/incident-category/key/${id}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const getSecondSingleIncidentCategoryData = createAsyncThunk(
  "incidentCategoryData/getSecondSingleIncidentCategoryData",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/incident-category/key/${id}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const getThirdSingleIncidentCategoryData = createAsyncThunk(
  "incidentCategoryData/getThirdSingleIncidentCategoryData",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/incident-category/key/${id}`
    );
    console.log(response.data);
    return response.data;
  }
);
export const addIncidentCategoryData = createAsyncThunk(
  "incidentCategoryData/addIncidentCategoryData",
  async (data, { dispatch }) => {
    if (data.secondParent) {
      await axios.post(`${API_URL}/tuso-api/incident-category`, data.data);
      await dispatch(getIncidentCategoryData());
      await dispatch(getIncidentCategoryByParent(data.data.parentID));
      await dispatch(getThirdLevelIncidentCategory(data.secondParent.id));
    } else {
      await axios.post(`${API_URL}/tuso-api/incident-category`, data);
      await dispatch(getIncidentCategoryData());
      await dispatch(getIncidentCategoryByParent(data.parentID));
    }
  }
);

export const updateIncidentCategoryData = createAsyncThunk(
  "incidentCategoryData/updateIncidentCategoryData",
  async (data, { dispatch }) => {
    await axios.put(`${API_URL}/tuso-api/incident-category/${data.oid}`, data);
    await dispatch(getIncidentCategoryData());
    await dispatch(getIncidentCategoryByParent(data.parentID));
  }
);

export const deleteIncidentCategory = createAsyncThunk(
  "incidentCategoryData/deleteIncidentCategory",
  async (data, { dispatch }) => {
    console.log("data", data);
    await axios.delete(`${API_URL}/tuso-api/incident-category/${data.id}`);
    if (data.parentID) {
      await dispatch(getIncidentCategoryData());
      await dispatch(getIncidentCategoryByParent(data.parentID));
    } else {
      await dispatch(getIncidentCategoryData());
    }
  }
);

export const updateThirdLevelIncidentCategory = createAsyncThunk(
  "incidentCategoryData/updateThirdLevelIncidentCategory",
  async (data, { dispatch }) => {
    await axios.put(`${API_URL}/tuso-api/incident-category/${data.oid}`, data);
    await dispatch(getIncidentCategoryData());
    await dispatch(getThirdLevelIncidentCategory(data.parentID));
  }
);

export const deleteThirdLevelIncidentCategory = createAsyncThunk(
  "incidentCategoryData/deleteThirdLevelIncidentCategory",
  async (data, { dispatch }) => {
    console.log("data", data);
    await axios.delete(`${API_URL}/tuso-api/incident-category/${data.id}`);
    await dispatch(getIncidentCategoryData());
    await dispatch(getThirdLevelIncidentCategory(data.parentID));
  }
);

export const clearSuccessAndError = createAsyncThunk(
  "incidentCategoryData/clearSuccessAndError",
  async () => {
    return null;
  }
);

export const clearParentCategory = createAsyncThunk(
  "incidentCategoryData/clearParentCategory",
  async () => {
    return null;
  }
);

export const clearThirdCategory = createAsyncThunk(
  "incidentCategoryData/clearThirdCategory",
  async () => {
    return null;
  }
);

const initialState = {
  data: [],
  treeview: [],
  parentCategory: [],
  thirdLevelCategory: [],
  selectedIncidentCategory: {},
  selectedSecondLevelIncidentCategory: {},
  selectedThirdLevelIncidentCategory: {},
  addCategorySuccess: false,
  addCategoryError: null,
  updateCategorySuccess: false,
  updateCategoryError: null,
  deleteCategorySuccess: false,
  deleteCategoryError: null,
};

const incidentCategoryDataSlice = createSlice({
  name: "incidentCategoryData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIncidentCategoryData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getTreeViewData.fulfilled, (state, action) => {
      state.treeview = action.payload;
    });
    builder.addCase(getIncidentCategoryByParent.fulfilled, (state, action) => {
      state.parentCategory = action.payload;
    });
    builder.addCase(
      getSingleIncidentCategoryData.fulfilled,
      (state, action) => {
        state.selectedIncidentCategory = action.payload;
      }
    );

    builder.addCase(
      getSecondSingleIncidentCategoryData.fulfilled,
      (state, action) => {
        state.selectedSecondLevelIncidentCategory = action.payload;
      }
    );

    builder.addCase(
      getThirdSingleIncidentCategoryData.fulfilled,
      (state, action) => {
        state.selectedThirdLevelIncidentCategory = action.payload;
      }
    );

    builder.addCase(
      getThirdLevelIncidentCategory.fulfilled,
      (state, action) => {
        state.thirdLevelCategory = action.payload;
      }
    );
    builder.addCase(addIncidentCategoryData.fulfilled, (state, action) => {
      state.addCategorySuccess = true;
      state.addCategoryError = null;
    });
    builder.addCase(addIncidentCategoryData.rejected, (state, action) => {
      state.addCategorySuccess = false;
      state.addCategoryError = action.error.message;
    });
    builder.addCase(updateIncidentCategoryData.fulfilled, (state, action) => {
      state.updateCategorySuccess = true;
      state.updateCategoryError = null;
    });
    builder.addCase(updateIncidentCategoryData.rejected, (state, action) => {
      state.updateCategorySuccess = false;
      state.updateCategoryError = action.error.message;
    });
    builder.addCase(deleteIncidentCategory.fulfilled, (state, action) => {
      state.deleteCategorySuccess = true;
      state.deleteCategoryError = null;
    });
    builder.addCase(deleteIncidentCategory.rejected, (state, action) => {
      state.deleteCategorySuccess = false;
      state.deleteCategoryError = action.error.message;
    });
    builder.addCase(
      updateThirdLevelIncidentCategory.fulfilled,
      (state, action) => {
        state.updateCategorySuccess = true;
        state.updateCategoryError = null;
      }
    );
    builder.addCase(
      updateThirdLevelIncidentCategory.rejected,
      (state, action) => {
        state.updateCategorySuccess = false;
        state.updateCategoryError = action.error.message;
      }
    );
    builder.addCase(
      deleteThirdLevelIncidentCategory.fulfilled,
      (state, action) => {
        state.deleteCategorySuccess = true;
        state.deleteCategoryError = null;
      }
    );
    builder.addCase(
      deleteThirdLevelIncidentCategory.rejected,
      (state, action) => {
        state.deleteCategorySuccess = false;
        state.deleteCategoryError = action.error.message;
      }
    );
    builder.addCase(clearSuccessAndError.fulfilled, (state, action) => {
      state.addCategorySuccess = false;
      state.addCategoryError = null;
      state.updateCategorySuccess = false;
      state.updateCategoryError = null;
      state.deleteCategorySuccess = false;
      state.deleteCategoryError = null;
    });

    builder.addCase(clearParentCategory.fulfilled, (state) => {
      state.parentCategory = [];
    });

    builder.addCase(clearThirdCategory.fulfilled, (state) => {
      state.thirdLevelCategory = [];
    });
  },
});

export default incidentCategoryDataSlice.reducer;

/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config";

export const getTicketData = createAsyncThunk(
  "ticketData/getTicketData",
  async (data) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/incidents?start=${data?.start}&take=${data?.limit}&status=${data?.status}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const clientTicketData = createAsyncThunk(
  "ticketData/clientTicketData",
  async (data) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/incidents/client?key=${data.key}&start=${data.start}&take=${data.limit}&status=${data.status}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const getExpertTicketData = createAsyncThunk(
  "ticketData/getExpertTicketData",
  async (data) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/incidents/expart?key=${data.key}&start=${data.start}&take=${data.limit}&status=${data.status}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const getExpertTeamLeaderTicketData = createAsyncThunk(
  "ticketData/getExpertTeamLeaderTicketData",
  async (data) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/incidents/expartleader?key=${data.key}&start=${data.start}&take=${data.limit}&status=${data.status}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const getFilterdTicketData = createAsyncThunk(
  "ticketData/getFilterdTicketData",
  async (data) => {
    const response = await axios.post(
      `${API_URL}/tuso-api/incidents/search?start=${data.start}&take=${data.limit}`,
      data.serchObj
    );
    console.log(response.data);
    return response.data;
  }
);

export const getTicketById = createAsyncThunk(
  "ticketData/getTicketById",
  async (data) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/incidents/key?key=${data?.key}&UserAccountID=${data?.UserAccountID}&start=${data?.start}&take=${data?.limit}&status=${data?.status}`
    );

    return response.data;
  }
);
export const getSingTicketData = createAsyncThunk(
  "ticketData/getSingTicketData",
  async (id) => {
    const response = await axios.get(`${API_URL}/tuso-api/incident/key/${id}`);
    console.log(response.data);
    return response.data;
  }
);

export const addTicketData = createAsyncThunk(
  "ticketData/addTicketData",
  async (data, { dispatch }) => {
    const response = await axios.post(`${API_URL}/tuso-api/incident`, data);
    console.log(response.data);
    return response.data;
  }
);

export const updateTicketData = createAsyncThunk(
  "ticketData/updateTicketData",
  async (data, { dispatch }) => {
    await axios.put(`${API_URL}/tuso-api/incident/${data.oid}`, data);
    await dispatch(getSingTicketData(data.oid));
  }
);
export const closeTicketData = createAsyncThunk(
  "ticketData/closeTicketData",
  async (data, { dispatch }) => {
    await axios.put(`${API_URL}/tuso-api/incident/${data.oid}`, data);
    await dispatch(getSingTicketData(data.oid));
  }
);

export const closeListTicketData = createAsyncThunk(
  "ticketData/closeListTicketData",
  async (id, { dispatch }) => {
    await axios.get(`${API_URL}/tuso-api/incident/close/${id}`);
  }
);

export const deleteTicket = createAsyncThunk(
  "ticketData/deleteTicket",
  async (id, { dispatch }) => {
    await axios.delete(`${API_URL}/tuso-api/incident/${id}`);
  }
);

export const uploadScreenShot = createAsyncThunk(
  "ticketData/uploadScreenShot",
  async (data, { dispatch }) => {
    const response = await axios.post(
      `${API_URL}/tuso-api/screenshot/${data?.id}`,
      data?.img,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    return response.data;
  }
);

export const clearSuccessAndError = createAsyncThunk(
  "ticketData/clearSuccessAndError",
  async () => {
    return null;
  }
);

export const clearUploadAttachment = createAsyncThunk(
  "ticketData/clearUploadAttachment",
  async () => {
    return null;
  }
);

const initialState = {
  data: [],
  loading: false,
  selectedTicket: {},
  getError: null,
  addError: null,
  newCreatedTicket: null,
  addTicketSuccess: false,
  updateTicketSuccess: false,
  deleteTicketSuccess: false,
  addTicketError: null,
  updateTicketError: null,
  deleteTicketError: null,
  closeTicketSuccess: false,
  closeTicketError: null,
  uploadScreenShotSuccess: false,
};

const TicketDataSlice = createSlice({
  name: "ticketData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTicketData.pending, (state) => {
      state.loading = true;
      state.getError = null;
      state.data = [];
    });
    builder.addCase(getTicketData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.getError = null;
    });
    builder.addCase(getTicketData.rejected, (state, action) => {
      state.getError = action.error.message;
      state.loading = false;
      state.data = [];
    });
    builder.addCase(clientTicketData.pending, (state) => {
      state.loading = true;
      state.getError = null;
      state.data = [];
    });
    builder.addCase(clientTicketData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.getError = null;
    });

    builder.addCase(clientTicketData.rejected, (state, action) => {
      state.getError = action.error.message;
      state.loading = false;
      state.data = [];
    });
    builder.addCase(getExpertTicketData.pending, (state) => {
      state.loading = true;
      state.getError = null;
      state.data = [];
    });
    builder.addCase(getExpertTicketData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.getError = null;
    });

    builder.addCase(getExpertTicketData.rejected, (state, action) => {
      state.getError = action.error.message;
      state.loading = false;
      state.data = [];
    });

    builder.addCase(getExpertTeamLeaderTicketData.pending, (state) => {
      state.loading = true;
      state.getError = null;
      state.data = [];
    });
    builder.addCase(
      getExpertTeamLeaderTicketData.fulfilled,
      (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.getError = null;
      }
    );

    builder.addCase(getExpertTeamLeaderTicketData.rejected, (state, action) => {
      state.getError = action.error.message;
      state.loading = false;
      state.data = [];
    });

    builder.addCase(getTicketById.pending, (state) => {
      // state.loading = true;
      // state.getError = null;
      state.data = [];
    });

    builder.addCase(getTicketById.fulfilled, (state, action) => {
      state.data = action.payload;
      // state.loading = false;
      // state.getError = null;
    });

    builder.addCase(getTicketById.rejected, (state, action) => {
      // state.getError = action.error.message;
      // state.loading = false;
      state.data = [];
    });

    builder.addCase(addTicketData.pending, (state) => {
      state.addTicketSuccess = false;
      state.addTicketError = null;
    });
    builder.addCase(addTicketData.fulfilled, (state, action) => {
      state.newCreatedTicket = action.payload;
      state.addTicketSuccess = true;
      state.addTicketError = null;
    });

    builder.addCase(addTicketData.rejected, (state, action) => {
      state.addTicketSuccess = false;
      state.addTicketError = action.error.message;
      state.addError = action.error;
    });

    builder.addCase(uploadScreenShot.fulfilled, (state) => {
      state.uploadScreenShotSuccess = true;
    });

    builder.addCase(updateTicketData.pending, (state) => {
      state.updateTicketSuccess = false;
      state.updateTicketError = null;
    });
    builder.addCase(updateTicketData.fulfilled, (state) => {
      state.updateTicketSuccess = true;
      state.updateTicketError = null;
    });

    builder.addCase(updateTicketData.rejected, (state, action) => {
      state.updateTicketSuccess = false;
      state.updateTicketError = action.error.message;
    });

    builder.addCase(deleteTicket.pending, (state) => {
      state.deleteTicketSuccess = false;
      state.deleteTicketError = null;
    });
    builder.addCase(deleteTicket.fulfilled, (state) => {
      state.deleteTicketSuccess = true;
      state.deleteTicketError = null;
    });

    builder.addCase(deleteTicket.rejected, (state, action) => {
      state.deleteTicketSuccess = false;
      state.deleteTicketError = action.error.message;
    });

    builder.addCase(closeListTicketData.fulfilled, (state) => {
      state.closeTicketSuccess = true;
      state.closeTicketError = null;
    });

    builder.addCase(closeListTicketData.rejected, (state, action) => {
      state.closeTicketSuccess = false;
      state.closeTicketError = action.error.message;
    });

    builder.addCase(getSingTicketData.fulfilled, (state, action) => {
      state.selectedTicket = action.payload;
    });
    builder.addCase(getFilterdTicketData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(clearSuccessAndError.fulfilled, (state) => {
      state.addTicketSuccess = false;
      state.updateTicketSuccess = false;
      state.deleteTicketSuccess = false;
      state.addTicketError = null;
      state.updateTicketError = null;
      state.deleteTicketError = null;
      state.closeTicketSuccess = false;
      state.closeTicketError = null;
    });
    builder.addCase(clearUploadAttachment, (state) => {
      state.uploadScreenShotSuccess = false;
    });
  },
});

export default TicketDataSlice.reducer;

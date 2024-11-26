/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../config";

export const getUserData = createAsyncThunk(
  "userData/getUserData",
  async (data) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/user-account/role/${data?.roleID || 0}?start=${
        data?.start
      }&take=${data?.limit}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const searchUserByName = createAsyncThunk(
  "userData/searchUserByName",
  async (data) => {
    const CancelToken = axios.CancelToken;
    let cancel;
    const response = await axios.get(
      `${API_URL}/tuso-api/user-accounts/name?name=${data?.name}&start=${data?.start}&take=${data?.limit}`,
      {
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        }),
      }
    );
    cancel();
    return response.data;
  }
);

export const getSingleUserData = createAsyncThunk(
  "userData/getSingleUserData",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/user-account/key/${id}`
    );
    console.log(response.data);
    return response.data;
  }
);

export const getExpertUserData = createAsyncThunk(
  "userData/getExpertUserData",
  async () => {
    const response = await axios.get(`${API_URL}/tuso-api/user-account/expert`);
    console.log(response.data);
    return response.data;
  }
);

export const addUserData = createAsyncThunk(
  "userData/addUserData",
  async (data, { dispatch }) => {
    await axios.post(`${API_URL}/tuso-api/user-account`, data?.newIncident);
    await dispatch(getUserData(data?.filterObj));
  }
);

export const getTeamLeaderData = createAsyncThunk(
  "userData/getTeamLeaderData",
  async (id) => {
    const response = await axios.get(`${API_URL}/tuso-api/member/user/${id}`);
    console.log(response.data);
    return response.data;
  }
);

export const updateUserData = createAsyncThunk(
  "userData/updateUserData",
  async (data, { dispatch }) => {
    await axios.put(`${API_URL}/tuso-api/user-account/${data.oid}`, data);
    await dispatch(getUserData());
  }
);

export const uploadProfileImg = createAsyncThunk(
  "userData/uploadProfileImg",
  async (data, { dispatch }) => {
    await axios.post(
      `${API_URL}/tuso-api/profile-picture/${data.id}`,
      data.image,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // await dispatch(getUserData());
  }
);

export const getUerImage = createAsyncThunk(
  "userData/getUerImage",
  async (id) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/profile-picture/key/${id}`
    );
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  "userData/deleteUser",
  async (data, { dispatch }) => {
    await axios.delete(`${API_URL}/tuso-api/user-account/${data?.id}`);
    await dispatch(getUserData(data?.filterObj));
  }
);

export const checkUniqueUsername = createAsyncThunk(
  "userData/checkUniqueUsername",
  async (username) => {
    const response = await axios.get(
      `${API_URL}/tuso-api/user-account/unique/${username}`
    );
    return response.data;
  }
);

export const clearSuccessAndError = createAsyncThunk(
  "userData/clearSuccessAndError",
  async () => {
    return null;
  }
);

export const clearUploadSuccessAndError = createAsyncThunk(
  "userData/clearUploadSuccessAndError",
  async () => {
    return null;
  }
);

const initialState = {
  loading: false,
  data: [],
  selectedUser: {},
  loginUserImage: false,
  uploadImageSuccess: false,
  uploadImageError: null,
  uniqueUsername: false,
  teamLeader: {},
  expertUser: [],
  error: null,
  addUserSuccess: false,
  updateUserSuccess: false,
  deleteUserSuccess: false,
  addUserError: null,
  updateUserError: null,
  deleteUserError: null,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.data = [];
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.data = [];
    });
    builder.addCase(searchUserByName.pending, (state) => {
      state.data = [];
    });
    builder.addCase(searchUserByName.fulfilled, (state, action) => {
      state.data = action.payload;
      // // state.loading = false;
      // state.error = null;
    });
    builder.addCase(searchUserByName.rejected, (state, action) => {
      // state.loading = false;
      // state.error = action.error.message;
      state.data = [];
    });
    builder.addCase(getSingleUserData.fulfilled, (state, action) => {
      state.selectedUser = action.payload;
    });
    builder.addCase(addUserData.fulfilled, (state) => {
      state.addUserSuccess = true;
      state.addUserError = null;
    });
    builder.addCase(getExpertUserData.fulfilled, (state, action) => {
      state.expertUser = action.payload;
    });

    builder.addCase(addUserData.rejected, (state, action) => {
      state.addUserSuccess = false;
      state.addUserError = action.error.message;
    });
    builder.addCase(updateUserData.fulfilled, (state) => {
      state.updateUserSuccess = true;
      state.updateUserError = null;
    });
    builder.addCase(updateUserData.rejected, (state, action) => {
      state.updateUserSuccess = false;
      state.updateUserError = action.error.message;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.deleteUserSuccess = true;
      state.deleteUserError = null;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.deleteUserSuccess = false;
      state.deleteUserError = action.error.message;
    });
    builder.addCase(getTeamLeaderData.fulfilled, (state, action) => {
      state.teamLeader = action.payload;
    });
    builder.addCase(uploadProfileImg.fulfilled, (state) => {
      state.uploadImageSuccess = true;
    });
    builder.addCase(getUerImage.fulfilled, (state, action) => {
      state.loginUserImage = true;
    });

    builder.addCase(getUerImage.rejected, (state) => {
      state.loginUserImage = false;
    });

    builder.addCase(checkUniqueUsername.fulfilled, (state, action) => {
      state.uniqueUsername = action.payload;
    });

    builder.addCase(clearSuccessAndError.fulfilled, (state) => {
      state.addUserSuccess = false;
      state.updateUserSuccess = false;
      state.deleteUserSuccess = false;
      state.addUserError = null;
      state.updateUserError = null;
      state.deleteUserError = null;
    });

    builder.addCase(clearUploadSuccessAndError.fulfilled, (state) => {
      state.uploadImageSuccess = false;
      state.uploadImageError = null;
    });
  },
});

export default userDataSlice.reducer;

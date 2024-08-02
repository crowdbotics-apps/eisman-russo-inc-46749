const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isAuthorized: false,
  accessToken: null,
  userProfile: null,
  credentials: null
};

const ezDebriApp = createSlice({
  name: "ezDebriApp",
  initialState,
  reducers: {
    setIsAuthorized: (state, action) => {
      state.isAuthorized = action?.payload?.isAuthorized;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action?.payload?.accessToken;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action?.payload?.userProfile;
    },
    setUserCredentials: (state, action) => {
      state.credentials = action?.payload?.credentials;
    }
  }
});

export const {
  setIsAuthorized,
  setAccessToken,
  setUserProfile,
  setUserCredentials
} = ezDebriApp.actions;

export default ezDebriApp.reducer;

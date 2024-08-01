const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isAuthorized: false,
  accessToken: null,
  deviceId: null
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
    setDeviceId: (state, action) => {
      state.deviceId = action?.payload?.deviceId;
    }
  }
});

export const { setIsAuthorized, setAccessToken, setDeviceId } =
  ezDebriApp.actions;

export default ezDebriApp.reducer;

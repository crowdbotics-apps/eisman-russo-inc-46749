import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../util/axiosConfig";
import { companyAPIsEndPoints } from "../../constants/apiEndPoints";
import { main_api } from "../../api/axiosHelper";

//----------------------- Initial state -----------------------//

const initialState = {
  isLoading: false,
  error: "",
  loginResponse: {},
};

//----------------------- Slice -----------------------//

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUserSlice(state, action) {
      state.isLoading = action.payload.isLoading;
      state.error = action.payload.error;
      state.loginResponse = action.payload;
    },
  },
});

//----------------------- Actions -----------------------//


export const { loginUserSlice } = slice.actions;
// Reducer
export default slice.reducer;

//----------------------- Thunk -----------------------//

export function loginUser(formValues) {
  return async (dispatch, getState) => {
    try {
      dispatch(slice.actions.loginUserSlice({ isLoading: true, error: "", loginResponse: {} }));
      const { data } = await main_api.post(companyAPIsEndPoints.COMPANY_LOGIN, formValues);
      dispatch(slice.actions.loginUserSlice({ isLoading: false, error: "", loginResponse: data.result }));
    } catch (error) {
      dispatch(slice.actions.loginUserSlice({ isLoading: false, error: error.message, loginResponse: {} }));
    }
  };
}

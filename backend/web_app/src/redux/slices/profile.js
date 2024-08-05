import { createSlice } from "@reduxjs/toolkit";
import { adminAPIsEndPoints } from "../../constants/apiEndPoints";
import { main_api } from "../../api/axiosHelper";

//----------------------- Initial state -----------------------//


const initialState = {
    isLoading: false,
    error: "",
    profileData: [],
};

//----------------------- Slice -----------------------//

const slice = createSlice({
    name: "profileData",
    initialState,
    reducers: {
        getProfileDataStart(state) {
            state.isLoading = true;
            state.error = "";
            state.profileData = [];
        },
        getProfileDataSuccess(state, action) {
            state.isLoading = false;
            state.profileData = action.payload;
        },
        getProfileDataFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});
//----------------------- Actions -----------------------//

export const { getProfileDataStart, getProfileDataSuccess, getProfileDataFailure } = slice.actions;


//----------------------- Thunk -----------------------//

export function getProfileData() {
    return async (dispatch) => {
        try {
            dispatch(getProfileDataStart());
            const response = await main_api.get(adminAPIsEndPoints.USER_DETAILS);
            dispatch(getProfileDataSuccess(response.data.result));
        } catch (error) {
            dispatch(getProfileDataFailure(error.message));
        }
    };
};


// Reducer
export default slice.reducer;


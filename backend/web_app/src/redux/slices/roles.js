import { createSlice } from "@reduxjs/toolkit";
import { adminAPIsEndPoints } from "../../constants/apiEndPoints";
import { main_api } from "../../api/axiosHelper";

//----------------------- Initial state -----------------------//

const initialState = {
    isLoading: false,
    error: "",
    roles: [],
};

//----------------------- Slice -----------------------//

const slice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        getRolesStart(state) {
            state.isLoading = true;
            state.error = "";
            state.roles = [];
        },
        getRolesSuccess(state, action) {
            state.isLoading = false;
            state.roles = action.payload;
        },
        getRolesFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});
//----------------------- Actions -----------------------//

export const { getRolesStart, getRolesSuccess, getRolesFailure } = slice.actions;


//----------------------- Thunk -----------------------//

export function getRoles() {
    return async (dispatch) => {
        try {
            dispatch(getRolesStart());
            const response = await main_api.get(adminAPIsEndPoints.LIST_ROLES);
            dispatch(getRolesSuccess(response.data.results));
        } catch (error) {
            dispatch(getRolesFailure(error.message));
        }
    };
};


// Reducer
export default slice.reducer;


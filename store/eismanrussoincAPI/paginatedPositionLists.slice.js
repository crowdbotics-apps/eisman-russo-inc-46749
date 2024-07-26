import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const users_position_list = createAsyncThunk(
  "paginatedPositionLists/users_position_list",
  async payload => {
    const response = await apiService.users_position_list(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const paginatedPositionListsSlice = createSlice({
  name: "paginatedPositionLists",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(users_position_list.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(users_position_list.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = [
            ...state.entities.filter(record => record.id !== action.payload.id),
            action.payload
          ]
          state.api.loading = "idle"
        }
      })
      .addCase(users_position_list.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
  }
})
export default { users_position_list, slice: paginatedPositionListsSlice }

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const ticketing_sub_activity_list = createAsyncThunk(
  "paginatedSubActivityLists/ticketing_sub_activity_list",
  async payload => {
    const response = await apiService.ticketing_sub_activity_list(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const paginatedSubActivityListsSlice = createSlice({
  name: "paginatedSubActivityLists",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(ticketing_sub_activity_list.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_sub_activity_list.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = [
            ...state.entities.filter(record => record.id !== action.payload.id),
            action.payload
          ]
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_sub_activity_list.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
  }
})
export default {
  ticketing_sub_activity_list,
  slice: paginatedSubActivityListsSlice
}

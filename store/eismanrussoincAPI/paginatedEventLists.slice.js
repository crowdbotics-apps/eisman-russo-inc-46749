import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const ticketing_event_list = createAsyncThunk(
  "paginatedEventLists/ticketing_event_list",
  async payload => {
    const response = await apiService.ticketing_event_list(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const paginatedEventListsSlice = createSlice({
  name: "paginatedEventLists",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(ticketing_event_list.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_event_list.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = [
            ...state.entities.filter(record => record.id !== action.payload.id),
            action.payload
          ]
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_event_list.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
  }
})
export default { ticketing_event_list, slice: paginatedEventListsSlice }

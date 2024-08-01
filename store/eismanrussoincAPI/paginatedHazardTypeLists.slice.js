import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const ticketing_hazard_type_list = createAsyncThunk(
  "paginatedHazardTypeLists/ticketing_hazard_type_list",
  async payload => {
    const response = await apiService.ticketing_hazard_type_list(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const paginatedHazardTypeListsSlice = createSlice({
  name: "paginatedHazardTypeLists",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(ticketing_hazard_type_list.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_hazard_type_list.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = [
            ...state.entities.filter(record => record.id !== action.payload.id),
            action.payload
          ]
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_hazard_type_list.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
  }
})
export default {
  ticketing_hazard_type_list,
  slice: paginatedHazardTypeListsSlice
}

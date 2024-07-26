import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const users_profile_list = createAsyncThunk(
  "paginatedUserReadLists/users_profile_list",
  async payload => {
    const response = await apiService.users_profile_list(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const paginatedUserReadListsSlice = createSlice({
  name: "paginatedUserReadLists",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(users_profile_list.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(users_profile_list.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = [
            ...state.entities.filter(record => record.id !== action.payload.id),
            action.payload
          ]
          state.api.loading = "idle"
        }
      })
      .addCase(users_profile_list.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
  }
})
export default { users_profile_list, slice: paginatedUserReadListsSlice }

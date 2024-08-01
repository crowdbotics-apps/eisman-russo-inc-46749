import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const users_role_list = createAsyncThunk(
  "roles/users_role_list",
  async payload => {
    const response = await apiService.users_role_list(payload)
    return response.data
  }
)
export const users_role_retrieve = createAsyncThunk(
  "roles/users_role_retrieve",
  async payload => {
    const response = await apiService.users_role_retrieve(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(users_role_list.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(users_role_list.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = action.payload
          state.api.loading = "idle"
        }
      })
      .addCase(users_role_list.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(users_role_retrieve.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(users_role_retrieve.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = [
            ...state.entities.filter(record => record.id !== action.payload.id),
            action.payload
          ]
          state.api.loading = "idle"
        }
      })
      .addCase(users_role_retrieve.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
  }
})
export default { users_role_list, users_role_retrieve, slice: rolesSlice }

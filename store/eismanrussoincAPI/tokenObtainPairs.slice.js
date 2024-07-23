import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const users_login_create = createAsyncThunk(
  "tokenObtainPairs/users_login_create",
  async payload => {
    const response = await apiService.users_login_create(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const tokenObtainPairsSlice = createSlice({
  name: "tokenObtainPairs",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(users_login_create.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(users_login_create.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities.push(action.payload)
          state.api.loading = "idle"
        }
      })
      .addCase(users_login_create.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
  }
})
export default { users_login_create, slice: tokenObtainPairsSlice }

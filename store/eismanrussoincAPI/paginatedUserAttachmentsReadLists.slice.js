import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const users_attachments_list = createAsyncThunk(
  "paginatedUserAttachmentsReadLists/users_attachments_list",
  async payload => {
    const response = await apiService.users_attachments_list(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const paginatedUserAttachmentsReadListsSlice = createSlice({
  name: "paginatedUserAttachmentsReadLists",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(users_attachments_list.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(users_attachments_list.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = [
            ...state.entities.filter(record => record.id !== action.payload.id),
            action.payload
          ]
          state.api.loading = "idle"
        }
      })
      .addCase(users_attachments_list.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
  }
})
export default {
  users_attachments_list,
  slice: paginatedUserAttachmentsReadListsSlice
}

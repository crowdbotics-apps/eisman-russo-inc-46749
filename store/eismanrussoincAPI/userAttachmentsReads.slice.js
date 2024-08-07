import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const users_attachments_retrieve = createAsyncThunk(
  "userAttachmentsReads/users_attachments_retrieve",
  async payload => {
    const response = await apiService.users_attachments_retrieve(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const userAttachmentsReadsSlice = createSlice({
  name: "userAttachmentsReads",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(users_attachments_retrieve.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(users_attachments_retrieve.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = [
            ...state.entities.filter(record => record.id !== action.payload.id),
            action.payload
          ]
          state.api.loading = "idle"
        }
      })
      .addCase(users_attachments_retrieve.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
  }
})
export default { users_attachments_retrieve, slice: userAttachmentsReadsSlice }

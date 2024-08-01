import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const ticketing_sub_activity_create = createAsyncThunk(
  "subActivities/ticketing_sub_activity_create",
  async payload => {
    const response = await apiService.ticketing_sub_activity_create(payload)
    return response.data
  }
)
export const ticketing_sub_activity_retrieve = createAsyncThunk(
  "subActivities/ticketing_sub_activity_retrieve",
  async payload => {
    const response = await apiService.ticketing_sub_activity_retrieve(payload)
    return response.data
  }
)
export const ticketing_sub_activity_update = createAsyncThunk(
  "subActivities/ticketing_sub_activity_update",
  async payload => {
    const response = await apiService.ticketing_sub_activity_update(payload)
    return response.data
  }
)
export const ticketing_sub_activity_partial_update = createAsyncThunk(
  "subActivities/ticketing_sub_activity_partial_update",
  async payload => {
    const response = await apiService.ticketing_sub_activity_partial_update(
      payload
    )
    return response.data
  }
)
export const ticketing_sub_activity_destroy = createAsyncThunk(
  "subActivities/ticketing_sub_activity_destroy",
  async payload => {
    const response = await apiService.ticketing_sub_activity_destroy(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const subActivitiesSlice = createSlice({
  name: "subActivities",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(ticketing_sub_activity_create.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_sub_activity_create.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities.push(action.payload)
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_sub_activity_create.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_sub_activity_retrieve.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_sub_activity_retrieve.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = [
            ...state.entities.filter(record => record.id !== action.payload.id),
            action.payload
          ]
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_sub_activity_retrieve.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_sub_activity_update.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_sub_activity_update.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.map(record =>
            record.id === action.payload.id ? action.payload : record
          )
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_sub_activity_update.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(
        ticketing_sub_activity_partial_update.pending,
        (state, action) => {
          if (state.api.loading === "idle") {
            state.api.loading = "pending"
          }
        }
      )
      .addCase(
        ticketing_sub_activity_partial_update.fulfilled,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.entities = state.entities.map(record =>
              record.id === action.payload.id ? action.payload : record
            )
            state.api.loading = "idle"
          }
        }
      )
      .addCase(
        ticketing_sub_activity_partial_update.rejected,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.api.error = action.error
            state.api.loading = "idle"
          }
        }
      )
      .addCase(ticketing_sub_activity_destroy.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_sub_activity_destroy.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.filter(
            record => record.id !== action.meta.arg?.id
          )
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_sub_activity_destroy.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
  }
})
export default {
  ticketing_sub_activity_create,
  ticketing_sub_activity_retrieve,
  ticketing_sub_activity_update,
  ticketing_sub_activity_partial_update,
  ticketing_sub_activity_destroy,
  slice: subActivitiesSlice
}

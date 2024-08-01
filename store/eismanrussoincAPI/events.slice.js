import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const ticketing_event_create = createAsyncThunk(
  "events/ticketing_event_create",
  async payload => {
    const response = await apiService.ticketing_event_create(payload)
    return response.data
  }
)
export const ticketing_event_retrieve = createAsyncThunk(
  "events/ticketing_event_retrieve",
  async payload => {
    const response = await apiService.ticketing_event_retrieve(payload)
    return response.data
  }
)
export const ticketing_event_update = createAsyncThunk(
  "events/ticketing_event_update",
  async payload => {
    const response = await apiService.ticketing_event_update(payload)
    return response.data
  }
)
export const ticketing_event_partial_update = createAsyncThunk(
  "events/ticketing_event_partial_update",
  async payload => {
    const response = await apiService.ticketing_event_partial_update(payload)
    return response.data
  }
)
export const ticketing_event_destroy = createAsyncThunk(
  "events/ticketing_event_destroy",
  async payload => {
    const response = await apiService.ticketing_event_destroy(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(ticketing_event_create.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_event_create.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities.push(action.payload)
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_event_create.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_event_retrieve.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_event_retrieve.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = [
            ...state.entities.filter(record => record.id !== action.payload.id),
            action.payload
          ]
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_event_retrieve.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_event_update.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_event_update.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.map(record =>
            record.id === action.payload.id ? action.payload : record
          )
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_event_update.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_event_partial_update.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_event_partial_update.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.map(record =>
            record.id === action.payload.id ? action.payload : record
          )
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_event_partial_update.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_event_destroy.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_event_destroy.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.filter(
            record => record.id !== action.meta.arg?.id
          )
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_event_destroy.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
  }
})
export default {
  ticketing_event_create,
  ticketing_event_retrieve,
  ticketing_event_update,
  ticketing_event_partial_update,
  ticketing_event_destroy,
  slice: eventsSlice
}

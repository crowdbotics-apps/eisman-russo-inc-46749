import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const ticketing_debris_create = createAsyncThunk(
  "debris/ticketing_debris_create",
  async payload => {
    const response = await apiService.ticketing_debris_create(payload)
    return response.data
  }
)
export const ticketing_debris_retrieve = createAsyncThunk(
  "debris/ticketing_debris_retrieve",
  async payload => {
    const response = await apiService.ticketing_debris_retrieve(payload)
    return response.data
  }
)
export const ticketing_debris_update = createAsyncThunk(
  "debris/ticketing_debris_update",
  async payload => {
    const response = await apiService.ticketing_debris_update(payload)
    return response.data
  }
)
export const ticketing_debris_partial_update = createAsyncThunk(
  "debris/ticketing_debris_partial_update",
  async payload => {
    const response = await apiService.ticketing_debris_partial_update(payload)
    return response.data
  }
)
export const ticketing_debris_destroy = createAsyncThunk(
  "debris/ticketing_debris_destroy",
  async payload => {
    const response = await apiService.ticketing_debris_destroy(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const debrisSlice = createSlice({
  name: "debris",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(ticketing_debris_create.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_debris_create.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities.push(action.payload)
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_debris_create.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_debris_retrieve.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_debris_retrieve.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = [
            ...state.entities.filter(record => record.id !== action.payload.id),
            action.payload
          ]
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_debris_retrieve.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_debris_update.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_debris_update.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.map(record =>
            record.id === action.payload.id ? action.payload : record
          )
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_debris_update.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_debris_partial_update.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_debris_partial_update.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.map(record =>
            record.id === action.payload.id ? action.payload : record
          )
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_debris_partial_update.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_debris_destroy.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_debris_destroy.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.filter(
            record => record.id !== action.meta.arg?.id
          )
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_debris_destroy.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
  }
})
export default {
  ticketing_debris_create,
  ticketing_debris_retrieve,
  ticketing_debris_update,
  ticketing_debris_partial_update,
  ticketing_debris_destroy,
  slice: debrisSlice
}

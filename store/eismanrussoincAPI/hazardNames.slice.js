import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const ticketing_hazard_name_create = createAsyncThunk(
  "hazardNames/ticketing_hazard_name_create",
  async payload => {
    const response = await apiService.ticketing_hazard_name_create(payload)
    return response.data
  }
)
export const ticketing_hazard_name_retrieve = createAsyncThunk(
  "hazardNames/ticketing_hazard_name_retrieve",
  async payload => {
    const response = await apiService.ticketing_hazard_name_retrieve(payload)
    return response.data
  }
)
export const ticketing_hazard_name_update = createAsyncThunk(
  "hazardNames/ticketing_hazard_name_update",
  async payload => {
    const response = await apiService.ticketing_hazard_name_update(payload)
    return response.data
  }
)
export const ticketing_hazard_name_partial_update = createAsyncThunk(
  "hazardNames/ticketing_hazard_name_partial_update",
  async payload => {
    const response = await apiService.ticketing_hazard_name_partial_update(
      payload
    )
    return response.data
  }
)
export const ticketing_hazard_name_destroy = createAsyncThunk(
  "hazardNames/ticketing_hazard_name_destroy",
  async payload => {
    const response = await apiService.ticketing_hazard_name_destroy(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const hazardNamesSlice = createSlice({
  name: "hazardNames",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(ticketing_hazard_name_create.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_hazard_name_create.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities.push(action.payload)
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_hazard_name_create.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_hazard_name_retrieve.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_hazard_name_retrieve.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = [
            ...state.entities.filter(record => record.id !== action.payload.id),
            action.payload
          ]
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_hazard_name_retrieve.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_hazard_name_update.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_hazard_name_update.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.map(record =>
            record.id === action.payload.id ? action.payload : record
          )
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_hazard_name_update.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(
        ticketing_hazard_name_partial_update.pending,
        (state, action) => {
          if (state.api.loading === "idle") {
            state.api.loading = "pending"
          }
        }
      )
      .addCase(
        ticketing_hazard_name_partial_update.fulfilled,
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
        ticketing_hazard_name_partial_update.rejected,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.api.error = action.error
            state.api.loading = "idle"
          }
        }
      )
      .addCase(ticketing_hazard_name_destroy.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_hazard_name_destroy.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.filter(
            record => record.id !== action.meta.arg?.id
          )
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_hazard_name_destroy.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
  }
})
export default {
  ticketing_hazard_name_create,
  ticketing_hazard_name_retrieve,
  ticketing_hazard_name_update,
  ticketing_hazard_name_partial_update,
  ticketing_hazard_name_destroy,
  slice: hazardNamesSlice
}

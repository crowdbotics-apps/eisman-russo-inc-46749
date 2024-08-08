import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const ticketing_rate_matrix_create = createAsyncThunk(
  "contractorRateMatrices/ticketing_rate_matrix_create",
  async payload => {
    const response = await apiService.ticketing_rate_matrix_create(payload)
    return response.data
  }
)
export const ticketing_rate_matrix_retrieve = createAsyncThunk(
  "contractorRateMatrices/ticketing_rate_matrix_retrieve",
  async payload => {
    const response = await apiService.ticketing_rate_matrix_retrieve(payload)
    return response.data
  }
)
export const ticketing_rate_matrix_update = createAsyncThunk(
  "contractorRateMatrices/ticketing_rate_matrix_update",
  async payload => {
    const response = await apiService.ticketing_rate_matrix_update(payload)
    return response.data
  }
)
export const ticketing_rate_matrix_partial_update = createAsyncThunk(
  "contractorRateMatrices/ticketing_rate_matrix_partial_update",
  async payload => {
    const response = await apiService.ticketing_rate_matrix_partial_update(
      payload
    )
    return response.data
  }
)
export const ticketing_rate_matrix_destroy = createAsyncThunk(
  "contractorRateMatrices/ticketing_rate_matrix_destroy",
  async payload => {
    const response = await apiService.ticketing_rate_matrix_destroy(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const contractorRateMatricesSlice = createSlice({
  name: "contractorRateMatrices",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(ticketing_rate_matrix_create.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_rate_matrix_create.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities.push(action.payload)
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_rate_matrix_create.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_rate_matrix_retrieve.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_rate_matrix_retrieve.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = [
            ...state.entities.filter(record => record.id !== action.payload.id),
            action.payload
          ]
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_rate_matrix_retrieve.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_rate_matrix_update.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_rate_matrix_update.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.map(record =>
            record.id === action.payload.id ? action.payload : record
          )
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_rate_matrix_update.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(
        ticketing_rate_matrix_partial_update.pending,
        (state, action) => {
          if (state.api.loading === "idle") {
            state.api.loading = "pending"
          }
        }
      )
      .addCase(
        ticketing_rate_matrix_partial_update.fulfilled,
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
        ticketing_rate_matrix_partial_update.rejected,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.api.error = action.error
            state.api.loading = "idle"
          }
        }
      )
      .addCase(ticketing_rate_matrix_destroy.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_rate_matrix_destroy.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.filter(
            record => record.id !== action.meta.arg?.id
          )
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_rate_matrix_destroy.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
  }
})
export default {
  ticketing_rate_matrix_create,
  ticketing_rate_matrix_retrieve,
  ticketing_rate_matrix_update,
  ticketing_rate_matrix_partial_update,
  ticketing_rate_matrix_destroy,
  slice: contractorRateMatricesSlice
}

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const ticketing_truck_type_create = createAsyncThunk(
  "truckTypes/ticketing_truck_type_create",
  async payload => {
    const response = await apiService.ticketing_truck_type_create(payload)
    return response.data
  }
)
export const ticketing_truck_type_retrieve = createAsyncThunk(
  "truckTypes/ticketing_truck_type_retrieve",
  async payload => {
    const response = await apiService.ticketing_truck_type_retrieve(payload)
    return response.data
  }
)
export const ticketing_truck_type_update = createAsyncThunk(
  "truckTypes/ticketing_truck_type_update",
  async payload => {
    const response = await apiService.ticketing_truck_type_update(payload)
    return response.data
  }
)
export const ticketing_truck_type_partial_update = createAsyncThunk(
  "truckTypes/ticketing_truck_type_partial_update",
  async payload => {
    const response = await apiService.ticketing_truck_type_partial_update(
      payload
    )
    return response.data
  }
)
export const ticketing_truck_type_destroy = createAsyncThunk(
  "truckTypes/ticketing_truck_type_destroy",
  async payload => {
    const response = await apiService.ticketing_truck_type_destroy(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const truckTypesSlice = createSlice({
  name: "truckTypes",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(ticketing_truck_type_create.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_truck_type_create.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities.push(action.payload)
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_truck_type_create.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_truck_type_retrieve.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_truck_type_retrieve.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = [
            ...state.entities.filter(record => record.id !== action.payload.id),
            action.payload
          ]
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_truck_type_retrieve.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_truck_type_update.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_truck_type_update.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.map(record =>
            record.id === action.payload.id ? action.payload : record
          )
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_truck_type_update.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_truck_type_partial_update.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(
        ticketing_truck_type_partial_update.fulfilled,
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
        ticketing_truck_type_partial_update.rejected,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.api.error = action.error
            state.api.loading = "idle"
          }
        }
      )
      .addCase(ticketing_truck_type_destroy.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(ticketing_truck_type_destroy.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.filter(
            record => record.id !== action.meta.arg?.id
          )
          state.api.loading = "idle"
        }
      })
      .addCase(ticketing_truck_type_destroy.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
  }
})
export default {
  ticketing_truck_type_create,
  ticketing_truck_type_retrieve,
  ticketing_truck_type_update,
  ticketing_truck_type_partial_update,
  ticketing_truck_type_destroy,
  slice: truckTypesSlice
}

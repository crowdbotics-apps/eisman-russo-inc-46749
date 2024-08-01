import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "./api"
export const users_profile_create = createAsyncThunk(
  "userReads/users_profile_create",
  async payload => {
    const response = await apiService.users_profile_create(payload)
    return response.data
  }
)
export const users_profile_retrieve = createAsyncThunk(
  "userReads/users_profile_retrieve",
  async payload => {
    const response = await apiService.users_profile_retrieve(payload)
    return response.data
  }
)
export const users_profile_update = createAsyncThunk(
  "userReads/users_profile_update",
  async payload => {
    const response = await apiService.users_profile_update(payload)
    return response.data
  }
)
export const users_profile_partial_update = createAsyncThunk(
  "userReads/users_profile_partial_update",
  async payload => {
    const response = await apiService.users_profile_partial_update(payload)
    return response.data
  }
)
export const users_profile_destroy = createAsyncThunk(
  "userReads/users_profile_destroy",
  async payload => {
    const response = await apiService.users_profile_destroy(payload)
    return response.data
  }
)
export const users_profile_change_password_create = createAsyncThunk(
  "userReads/users_profile_change_password_create",
  async payload => {
    const response = await apiService.users_profile_change_password_create(
      payload
    )
    return response.data
  }
)
export const users_profile_details_retrieve = createAsyncThunk(
  "userReads/users_profile_details_retrieve",
  async payload => {
    const response = await apiService.users_profile_details_retrieve(payload)
    return response.data
  }
)
const initialState = { entities: [], api: { loading: "idle", error: null } }
const userReadsSlice = createSlice({
  name: "userReads",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(users_profile_create.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(users_profile_create.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities.push(action.payload)
          state.api.loading = "idle"
        }
      })
      .addCase(users_profile_create.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(users_profile_retrieve.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(users_profile_retrieve.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = [
            ...state.entities.filter(record => record.id !== action.payload.id),
            action.payload
          ]
          state.api.loading = "idle"
        }
      })
      .addCase(users_profile_retrieve.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(users_profile_update.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(users_profile_update.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.map(record =>
            record.id === action.payload.id ? action.payload : record
          )
          state.api.loading = "idle"
        }
      })
      .addCase(users_profile_update.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(users_profile_partial_update.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(users_profile_partial_update.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.map(record =>
            record.id === action.payload.id ? action.payload : record
          )
          state.api.loading = "idle"
        }
      })
      .addCase(users_profile_partial_update.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(users_profile_destroy.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(users_profile_destroy.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = state.entities.filter(
            record => record.id !== action.meta.arg?.id
          )
          state.api.loading = "idle"
        }
      })
      .addCase(users_profile_destroy.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
      .addCase(
        users_profile_change_password_create.pending,
        (state, action) => {
          if (state.api.loading === "idle") {
            state.api.loading = "pending"
          }
        }
      )
      .addCase(
        users_profile_change_password_create.fulfilled,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.entities.push(action.payload)
            state.api.loading = "idle"
          }
        }
      )
      .addCase(
        users_profile_change_password_create.rejected,
        (state, action) => {
          if (state.api.loading === "pending") {
            state.api.error = action.error
            state.api.loading = "idle"
          }
        }
      )
      .addCase(users_profile_details_retrieve.pending, (state, action) => {
        if (state.api.loading === "idle") {
          state.api.loading = "pending"
        }
      })
      .addCase(users_profile_details_retrieve.fulfilled, (state, action) => {
        if (state.api.loading === "pending") {
          state.entities = [
            ...state.entities.filter(record => record.id !== action.payload.id),
            action.payload
          ]
          state.api.loading = "idle"
        }
      })
      .addCase(users_profile_details_retrieve.rejected, (state, action) => {
        if (state.api.loading === "pending") {
          state.api.error = action.error
          state.api.loading = "idle"
        }
      })
  }
})
export default {
  users_profile_create,
  users_profile_retrieve,
  users_profile_update,
  users_profile_partial_update,
  users_profile_destroy,
  users_profile_change_password_create,
  users_profile_details_retrieve,
  slice: userReadsSlice
}

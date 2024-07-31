import { combineReducers, configureStore } from "@reduxjs/toolkit"
import ezDebriApp from "./reducers/AppReducer"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"
import { localStorage } from "../utils/Storage"

const persistConfig = {
  key: "root",
  version: 1,
  storage: localStorage
}

const reducers = combineReducers({
  appReducer: ezDebriApp
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)

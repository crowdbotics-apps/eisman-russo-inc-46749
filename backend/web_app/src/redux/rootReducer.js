import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
//----------------------- Importing all the reducers -----------------------//
import authReducer from "./slices/auth";


//----------------------- Combining all the reducers -----------------------//

const loginDataPersist = {
    key: "login-persist",
    storage,
    keyPrefix: "redux-",
    whitelist: ["loginResponse"],
};

const rootReducer = combineReducers({
    auth: persistReducer(loginDataPersist, authReducer),
  });
  
  export { rootReducer };

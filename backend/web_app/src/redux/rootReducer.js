import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
//----------------------- Importing all the reducers -----------------------//
import authReducer from "./slices/auth";
import rolesReducer from "./slices/roles";


//----------------------- Combining all the reducers -----------------------//

const loginDataPersist = {
    key: "login-persist",
    storage,
    keyPrefix: "redux-",
    whitelist: ["loginResponse"],
};

const rolesDataPersist = {
    key: "roles-persist",
    storage,
    keyPrefix: "redux-",
    whitelist: ["roles"],
};

const rootReducer = combineReducers({
    auth: persistReducer(loginDataPersist, authReducer),
    roles: persistReducer(rolesDataPersist, rolesReducer),
  });
  
  export { rootReducer };

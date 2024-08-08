import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
//----------------------- Importing all the reducers -----------------------//
import authReducer from "./slices/auth";
import rolesReducer from "./slices/roles";
import profileReducer from "./slices/profile";


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

const profileDataPersist = {
    key: "profileData-persist",
    storage,
    keyPrefix: "redux-",
    whitelist: ["profileData"],
};

const rootReducer = combineReducers({
    auth: persistReducer(loginDataPersist, authReducer),
    roles: persistReducer(rolesDataPersist, rolesReducer),
    profileData: persistReducer(profileDataPersist, profileReducer),
  });
  
  export { rootReducer };

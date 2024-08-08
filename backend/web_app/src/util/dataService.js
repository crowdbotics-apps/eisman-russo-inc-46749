import { main_api } from "../api/axiosHelper";
import { adminAPIsEndPoints } from "../constants/apiEndPoints";
import { pushNotification } from "./notification";


//----------------------- Get User List -----------------------//

export const getUserList = async (page) => {
    try {
        const response = await main_api.get(`${adminAPIsEndPoints.LIST_USER}?page=${page}`);
        return response.data.results;
    } catch (error) {
        pushNotification(error.response.data.detail, "error");
    }
};


//----------------------- Add User -----------------------//

export const addUser = async (data) => {
    try {
        const response = await main_api.post(adminAPIsEndPoints.CREATE_USER, data);
        if (response.status === 201) {
            pushNotification("User added successfully", "success");
        }
    } catch (error) {
        pushNotification(error.response.data.detail, "error");
    }
};


//----------------------- Update User -----------------------//

export const updateUser = async (id, data) => {
    try {
        const response = await main_api.put(adminAPIsEndPoints.UPDATE_USER(id), data);
        if (response.status === 200) {
            pushNotification("User updated successfully", "success");
            
        }
    } catch (error) {
        pushNotification(error.response.data.detail, "error");
    }
};


//----------------------- Change Password -----------------------//


export const changePassword = async (id, data) => {
    try {
        const response = await main_api.put(adminAPIsEndPoints.CHANGE_PASSWORD(id), data);
        if (response.status === 200) {
            pushNotification("Password updated successfully", "success");
            
        }
    } catch (error) {
        pushNotification(error.response.data.detail, "error");
    }
};

//----------------------- Get User Role List -----------------------//

export const getUserRoleList = async () => {
    try {
      const response = await main_api.get(adminAPIsEndPoints.LIST_ROLES);
      return response.data.results;
    } catch (error) {
      pushNotification("Error while fetching user roles", error);
      return []; 
    }
  };




//----------------------- Get User Position List -----------------------//

export const getUserPositionList = async (query) => {
    try {
        const response = await main_api.get(adminAPIsEndPoints.LIST_POSITION(query));
        return response.data.results;
    } catch (error) {
        pushNotification("Error while fetching user positions", error);
        return []; 
    }
};


//----------------------- Add User Position -----------------------//

export const addUserPosition = async (data) => {
    try {
        const response = await main_api.post(adminAPIsEndPoints.ADD_POSITION, data);
        if (response.status === 201) {
            pushNotification("User position added successfully", "success");
        }
    } catch (error) {
            pushNotification(error.response.data.detail, "error");
    }
};


//----------------------- Update User Position -----------------------//

export const updateUserPosition = async (id, data) => {
    try {
        
        const response = await main_api.put(adminAPIsEndPoints.UPDATE_POSITION(id), data);
        
        if (response.status === 200) {
            pushNotification("User position updated successfully", "success");
        }
    } catch (error) {
        
        pushNotification(error.response.data.detail, "error");
    }
};


//----------------------- Delete User Position -----------------------//

export const deleteUserPosition = async (id) => {
    try {
        const response = await main_api.delete(adminAPIsEndPoints.DELETE_POSITION(id));
        pushNotification("Position deleted successfully", response);
    } catch (error) {
        pushNotification("Error while deleting user position", error);
    }
};

import { main_api } from "../api/axiosHelper";
import { adminAPIsEndPoints } from "../constants/apiEndPoints";
import { pushNotification } from "./notification";


//----------------------- Get User List -----------------------//

export const getUserList = async (page) => {
    try {
        const response = await main_api.get(`${adminAPIsEndPoints.LIST_USER}?page=${page}`);
        return response.data.results;
    } catch (error) {
        pushNotification("Error while fetching users", error);
    }
};


//----------------------- Add User -----------------------//

export const addUser = async (data) => {
    try {
        const response = await main_api.post(adminAPIsEndPoints.CREATE_USER, data);
        pushNotification("User added successfully", response);
    } catch (error) {
        pushNotification("Error while adding user", error);
    }
};


//----------------------- Update User -----------------------//

export const updateUser = async (id, data) => {
    try {
        const response = await main_api.put(adminAPIsEndPoints.UPDATE_USER(id), data);
        pushNotification("User updated successfully", response);
    } catch (error) {
        pushNotification("Error while updating user", error);
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
        return response;
    } catch (error) {
            pushNotification(error, "error");
    }
};


//----------------------- Update User Position -----------------------//

export const updateUserPosition = async (id, data) => {
    try {
        const response = await main_api.put(adminAPIsEndPoints.UPDATE_POSITION(id), data);
        return response;
    } catch (error) {
        pushNotification(error, "error");
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

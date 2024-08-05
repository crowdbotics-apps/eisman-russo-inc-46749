export const adminAPIsEndPoints = {
  //----------------------- Auth APIs -----------------------//
  
  LOGIN: "/users/login/",
  RESET_PASSWORD: "",
  CREATE_USER: "/users/profile/",
  LIST_USER: "/users/profile/",
  UPDATE_USER: (id) => `/users/profile/${id}/`,
  CHANGE_PASSWORD: "/users/profile/change_password/",

  //----------------------- User Role APIs -----------------------//

  LIST_ROLES: "/users/role/",

  //----------------------- User Position APIs ---------------------//

  ADD_POSITION: "/users/position/",
  LIST_POSITION: (query) => `/users/position/?${query}`,
  UPDATE_POSITION: (id) => `/users/position/${id}/`,
  DELETE_POSITION: (id) => `/users/position/?${id}/`,

  //----------------------- Debris Type APIs -----------------------//

  ADD_DEBRIS: "/ticketing/debris/",
  LIST_DEBRIS: (query) => `/ticketing/debris/?${query}`,
  UPDATE_DEBRIS: (id) => `/ticketing/debris/${id}/`,
  DELETE_DEBRIS: (id) => `/ticketing/debris/${id}/`,

  //----------------------- Truck Type APIs -----------------------//

  ADD_TRUCK_TYPE: "/ticketing/truck-type/",
  LIST_TRUCK_TYPE: (query) => `/ticketing/truck-type/?${query}`,
  UPDATE_TRUCK_TYPE: (id) => `/ticketing/truck-type/${id}/`,
  DELETE_TRUCK_TYPE: (id) => `/ticketing/truck-type/${id}/`,

  //----------------------- Sub-Activity APIs -----------------------//

  ADD_SUB_ACTIVITY: "/ticketing/sub-activity/",
  LIST_SUB_ACTIVITY: (query) => `/ticketing/sub-activity/?${query}`,
  UPDATE_SUB_ACTIVITY: (id) => `/ticketing/sub-activity/${id}/`,
  DELETE_SUB_ACTIVITY: (id) => `/ticketing/sub-activity/${id}/`,
};


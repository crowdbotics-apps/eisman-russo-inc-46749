export const adminAPIsEndPoints = {
  //----------------------- Auth APIs -----------------------//
  
  LOGIN: "/users/login/",
  RESET_PASSWORD: "",
  CREATE_USER: "/users/profile/",
  LIST_USER: "/users/profile/",
  UPDATE_USER: (id) => `/users/profile/${id}/`,
  CHANGE_PASSWORD: "/users/profile/change_password/",
  USER_DETAILS: "/users/profile/details/",

  //----------------------- User Role APIs -----------------------//

  LIST_ROLES: "/users/role/",

  //----------------------- User Position APIs ---------------------//

  ADD_POSITION: "/users/position/",
  LIST_POSITION: (query) => `/users/position/?${query}`,
  UPDATE_POSITION: (id) => `/users/position/${id}/`,
  DELETE_POSITION: (id) => `/users/position/?${id}/`,

  //----------------------- Debris Type APIs -----------------------//

  ADD_DEBRIS: "/administration/debris/",
  LIST_DEBRIS: (query) => `/administration/debris/?${query}`,
  UPDATE_DEBRIS: (id) => `/administration/debris/${id}/`,
  DELETE_DEBRIS: (id) => `/administration/debris/${id}/`,

  //----------------------- Truck Type APIs -----------------------//

  ADD_TRUCK_TYPE: "/administration/truck-type/",
  LIST_TRUCK_TYPE: (query) => `/administration/truck-type/?${query}`,
  UPDATE_TRUCK_TYPE: (id) => `/administration/truck-type/${id}/`,
  DELETE_TRUCK_TYPE: (id) => `/administration/truck-type/${id}/`,

  //----------------------- Sub-Activity APIs -----------------------//

  ADD_SUB_ACTIVITY: "/administration/sub-activity/",
  LIST_SUB_ACTIVITY: (query) => `/administration/sub-activity/?${query}`,
  UPDATE_SUB_ACTIVITY: (id) => `/administration/sub-activity/${id}/`,
  DELETE_SUB_ACTIVITY: (id) => `/administration/sub-activity/${id}/`,
};


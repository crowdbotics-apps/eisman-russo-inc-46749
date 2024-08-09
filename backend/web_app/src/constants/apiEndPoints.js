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

  //----------------------- Hazard Type APIs -----------------------//

  ADD_HAZARD_TYPE: "/administration/hazard-type/",
  LIST_HAZARD_TYPE: (query) => `/administration/hazard-type/?${query}`,
  UPDATE_HAZARD_TYPE: (id) => `/administration/hazard-type/${id}/`,
  DELETE_HAZARD_TYPE: (id) => `/administration/hazard-type/${id}/`,

  //----------------------- Hazard Name APIs -----------------------//

  ADD_HAZARD_NAME: "/administration/hazard-name/",
  LIST_HAZARD_NAME: (query) => `/administration/hazard-name/?${query}`,
  UPDATE_HAZARD_NAME: (id) => `/administration/hazard-name/${id}/`,
  DELETE_HAZARD_NAME: (id) => `/administration/hazard-name/${id}/`,

  //----------------------- Menu Setup APIs -----------------------//

  ADD_MENU: "/users/menu/",
  LIST_MENU: (query) => `/users/menu/?${query}`,
  UPDATE_MENU: (id) => `/users/menu/${id}/`,
  DELETE_MENU: (id) => `/users/menu/${id}/`,

  //----------------------- Event Management APIs -----------------------//

  ADD_EVENT: "/ticketing/event/",
  LIST_EVENT: (query) => `/ticketing/event/?${query}`,
  UPDATE_EVENT: (id) => `/ticketing/event/${id}/`,
  DELETE_EVENT: (id) => `/ticketing/event/${id}/`,

  //----------------------- Project Management APIs -----------------------//

  ADD_PROJECT: "/ticketing/project/",
  LIST_PROJECT: (query) => `/ticketing/project/?${query}`,
  UPDATE_PROJECT: (id) => `/ticketing/project/${id}/`,
  DELETE_PROJECT: (id) => `/ticketing/project/${id}/`,

};


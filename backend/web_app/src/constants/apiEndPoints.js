export const adminAPIsEndPoints = {
  //----------------------- Auth APIs -----------------------//
  
  LOGIN: "/users/login/",
  RESET_PASSWORD: "",
  CREATE_USER: "/users/profile/",
  LIST_USER: "/users/profile/",
  UPDATE_USER: (id) => `/users/profile/?${id}/`,

  //----------------------- User Role APIs -----------------------//

  LIST_ROLES: "/users/role/",

  //----------------------- User Position APIs -----------------------//

  ADD_POSITION: "/users/position/",
  LIST_POSITION: (query) => `/users/position/?${query}`,
  UPDATE_POSITION: (id) => `/users/position/?id=${id}/`,
  DELETE_POSITION: (id) => `/users/position/?${id}/`,

  
};


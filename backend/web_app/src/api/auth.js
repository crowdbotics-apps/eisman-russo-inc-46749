export const userHasValidToken = () => {
  const token = getJWTToken();
  return !!token;
};

export const setJWTToken = (token) => {
  window.localStorage.setItem("token", token);
};

export const setUserId = (id) => {
  window.localStorage.setItem("userId", id);
};

export const getJWTToken = () => {
  return window.localStorage.getItem("token");
};

export const getUserId = () => {
  return window.localStorage.getItem("userId");
};

export const removeJWTToken = () => {
  window.localStorage.removeItem("token");
};

export const setRefreshToken = (token) => {
  window.localStorage.setItem("refreshToken", token);
};

export const getRefreshToken = () => {
  return window.localStorage.getItem("refreshToken");
};

export const removeRefreshToken = () => {
  window.localStorage.removeItem("refreshToken");
};

export const setlocalStorage = (name, value) => {
  window.localStorage.setItem(name, value);
};

export const getlocalStorage = (name) => {
  window.localStorage.getItem(name);
};

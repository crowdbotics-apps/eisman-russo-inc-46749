import { API } from "./Interceptor";

export const POST = async (endPoint, body) => {
  try {
    return await API.post(endPoint, body);
  } catch (error) {
    throw error?.response;
  }
};

export const GET = async endPoint => {
  try {
    return await API.get(endPoint);
  } catch (error) {
    throw error?.response;
  }
};

export const PUT = async () => {
  try {
    return await API.put();
  } catch (error) {
    throw error?.response;
  }
};

export const DELETE = async () => {
  try {
    return await API.delete();
  } catch (error) {
    throw error?.response;
  }
};

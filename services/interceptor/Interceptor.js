import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { store } from "../../redux/Store";
import { Constants } from "../../utils/constants";
import DeviceInfo from "react-native-device-info";
import Toast from "../../components/core/toast/Toast";
import { appActions } from "../../redux/actions/AppAction";
import { logoutUserFromInterceptor } from "../../utils/NavigationUtils";

const API = axios.create({
  baseURL: Constants.BASE_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    isMobile: true
  }
});

API.interceptors.request.use(
  async config => {
    const isConnected = await checkInternetConnection();
    if (!isConnected) {
      return Promise.reject({ response: { status: Constants.NETWORK_ERROR } });
    }

    const props = config.headers;
    if (props?.contentType === "multipart/form-data") {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    const accessToken = store.getState()?.appReducer?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    const deviceId = await getDeviceID();
    if (deviceId) {
      config.headers["deviceId"] = deviceId;
      // config.headers["deviceId"] = "0x00123";
    }
    console.log("API Call:", `${config?.baseURL}${config.url}`);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error?.response?.config?.url.includes("login?success")) {
      return Promise.reject(error);
    } else if (error?.response?.status === Constants.UN_AUTHORIZED) {
      Toast.errorList("Error", ["Unauthorized access"]);
      store.dispatch(
        appActions.setAccessToken({
          accessToken: null
        })
      );
      logoutUserFromInterceptor();
      return;
    }
    return Promise.reject(error);
  }
);

export const checkInternetConnection = async () => {
  const netInfo = await NetInfo.fetch();
  if (netInfo.isConnected) {
    if (netInfo.type !== "none" || netInfo.type !== "unknown") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const getDeviceID = async () => {
  const deviceId = await DeviceInfo.getUniqueId();
  console.log("device id", deviceId);
  return deviceId;
};

export { API };

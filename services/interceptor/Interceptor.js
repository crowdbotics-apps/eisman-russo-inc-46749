import NetInfo from "@react-native-community/netinfo"
import axios from "axios"
import { store } from "../../redux/Store"
import { Constants } from "../../utils/constants"

const API = axios.create({
  baseURL: Constants.BASE_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    isMobile: true
  },
  timeout: 30000,
  timeoutErrorMessage: "Request Timeout"
})

API.interceptors.request.use(
  async config => {
    const isConnected = await checkInternetConnection()
    if (!isConnected) {
      return Promise.reject({ response: { status: Constants.NETWORK_ERROR } })
    }

    const props = config.headers
    if (props?.contentType === "multipart/form-data") {
      config.headers["Content-Type"] = "multipart/form-data"
    }

    const accessToken = store.getState()?.appReducer?.accessToken
    // if (accessToken) {
    //   config.headers.Authorization = `Bearer ${accessToken}`
    // }
    const deviceId = store.getState()?.appReducer?.deviceId
    if (deviceId) {
      // config.headers["deviceId"] = deviceId;
      console.log("deviceID", deviceId)
      config.headers["deviceId"] = "0x00123"
    }
    console.log("API Call:", `${config?.baseURL}${config.url}`)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

API.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error?.response?.config?.url.includes("login?success")) {
      return Promise.reject(error)
    } else if (error?.response?.status === Constants.UN_AUTHORIZED) {
      console.log("logout user")
      //   logOutUser()
      //   setTimeout(() => {
      // ToastMessage("error", "Unauthorized access.")
      //   }, 200)
      //   return
    }
    return Promise.reject(error)
  }
)

export const checkInternetConnection = async () => {
  const netInfo = await NetInfo.fetch()
  if (netInfo.isConnected) {
    if (netInfo.type !== "none" || netInfo.type !== "unknown") {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export { API }

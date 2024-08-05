import Toast from "../components/core/toast/Toast";
import { store } from "../redux/Store";

export function authenticateUser(user) {
  const credentials = store.getState()?.appReducer?.credentials;
  const email = credentials?.email;
  const password = credentials?.password;
  const deviceId = store.getState()?.appReducer?.userProfile?.device_id;
  console.log("email",email)
  if (!email) {
    Toast.errorList("Error", [
      "Login first in Online mode to sync data"
    ]);
    return false;
  }

  if (user.deviceId?.trim() !== deviceId?.trim()) {
    Toast.errorList("Error", [
      "Your account is not associated with this Device ID"
    ]);
    return false;
  }
  if (
    user?.email?.trim()?.toLowerCase() !== email?.trim()?.toLowerCase() ||
    user.password?.trim()?.toLowerCase() !== password?.trim()?.toLowerCase()
  ) {
    Toast.errorList("Error", [
      "No active account found with the given credentials"
    ]);
    return false;
  }
  return true;
}

export const capitalizeFirstLetters = str => {
  console.log(str);
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

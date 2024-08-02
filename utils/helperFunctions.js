import Toast from "../components/core/toast/Toast";
import { store } from "../redux/Store";

export function authenticateUser(user) {
  const credentials = store.getState()?.appReducer?.credentials;
  const email = credentials?.email;
  const password = credentials?.password;
  const deviceId = store.getState()?.appReducer?.userProfile?.deviceId;

  if (user?.email !== email || user.password !== password) {
    Toast.errorList("Error", [
      "No active account found with the given credentials"
    ]);
    return false;
  }

  if (user.deviceId !== deviceId) {
    Toast.errorList("Error", ["Device id did not matched"]);
    return false;
  }
  return true;
}

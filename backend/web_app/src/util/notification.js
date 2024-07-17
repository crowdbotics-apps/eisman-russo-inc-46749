import { toast } from "react-hot-toast";

let notificationShow = undefined;
export function pushNotification(msg, type = "success", timer) {
  const options = {
    duration: timer || 3000,
    position: "top-center",
    autoClose: false,
  };

  switch (type) {
    case "info":
      notificationShow = toast(msg, { ...options, type: "info" });
      break;
    case "success":
      notificationShow = toast.success(msg, options);
      break;
    case "warning":
      notificationShow = toast.warning(msg, options);
      break;
    case "error":
      notificationShow = toast.error(msg, { ...options, id: "error" });
      break;
    default:
      break;
  }

  return notificationShow;
}

import jwt_decode from "jwt-decode";
import CookieUtil from "./cookieUtil";

const is_date = (date) => {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    return true;
  }
  return false;
};

const getTimeFromDate = (date) => {
  let dateObj = is_date(date) ? date : new Date(date);
  let hour = dateObj.getHours();
  let minute = dateObj.getMinutes();
  let meridian = "am";
  if (hour > 12) {
    hour -= 12;
    meridian = "pm";
  }
  if (hour === 0) {
    hour = 12;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  return hour + ":" + minute + " " + meridian;
};

const getUserId = () => {
  // return getUserId()
  // let token = CookieUtil.getCookie('access');
  // if (token) {
  //   let decodedToken = jwt_decode(token);
  //   return decodedToken.userId;
  // }
  // return "";
};


const convertToTitleCaseWithSpaces = (text) =>
  text && text.split("_").map((word) => word[0].toLocaleUpperCase()+word.slice(1)).join(" ")

const convertObjToSelectOptionsAntd = (obj) => {
  return obj.map(item => ({label: item.name, value: item.id}));
}

const formattedTimeSlots = (timeSlots) => {
  return timeSlots.map(slot => {
    let label = slot.name;
    if (slot.start_time && slot.end_time) {
        const startTime = new Date(`2000-01-01T${slot.start_time}`);
        const endTime = new Date(`2000-01-01T${slot.end_time}`);
        const startHour = startTime.getHours();
        const endHour = endTime.getHours();
        const startLabel = startHour > 12 ? `${startHour - 12}PM` : `${startHour}AM`;
        const endLabel = endHour > 12 ? `${endHour - 12}PM` : `${endHour}AM`;
        label = `${slot.name} ${startLabel}-${endLabel}`;
    }
    return {
        label,
        value: slot.id
    };
  });
};

function capitalizeFirstLetter(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const convertToDayNames=(weekdays) => {
  weekdays.sort((a, b) => a - b);
  // Array of day names
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Map each number to its corresponding day name
  const dayNames = weekdays.map(day => daysOfWeek[day]);

  return dayNames;
}

export function checkPermission(array, codeName) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].code_name === codeName) {
      return true;
    }
  }
  return false;
}

export function logOut() {
  localStorage.removeItem("redux-newChatSystem");
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("company");
  localStorage.removeItem("loggedAs");

}


const CommonUtil = {
  getTimeFromDate: getTimeFromDate,
  getUserId: getUserId,
  convertToTitleCaseWithSpaces: convertToTitleCaseWithSpaces,
  convertObjToSelectOptionsAntd: convertObjToSelectOptionsAntd,
  convertToDayNames: convertToDayNames,
  formattedTimeSlots: formattedTimeSlots,
  capitalizeFirstLetter: capitalizeFirstLetter,
  checkPermission,
};

export default CommonUtil;

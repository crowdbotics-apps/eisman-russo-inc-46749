import * as Yup from "yup";
import { ValidationMessageList } from "./constants";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email address (e.g., user@example.com)."
    )
    .trim()
    .max(200, ({ max }) => `Email must be less than ${max} characters`)
    .email("Please enter a valid email address (e.g., user@example.com).")
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .max(30, ({ max }) => `Password must be less than ${max} characters`)
    .matches(/\w*[a-z]\w*/, "Passwords must have at least one lowercase")
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required")
});
export const resetPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email address"
    )
    .trim()
    .max(200, ({ max }) => `Email must be less than ${max} characters`)
    .email("Please enter a valid email address")
    .required("Email is required")
});

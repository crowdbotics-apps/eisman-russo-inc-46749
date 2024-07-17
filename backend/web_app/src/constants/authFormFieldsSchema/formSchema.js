import * as Yup from "yup";
//
export const forgotPasswordFormSchema = Yup.object().shape({
  email: Yup.string().email("Please enter valid Email ID").required("Email is required"),
});

export const loginFormSchema = Yup.object().shape({
  email: Yup.string().email("Please enter valid Email ID").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be at most 30 characters"),
});

export const resetPasswordSchema = Yup.object().shape({
  new_password1: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters")
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[\s\S]{8,100}$/,
      "Password must include at least one capital alphabet, one numeric value, and one special character",
    )
    .test("notEqual", "New password must be different from the current password", function (value) {
      const { currentPassword } = this.parent;
      return value !== currentPassword;
    }),

  new_password2: Yup.string()
    .oneOf([Yup.ref("new_password1"), null], "Passwords must match")
    .required("Password confirmation is required")
    .test("notEqual", "Confirmation password must be different from the current password", function (value) {
      const { currentPassword } = this.parent;
      return value !== currentPassword;
    }),
});

export const changePasswordSchema = Yup.object().shape({
  new_password1: Yup.string()
  .min(8, " ")
  .matches(/[A-Z]/, " ")
  .matches(/[a-z]/, " ")
  .matches(/[0-9]/, " ")
  .matches(/[!@#$%^&*()_+]/, " ")
  .required("Password is required")
  .test("notEqual", "New password must be different from the current password", function (value) {
      const { currentPassword } = this.parent;
      return value !== currentPassword;
    }),

  new_password2: Yup.string()
    .oneOf([Yup.ref("new_password1"), null], "Passwords must match")
    .required("Password confirmation is required")
    .test("notEqual", "Confirmation password must be different from the current password", function (value) {
      const { currentPassword } = this.parent;
      return value !== currentPassword;
    }),
});

export const addClientSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .nullable()
    .max(50, "Name must be at most 50 characters")
    .test("no-empty-spaces", "Username cannot contain only spaces", (value) => {
      const trimmedValue = value?.replace(/^\s+|\s+$/g, "");
      return trimmedValue !== "";
    })
    .required("Name is required"),
  phone_number: Yup.number()
    // .min(6, "Phone Number must be at least 6 characters")
    // .max(15, "Phone Number must be at most 15 characters")
    .nullable()
    .typeError("Phone Number must be a number")
    .positive("Phone Number must be a positive number"),
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is required")
    .test("no-empty-spaces", "Email cannot contain only spaces", (value) => {
      const trimmedValue = value?.replace(/^\s+|\s+$/g, "");
      return trimmedValue !== "";
    }),
  address: Yup.string()
    .min(3, "Address must be at least 3 characters")
    .max(255, "Address must be at most 255 characters")
    .required("Address is required")
    .test("no-empty-spaces", "Address cannot contain only spaces", (value) => {
      const trimmedValue = value?.replace(/^\s+|\s+$/g, "");
      return trimmedValue !== "";
    }),
  city: Yup.string()
    .min(3, "City must be at least 3 characters")
    .max(50, "City must be at most 50 characters")
    .test("no-empty-spaces", "City cannot contain only spaces", (value) => {
      const trimmedValue = value?.replace(/^\s+|\s+$/g, "");
      return trimmedValue !== "";
    }),
});

export const addStaffSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Staff Name must be at least 3 characters")
    .nullable()
    .max(50, "Staff Name must be at most 50 characters")
    .test("no-empty-spaces", "Staff name cannot contain only spaces", (value) => {
      const trimmedValue = value?.replace(/^\s+|\s+$/g, "");
      return trimmedValue !== "";
    })
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is required")
    .max(50, "Email must be at most 50 characters")
    .test("no-empty-spaces", "Email cannot contain only spaces", (value) => {
      const trimmedValue = value?.replace(/^\s+|\s+$/g, "");
      return trimmedValue !== "";
    }),
  address: Yup.string()
    .min(3, "Address must be at least 3 characters")
    .max(255, "Address must be at most 255 characters")
    .required("Address is required")
    .test("no-empty-spaces", "Address cannot contain only spaces", (value) => {
      const trimmedValue = value?.replace(/^\s+|\s+$/g, "");
      return trimmedValue !== "";
    }),  
  primary_phone_number: Yup.number().required("Primary Phone Number is required"),
  custom_rate: Yup.boolean(),
  type: Yup.string().required("Type is required"),

  by_hour: Yup.string().when("custom_rate", {
    is: true,
    then: Yup.string().required("When custom rate is enabled these fields are required"),
    otherwise: Yup.string(),
  }),

  hourly_rate: Yup.number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .when(["by_hour", "custom_rate"], {
      is: (byHour, customRate) => (byHour === "by_the_hour" || byHour === "both") && customRate === true,
      then: Yup.number().required("Hourly Rate is required"),
      otherwise: Yup.number().nullable(),
    }),

  // standard_rate: Yup.number()
  //   .transform((value) => (Number.isNaN(value) ? null : value))
  //   .nullable()
  //   .when(["by_hour", "custom_rate"], {
  //     is: (byHour, customRate) => (byHour === "by the Job" || byHour === "both") && customRate === true,
  //     then: Yup.number().required("Standard Rate is required"),
  //     otherwise: Yup.number().nullable(),
  //   }),
});

// import React from "react";
// import "./FormikInputFloating.css";
// import { FloatingLabel, Form } from "react-bootstrap";
// import { useField } from "formik";
// import styled from "styled-components";
// import { Button, Input, Space } from "antd";
// import { AimOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

// //
// const FormikInputFloating = ({ noBr, icon, label, suffix=false, className, placeHolder, passwordField, requiredField, address, setAddress, handleGeocode, setModalOpen, ...props }) => {
//   const [field, meta, helpers] = useField(props);
//   const error = meta.touched && meta.error ? true : false;

//   const handleBlur = () => {
//     helpers.setTouched(true);
//   };

//   function getStyles() {
//     return {
//       border: "1px solid red",
//       padding: "5px",
//     };
//   }

//   return (
//     <div className={className}>
//       <InputTextLabel className="d-flex">
//         {requiredField && <RequiredSign className="me-1">*</RequiredSign>}
//         <span>{label}</span>
//       </InputTextLabel>
//       {!label && !noBr && <br />}
//       <FloatingLabel controlId={props.Id} className={props.className} name={props.name}>
//         <>
//           {passwordField ? (
//             <Input.Password
//               {...field}
//               placeholder={placeHolder}
//               {...props}
//               onBlur={handleBlur}
//               style={{ ...(error ? getStyles() : ""), height: "40px" }}
//               iconRender={(visible) => (visible ? <EyeInvisibleOutlined /> : <EyeOutlined />)}
//             />
//           ) : (
//             suffix?
//             (<Input
//               value={address}
//               placeholder={placeHolder}
//               // onChange={(e) => setAddress(e.target.value)}
//               onBlur={handleGeocode}
//               suffix={<AimOutlined onClick={() => {
//                 handleGeocode();
//                 setModalOpen(true);
//               }} />}
//             />)
//             :
//             (<InputComponent
//               {...field}
//               placeholder={placeHolder}
//               {...props}
//               onBlur={handleBlur}
//               style={{ ...(error ? getStyles() : "") }}
//             />)
//           )}
//           {meta.touched && meta.error ? <div className="input-error-style">{meta.error}</div> : null}
//         </>
//       </FloatingLabel>
//     </div>
//   );
// };

// export default FormikInputFloating;

// const InputTextLabel = styled.span`
//   font-size: 12px;
//   color: #3b3b3b;
//   font-weight: 500;
//   line-height: 18px;
//   width: 100%;
// `;

// const InputComponent = styled.input`
//   width: ${(props) => props?.width || "100%"};
//   height: ${(props) => (props?.height ? props?.height : "40px")};
//   border: ${(props) => props.border ?? "1px solid rgb(214, 217, 225)"};
//   border-radius: 8px;
//   margin: ${(props) => props?.margin ?? "0"};
//   padding: 10px;
//   box-sizing: border-box;
//   outline: none;
//   font-family:
//     Helvetica Neue,
//     Arial;
//   font-style: normal;
//   font-weight: 400;
//   font-size: 14px;

//   line-height: 57px;
//   color: #000;
//   ::placeholder {
//     padding: 10px 0px; /* Adjust placeholder padding */
//   }
//   &:focus {
//     border-color: rgb(251, 207, 52); /* Change to your desired color */
//     box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2); /* Optional: Add box shadow */
//   }
// `;

// const InputError = styled.div`
//   color: #ff6565;
//   font-size: 12px;
//   position: absolute;
//   bottom: -20px; // Adjust this value as needed
//   left: 0;
// `;

// const RequiredSign = styled.div`
//   color: #ff4d4f;
//   font-size: 15px;
//   transform: translateY(2px);
//   font-weight: 400;
// `;



////==========================



import React from "react";
import "./FormikInputFloating.css";
import { FloatingLabel } from "react-bootstrap";
import { useField } from "formik";
import styled from "styled-components";
import { Input } from "antd";
import { AimOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const FormikInputFloating = ({ noBr, icon, label, suffix=false, className, placeHolder, passwordField, requiredField, handleGeocode, setModalOpen, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const error = meta.touched && meta.error ? true : false;

  const handleBlur = () => {
    helpers.setTouched(true);
    if (suffix) {
      handleGeocode();
    }
  };

  function getStyles() {
    return {
      border: "1px solid red",
      padding: "5px",
    };
  }

  return (
    <div className={className}>
      <InputTextLabel className="d-flex">
        {requiredField && <RequiredSign className="me-1">*</RequiredSign>}
        <span>{label}</span>
      </InputTextLabel>
      {!label && !noBr && <br />}
      <FloatingLabel controlId={props.id} className={props.className} name={props.name}>
        <>
          {passwordField ? (
            <Input.Password
              {...field}
              placeholder={placeHolder}
              {...props}
              onBlur={handleBlur}
              style={{ ...(error ? getStyles() : ""), height: "40px" }}
              iconRender={(visible) => (visible ? <EyeInvisibleOutlined /> : <EyeOutlined />)}
            />
          ) : (
            suffix ? (
              <Input
                {...field}
                placeholder={placeHolder}
                onChange={(e) => {
                  field.onChange(e);
                  props.setFieldValue(props.name, e.target.value); // Update Formik value
                }}
                onBlur={handleBlur}
                value={field.value} // Ensure the value is from Formik
                suffix={
                  <AimOutlined onClick={() => {
                    handleGeocode();
                    setModalOpen(true);
                  }} />
                }
              />
            ) : (
              <InputComponent
                {...field}
                placeholder={placeHolder}
                {...props}
                onBlur={handleBlur}
                style={{ ...(error ? getStyles() : "") }}
              />
            )
          )}
          {meta.touched && meta.error ? <div className="input-error-style">{meta.error}</div> : null}
        </>
      </FloatingLabel>
    </div>
  );
};

export default FormikInputFloating;

const InputTextLabel = styled.span`
  font-size: 12px;
  color: #3b3b3b;
  font-weight: 500;
  line-height: 18px;
  width: 100%;
`;

const InputComponent = styled.input`
  width: ${(props) => props?.width || "100%"};
  height: ${(props) => (props?.height ? props?.height : "40px")};
  border: ${(props) => props.border ?? "1px solid rgb(214, 217, 225)"};
  border-radius: 8px;
  margin: ${(props) => props?.margin ?? "0"};
  padding: 10px;
  box-sizing: border-box;
  outline: none;
  font-family: Helvetica Neue, Arial;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 57px;
  color: #000;
  ::placeholder {
    padding: 10px 0px; /* Adjust placeholder padding */
  }
  &:focus {
    border-color: rgb(251, 207, 52); /* Change to your desired color */
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2); /* Optional: Add box shadow */
  }
`;

const InputError = styled.div`
  color: #ff6565;
  font-size: 12px;
  position: absolute;
  bottom: -20px; // Adjust this value as needed
  left: 0;
`;

const RequiredSign = styled.div`
  color: #ff4d4f;
  font-size: 15px;
  transform: translateY(2px);
  font-weight: 400;
`;
